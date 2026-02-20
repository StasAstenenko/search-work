import { Session, User } from '@supabase/supabase-js';

export interface LoginProps {
  email: string;
  password: string;
}

export interface RegisterProps extends LoginProps {
  firstName: string;
  lastName: string;
  repeatPassword: string;
}

export interface UserData {
  user: User | null;
  session: Session | null;
}
