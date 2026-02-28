import { supabase } from '@/lib/supabase';
import { LoginProps, RegisterProps, UserData } from '@/types/Register.types';

export const registerService = async (
  data: RegisterProps
): Promise<UserData> => {
  try {
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

    return userData;
  } catch (error) {
    throw new Error('Some error...', { cause: error });
  }
};

export const loginService = async ({ email, password }: LoginProps) => {
  try {
    const { data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return data;
  } catch (error) {
    throw new Error('Some error...', { cause: error });
  }
};

export const getUser = async () => {
  try {
    const { data } = await supabase.auth.getUser();

    return data;
  } catch (error) {
    throw new Error('Some error...', { cause: error });
  }
};
