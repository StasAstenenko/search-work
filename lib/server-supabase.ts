import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { ANON_KEY, SUPABASE_URL } from '@/constant/constants';

export const createSupabaseServer = async () => {
  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL, ANON_KEY, {
    cookies: {
      get(name) {
        return cookieStore.get(name)?.value;
      },
      set(name, value, options) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name, options) {
        cookieStore.set({ name, value: '', ...options });
      },
    },
  });
};
