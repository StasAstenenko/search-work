'use client';

import { loginService } from '@/services/auth.services';
import { LoginProps } from '@/types/Register.types';
import { LoginValidation } from '@/validation/Login.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const LoginComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>({
    resolver: zodResolver(LoginValidation),
  });

  const queryClient = useQueryClient();

  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: loginService,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
      router.push('/dashboard');
    },
  });

  const onSubmit = async (data: LoginProps) => {
    loginMutation.mutate(data);
  };

  return (
    <main
      className='min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-amber-200 via-yellow-100 to-orange-300 px-4 relative'
    >
      {/* 🔙 Back Arrow */}
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
        bg-gradient-to-r from-amber-600 to-orange-500 
        bg-clip-text text-transparent'
        >
          Вхід в акаунт
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div>
            <label
              htmlFor='email'
              className='block mb-1 text-sm font-medium text-gray-700'
            >
              Email
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

          <div>
            <label
              htmlFor='password'
              className='block mb-1 text-sm font-medium text-gray-700'
            >
              Пароль
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

          <button
            type='submit'
            className='w-full py-2 rounded-xl font-medium 
            bg-gradient-to-r from-amber-500 to-orange-500 text-white 
            shadow-lg transition-all duration-300
            hover:scale-105 hover:shadow-xl active:scale-95'
          >
            Увійти
          </button>
        </form>
      </section>
    </main>
  );
};

export default LoginComponent;
