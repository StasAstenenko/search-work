import * as z from 'zod';

export const RegisterValidation = z
  .object({
    firstName: z.string().min(1, 'Заповніть поле'),
    lastName: z.string().min(1, 'Заповніть поле'),
    email: z.email('Невірна пошта'),
    password: z
      .string()
      .min(6, 'Мінімальна дліна пароля 6 символів')
      .max(24, 'Максимальна дліна пароля 24 символа'),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Паролі не співпадають',
    path: ['repeatPassword'],
  });
