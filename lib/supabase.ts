import { ANON_KEY, SUPABASE_URL } from '@/constant/constants';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = SUPABASE_URL;
const anonKey = ANON_KEY;

export const supabase = createClient(supabaseUrl, anonKey);
