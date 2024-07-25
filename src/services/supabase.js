import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://jzqavavyawddvtsltvti.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
