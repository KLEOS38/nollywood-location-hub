
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  property_id?: string;
  content: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
  sender?: {
    name: string;
    avatar_url?: string;
  };
  recipient?: {
    name: string;
    avatar_url?: string;
  };
}

export interface Conversation {
  participant: {
    id: string;
    name: string;
    avatar_url?: string;
  };
  lastMessage: Message;
  unreadCount: number;
}

export const useMessages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchConversations();
      subscribeToMessages();
    }
  }, [user]);

  const fetchConversations = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // First get all messages for the user
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (messagesError) throw messagesError;

      // Get unique participant IDs
      const participantIds = new Set<string>();
      messagesData?.forEach((message: any) => {
        const participantId = message.sender_id === user.id ? message.recipient_id : message.sender_id;
        participantIds.add(participantId);
      });

      // Fetch participant profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, name, avatar_url')
        .in('id', Array.from(participantIds));

      if (profilesError) throw profilesError;

      // Create conversations map
      const conversationMap = new Map<string, Conversation>();
      
      messagesData?.forEach((message: any) => {
        const isOutgoing = message.sender_id === user.id;
        const participantId = isOutgoing ? message.recipient_id : message.sender_id;
        const participant = profilesData?.find(p => p.id === participantId);

        if (!conversationMap.has(participantId)) {
          conversationMap.set(participantId, {
            participant: {
              id: participantId,
              name: participant?.name || 'Unknown User',
              avatar_url: participant?.avatar_url
            },
            lastMessage: message,
            unreadCount: 0
          });
        }

        if (!isOutgoing && !message.is_read) {
          const conversation = conversationMap.get(participantId)!;
          conversation.unreadCount++;
        }
      });

      setConversations(Array.from(conversationMap.values()));
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (participantId: string) => {
    if (!user) return;

    try {
      // Get messages between user and participant
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${user.id},recipient_id.eq.${participantId}),and(sender_id.eq.${participantId},recipient_id.eq.${user.id})`)
        .order('created_at', { ascending: true });

      if (messagesError) throw messagesError;

      // Get profiles for sender and recipient
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, name, avatar_url')
        .in('id', [user.id, participantId]);

      if (profilesError) throw profilesError;

      // Enrich messages with profile data
      const enrichedMessages = messagesData?.map((message: any) => {
        const sender = profilesData?.find(p => p.id === message.sender_id);
        const recipient = profilesData?.find(p => p.id === message.recipient_id);
        
        return {
          ...message,
          sender: sender ? { name: sender.name, avatar_url: sender.avatar_url } : undefined,
          recipient: recipient ? { name: recipient.name, avatar_url: recipient.avatar_url } : undefined
        };
      }) || [];

      setMessages(enrichedMessages);

      // Mark messages as read
      await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('sender_id', participantId)
        .eq('recipient_id', user.id);

    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (recipientId: string, content: string, propertyId?: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          recipient_id: recipientId,
          property_id: propertyId,
          content
        });

      if (error) throw error;
      
      // Refresh conversations and messages
      fetchConversations();
      if (messages.length > 0) {
        fetchMessages(recipientId);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  const subscribeToMessages = () => {
    if (!user) return;

    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `or(sender_id.eq.${user.id},recipient_id.eq.${user.id})`
        },
        () => {
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  return {
    conversations,
    messages,
    loading,
    fetchMessages,
    sendMessage,
    refetch: fetchConversations
  };
};
