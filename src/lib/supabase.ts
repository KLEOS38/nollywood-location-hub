
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const supabaseUrl = "https://jwuakfowjxebtpcxcqyr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3dWFrZm93anhlYnRwY3hjcXlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMDkzNzksImV4cCI6MjA1OTU4NTM3OX0.MgQBolc8BmqN4qFe-8FEgR3MBjg8T6QY9W00Ld8Y1OE";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage
  }
});
