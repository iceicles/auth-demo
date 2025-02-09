import Link from 'next/link';
import { IFormValues } from '@/interfaces/form';
import { FormEventHandler, RefObject, FC } from 'react';
import { UseFormRegister, Path } from 'react-hook-form';

interface RegisterForm {
  onSubmit():
    | FormEventHandler<HTMLFormElement>
    | undefined
    | void
    | Promise<void>;
  ref?: RefObject<HTMLFormElement | null>;
  register: UseFormRegister<IFormValues>;
  name: Path<IFormValues>;
  email: Path<IFormValues>;
  password: Path<IFormValues>;
}

export const RegisterForm: FC<RegisterForm> = ({
  onSubmit,
  ref,
  register,
  name,
  email,
  password,
}) => {
  return (
    <form onSubmit={onSubmit} ref={ref}>
      <div className='border-[2px] border-solid border-gray-200 rounded-lg p-8 mx-4 sm:mx-0 text-sm'>
        <h1 className='text-2xl font-bold mb-2'>Register</h1>
        <p className='mb-4'>
          Create an account to access your personal dashboard
        </p>
        <div className='flex flex-col gap-4'>
          <label className='flex flex-col'>
            Name
            <input
              {...register(name)}
              name={name}
              id='name'
              type='text'
              placeholder='abc'
              required
              className='border p-2 rounded'
            />
          </label>
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
            value='Register'
            className='bg-green-700 text-white p-2 rounded cursor-pointer'
          />
          <p className='text-center text-sm'>
            Already have an account?{' '}
            <Link href='/login' className='underline underline-offset-2'>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};
