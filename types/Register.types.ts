import { Favorite } from './Favorite.type';

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
}

export interface User {
  id: string;
  supabaseUserId: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number | null;
  gender: string | null;
  resumeUrl: string | null;
  favorites: Favorite[] | null;
}
