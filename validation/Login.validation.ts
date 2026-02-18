import * as z from 'zod';

export const LoginValidation = z.object({
  email: z.email('Невірна пошта'),
  password: z
    .string()
    .min(6, 'Мінімальна дліна пароля 6 символів')
    .max(24, 'Максимальна дліна пароля 24 символа'),
});
