'use client';
import { LoginForm } from '@/components/login-form';
import { LocalStorage } from '@/enum/localStorage';
import { IFormValues } from '@/interfaces/form';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface response {
  user: string;
  token: string;
  success: boolean;
}

export default function Login() {
  const { register, handleSubmit } = useForm<IFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const sendFormData = async (userData: IFormValues) => {
    try {
      const data = await fetch('http://localhost:4000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          userData,
        }),
      });

      if (data.ok) {
        const res = (await data.json()) as response;
        console.log('res - ', res);
        const { success, token } = res;
        console.log(success);
        // save JWT and user's name in local storage
        localStorage.setItem(LocalStorage.TOKEN, token);
        // navigate authenticated user to dashboard
        router.push('/dashboard');
      }
    } catch (error) {
      console.log('error - ', error);
    }
  };

  const onSubmit = (data: IFormValues) => {
    sendFormData(data);
  };

  return (
    <div className='flex h-screen w-full items-center justify-center px-4'>
      <LoginForm
        register={register}
        onSubmit={handleSubmit(onSubmit)}
        email={'email'}
        password={'password'}
      />
    </div>
  );
}
