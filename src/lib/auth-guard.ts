
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const requireAuth = async (): Promise<boolean> => {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    toast.error('Please sign in to continue');
    return false;
  }
  
  return true;
};

export const requirePropertyOwnership = async (propertyId: string): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    toast.error('Authentication required');
    return false;
  }
  
  const { data, error } = await supabase
    .from('properties')
    .select('owner_id')
    .eq('id', propertyId)
    .single();
  
  if (error) {
    toast.error('Failed to verify ownership');
    return false;
  }
  
  if (data.owner_id !== user.id) {
    toast.error('Access denied');
    return false;
  }
  
  return true;
};

export const requireBookingOwnership = async (bookingId: string): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    toast.error('Authentication required');
    return false;
  }
  
  const { data, error } = await supabase
    .from('bookings')
    .select('user_id')
    .eq('id', bookingId)
    .single();
  
  if (error) {
    toast.error('Failed to verify ownership');
    return false;
  }
  
  if (data.user_id !== user.id) {
    toast.error('Access denied');
    return false;
  }
  
  return true;
};

export const requireRole = async (requiredRole: string): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    toast.error('Authentication required');
    return false;
  }
  
  const { data, error } = await supabase
    .from('admin_users')
    .select('role')
    .eq('user_id', user.id)
    .single();
  
  if (error || !data || data.role !== requiredRole) {
    toast.error('Insufficient permissions');
    return false;
  }
  
  return true;
};
