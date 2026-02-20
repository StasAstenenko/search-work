import { supabase } from '@/lib/supabase';
import { LoginProps, RegisterProps, UserData } from '@/types/Register.types';

export const registerService = async (
  data: RegisterProps
): Promise<UserData> => {
  const { data: userData } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
      },
    },
  });

  console.log(userData);
  return userData;
};

export const loginService = async ({ email, password }: LoginProps) => {
  const { data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log(data);

  return data;
};
