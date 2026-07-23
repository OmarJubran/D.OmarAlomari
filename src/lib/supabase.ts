import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || '';
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || '';

export const supabase: SupabaseClient = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
);

export type Appointment = {
  id: string;
  name: string;
  phone: string;
  appointment_date: string;
  service: string;
  message: string | null;
  status: string;
  created_at: string;
};

export type NewAppointment = {
  name: string;
  phone: string;
  appointment_date: string;
  service: string;
  message?: string | null;
};

export type ContactMessage = {
  id: string;
  name: string;
  phone: string;
  message: string;
  created_at: string;
};

export type NewContactMessage = {
  name: string;
  phone: string;
  message: string;
};
