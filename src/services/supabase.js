import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://jzqavavyawddvtsltvti.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6cWF2YXZ5YXdkZHZ0c2x0dnRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyMjU4MTMsImV4cCI6MjAzNjgwMTgxM30.sDIr5NcilrbbMepm16BrFm7KjkkOuYPmJzqBCKr248M';

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
