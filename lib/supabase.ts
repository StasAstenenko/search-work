import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASEURL!;
const anonKey = process.env.NEXT_PUBLIC_ANONKEY!;

export const supabase = createClient(supabaseUrl, anonKey);
