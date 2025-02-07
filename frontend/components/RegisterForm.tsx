import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
      <Card className='mx-auto max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Register</CardTitle>
          <CardDescription>
            Create an account to access your giftbox today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <div>
              <Label htmlFor='name'>Name</Label>
              <Input
                {...register(name)}
                name={name}
                id='name'
                type='text'
                placeholder='abc'
                required
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                {...register(email)}
                name={email}
                id='email'
                type='email'
                placeholder='abc@example.com'
                required
              />
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Password</Label>
              </div>
              <Input
                {...register(password)}
                name={password}
                id='password'
                type='password'
                required
              />
            </div>
            <Button type='submit' className='w-full'>
              Register
            </Button>
          </div>
          <div className='mt-4 text-center text-sm'>
            Already have an account?{' '}
            <Link href='/login' className='underline'>
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
