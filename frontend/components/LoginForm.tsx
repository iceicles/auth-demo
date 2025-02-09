import Link from 'next/link';
import { Path } from 'react-hook-form';
import { FC, FormEventHandler, RefObject } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { IFormValues } from '@/interfaces/form';

interface LoginForm {
  onSubmit():
    | FormEventHandler<HTMLFormElement>
    | undefined
    | void
    | Promise<void>;
  ref?: RefObject<HTMLFormElement | null>;
  register: UseFormRegister<IFormValues>;
  email: Path<IFormValues>;
  password: Path<IFormValues>;
}

export const LoginForm: FC<LoginForm> = ({
  onSubmit,
  ref,
  register,
  email,
  password,
}) => {
  return (
    <form onSubmit={onSubmit} ref={ref}>
      <div className='border-[2px] border-solid border-gray-200 rounded-lg p-8 text-sm'>
        <h1 className='text-2xl font-bold mb-2'>Login</h1>
        <p className='mb-4 text-sm'>
          Enter your email below to login to your account
        </p>
        <div className='flex flex-col gap-4'>
          <label className='flex flex-col'>
            Email
            <input
              {...register(email)}
              name={email}
              id='email'
              type='email'
              placeholder='abc@mail.com'
              required
              className='border p-2 rounded'
            />
          </label>
          <label className='flex flex-col'>
            Password
            <input
              {...register(password)}
              name={password}
              id='password'
              type='password'
              required
              className='border p-2 rounded'
            />
          </label>
          <input
            type='submit'
            value='Login'
            className='bg-green-700 text-white p-2 rounded cursor-pointer'
          />
          <p className='text-center text-sm'>
            Don't have an account?{' '}
            <Link href='/register' className='underline underline-offset-2'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};
