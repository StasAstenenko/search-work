import { LoginProps, RegisterProps, UserData } from '@/types/Register.types';
import { UpdateUser } from '@/validation/UpdateUser.validation';
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

export const logoutService = async () => {
  try {
    return await instant.post('/logout');
  } catch (error) {
    throw new Error('Some error...', { cause: error });
  }
};

export const getUser = async (): Promise<UserData> => {
  try {
    const { data } = await instant.get<UserData>('/me');

    return data;
  } catch (error) {
    throw new Error('Some error...', { cause: error });
  }
};

export const updateUser = async (data: UpdateUser): Promise<UserData> => {
  try {
    const { data: user } = await instant.patch<UserData>('/update-user', data);

    return user;
  } catch (error) {
    throw new Error('Some error...', { cause: error });
  }
};
