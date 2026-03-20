import { LoginProps, RegisterProps, UserData } from '@/types/Register.types';
import axios from 'axios';

const instant = axios.create({
  baseURL: '/api/auth',
});

export const registerService = async (
  data: RegisterProps
): Promise<UserData> => {
  try {
    const { data: userData } = await instant.post<UserData>('/register', data);

    return userData;
  } catch (error) {
    throw new Error('Some error...', { cause: error });
  }
};

export const loginService = async (data: LoginProps): Promise<UserData> => {
  try {
    const { data: userData } = await instant.post<UserData>('/login', data);

    return userData;
  } catch (error) {
    throw new Error('Some error...', { cause: error });
  }
};

export const getUser = async (): Promise<UserData> => {
  try {
    const { data } = await instant.get<UserData>('/me');

    console.log(data);

    return data;
  } catch (error) {
    throw new Error('Some error...', { cause: error });
  }
};
