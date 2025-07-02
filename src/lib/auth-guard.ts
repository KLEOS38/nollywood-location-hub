
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

export const requireOwnership = async (resourceId: string, table: string, ownerField: string = 'owner_id'): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    toast.error('Authentication required');
    return false;
  }
  
  const { data, error } = await supabase
    .from(table)
    .select(ownerField)
    .eq('id', resourceId)
    .single();
  
  if (error) {
    toast.error('Failed to verify ownership');
    return false;
  }
  
  if (data[ownerField] !== user.id) {
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
