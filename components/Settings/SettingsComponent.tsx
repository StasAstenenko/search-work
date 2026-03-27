'use client';

import { updateUser } from '@/services/auth.services';
import { profileSchema, UpdateUser } from '@/validation/UpdateUser.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import FormField from '../FormField/FormField';
import Select from '../Select/Select';

const SettingsComponent = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UpdateUser>({
    resolver: zodResolver(profileSchema),
  });

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateUser,

    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['me'], updatedUser);
      reset();
    },
  });

  const onSubmit = (data: UpdateUser) => {
    updateMutation.mutate(data);
  };

  return (
    <main className='min-h-screen flex items-center justify-center bg-linear-to-br from-amber-200 via-yellow-100 to-orange-300 px-6 py-12'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='
          w-full max-w-xl
          bg-white/90 backdrop-blur-xl
          border border-black/10
          rounded-2xl
          shadow-xl
          p-8
          space-y-6
          transition
          hover:shadow-2xl
        '
      >
        <h2 className='text-2xl font-bold text-center'>Налаштування профілю</h2>

        {/* first name */}
        <FormField label="Ім'я" error={errors.firstName?.message}>
          <input
            {...register('firstName')}
            placeholder="Введіть ім'я"
            className='
w-full
px-4 py-3
rounded-xl
border border-black/10
bg-white
outline-none
transition
focus:border-amber-500
focus:ring-4
focus:ring-amber-200
'
          />
        </FormField>

        {/* last name */}
        <FormField label='Прізвище' error={errors.lastName?.message}>
          <input
            {...register('lastName')}
            placeholder='Введіть прізвище'
            className='
w-full
px-4 py-3
rounded-xl
border border-black/10
bg-white
outline-none
transition
focus:border-amber-500
focus:ring-4
focus:ring-amber-200
'
          />
        </FormField>

        {/* age */}
        <FormField label='Вік' error={errors.age?.message}>
          <input
            type='number'
            {...register('age', { valueAsNumber: true })}
            placeholder='Наприклад 25'
            className='
w-full
px-4 py-3
rounded-xl
border border-black/10
bg-white
outline-none
transition
focus:border-amber-500
focus:ring-4
focus:ring-amber-200
'
          />
        </FormField>

        {/* gender */}
        <FormField label='Стать' error={errors.gender?.message}>
          <Controller
            control={control}
            name='gender'
            render={({ field }) => (
              <Select
                items={['Чоловік', 'Жінка']}
                value={field.value ?? null}
                getValue={(item) => item}
                getLabel={(item) => item}
                onChange={field.onChange}
              />
            )}
          />
        </FormField>

        {/* resume */}
        <FormField
          label='Посилання на резюме'
          error={errors.resumeUrl?.message}
        >
          <input
            {...register('resumeUrl')}
            placeholder='https://...'
            className='
w-full
px-4 py-3
rounded-xl
border border-black/10
bg-white
outline-none
transition
focus:border-amber-500
focus:ring-4
focus:ring-amber-200
'
          />
        </FormField>

        {/* button */}
        <button
          type='submit'
          disabled={updateMutation.isPending}
          className='
            w-full
            rounded-xl
            bg-linear-to-r from-amber-500 to-orange-500
            text-white
            font-semibold
            py-3
            transition
            hover:scale-[1.02]
            hover:shadow-lg
            disabled:opacity-50
          '
        >
          {updateMutation.isPending ? 'Збереження...' : 'Зберегти'}
        </button>
      </form>
    </main>
  );
};

export default SettingsComponent;
