'use client';

import { registerService } from '@/services/auth.services';
import { RegisterProps } from '@/types/Register.types';
import { RegisterValidation } from '@/validation/Register.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const RegisterComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterProps>({
    resolver: zodResolver(RegisterValidation),
  });

  const queryClient = useQueryClient();

  const route = useRouter();

  const registerMutation = useMutation({
    mutationFn: registerService,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['me'],
      });
      route.push('/dashboard');
    },
  });

  const onSubmit = async (data: RegisterProps) => {
    try {
      registerMutation.mutate(data);
      reset();
    } catch (error) {
      return error;
    }
  };

  return (
    <main
      className='min-h-screen flex items-center justify-center 
    bg-linear-to-br from-amber-200 via-yellow-100 to-orange-300 px-4'
    >
      <Link
        href='/'
        className='absolute top-6 left-6 flex items-center gap-2 
        text-gray-700 font-medium transition-all duration-300 
        hover:text-orange-600 hover:-translate-x-1'
      >
        <span className='text-xl'>←</span>
        Назад
      </Link>
      <section
        className='w-full max-w-md p-8 bg-white/90 backdrop-blur-xl 
      rounded-3xl shadow-2xl border border-white/40'
      >
        <h1
          className='text-3xl font-bold text-center mb-8 
        bg-linear-to-r from-amber-600 to-orange-500 
        bg-clip-text text-transparent'
        >
          Створити акаунт
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          {/* First Name */}
          <div>
            <label
              htmlFor='firstName'
              className='block mb-1 text-sm font-medium text-gray-700'
            >
              Імʼя <span className='text-red-500'>*</span>
            </label>
            <input
              id='firstName'
              type='text'
              {...register('firstName')}
              className={`w-full px-4 py-2 rounded-xl border 
              focus:outline-none focus:ring-2 transition-all duration-300
              ${
                errors.firstName
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-amber-400'
              }`}
            />
            {errors.firstName && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor='lastName'
              className='block mb-1 text-sm font-medium text-gray-700'
            >
              Прізвище <span className='text-red-500'>*</span>
            </label>
            <input
              id='lastName'
              type='text'
              {...register('lastName')}
              className={`w-full px-4 py-2 rounded-xl border 
              focus:outline-none focus:ring-2 transition-all duration-300
              ${
                errors.lastName
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-amber-400'
              }`}
            />
            {errors.lastName && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor='email'
              className='block mb-1 text-sm font-medium text-gray-700'
            >
              Email <span className='text-red-500'>*</span>
            </label>
            <input
              id='email'
              type='email'
              {...register('email')}
              className={`w-full px-4 py-2 rounded-xl border 
              focus:outline-none focus:ring-2 transition-all duration-300
              ${
                errors.email
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-amber-400'
              }`}
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor='password'
              className='block mb-1 text-sm font-medium text-gray-700'
            >
              Пароль <span className='text-red-500'>*</span>
            </label>
            <input
              id='password'
              type='password'
              {...register('password')}
              className={`w-full px-4 py-2 rounded-xl border 
              focus:outline-none focus:ring-2 transition-all duration-300
              ${
                errors.password
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-amber-400'
              }`}
            />
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Repeat Password */}
          <div>
            <label
              htmlFor='repeatPassword'
              className='block mb-1 text-sm font-medium text-gray-700'
            >
              Повторіть пароль <span className='text-red-500'>*</span>
            </label>
            <input
              id='repeatPassword'
              type='password'
              {...register('repeatPassword')}
              className={`w-full px-4 py-2 rounded-xl border 
              focus:outline-none focus:ring-2 transition-all duration-300
              ${
                errors.repeatPassword
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-amber-400'
              }`}
            />
            {errors.repeatPassword && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.repeatPassword.message}
              </p>
            )}
          </div>

          <button
            type='submit'
            className='w-full py-2 rounded-xl font-medium 
            bg-linear-to-r from-amber-500 to-orange-500 text-white 
            shadow-lg transition-all duration-300 cursor-pointer
            hover:scale-105 hover:shadow-xl active:scale-95'
          >
            Зареєструватися
          </button>
        </form>
      </section>
    </main>
  );
};

export default RegisterComponent;
