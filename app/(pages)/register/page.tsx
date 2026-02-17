'use client';

import { RegisterProps } from '@/types/Register.types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterValidation } from '@/validation/Register.validation';

const RegisterPage = () => {
  const { register, handleSubmit } = useForm<RegisterProps>({
    resolver: zodResolver(RegisterValidation),
  });

  const onSubmit = (data: RegisterProps) => {
    console.log(data);
  };

  return (
    <section>
      <h1></h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type='text' {...register('firstName')} className='border' />
        <input type='text' {...register('lastName')} className='border' />
        <input type='email' {...register('email')} className='border' />
        <input type='password' {...register('password')} className='border' />
        <input
          type='password'
          {...register('repeatPassword')}
          className='border'
        />

        <button type='submit'>Зареєструватись</button>
      </form>
    </section>
  );
};

export default RegisterPage;
