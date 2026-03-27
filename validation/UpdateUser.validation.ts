import { z } from 'zod';

const emptyToUndefined = (value?: string | undefined) =>
  value === '' ? undefined : value;

export const profileSchema = z.object({
  firstName: z
    .preprocess(
      emptyToUndefined,
      z.string().min(1, 'Мінімальна довжина імені 1 символ').optional()
    )
    .optional(),

  lastName: z
    .preprocess(
      emptyToUndefined,
      z.string().min(1, 'Мінімальна довжина прізвища 1 символ').optional()
    )
    .optional(),

  age: z
    .preprocess(
      (v?: number | undefined) => (!v ? undefined : v),
      z.number().min(16, 'Мінімальний вік 16').max(80).optional()
    )
    .optional(),

  gender: z.enum(['Чоловік', 'Жінка']).optional(),

  resumeUrl: z
    .preprocess(emptyToUndefined, z.string().url('Некоректний URL'))
    .optional()
    .optional(),
});

export type UpdateUser = z.infer<typeof profileSchema>;
