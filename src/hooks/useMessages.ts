
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
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:sender_id (name, avatar_url),
          recipient:recipient_id (name, avatar_url)
        `)
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group messages by conversation
      const conversationMap = new Map<string, Conversation>();
      
      data?.forEach((message: any) => {
        const isOutgoing = message.sender_id === user.id;
        const participant = isOutgoing ? message.recipient : message.sender;
        const participantId = isOutgoing ? message.recipient_id : message.sender_id;

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
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:sender_id (name, avatar_url),
          recipient:recipient_id (name, avatar_url)
        `)
        .or(`and(sender_id.eq.${user.id},recipient_id.eq.${participantId}),and(sender_id.eq.${participantId},recipient_id.eq.${user.id})`)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);

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
