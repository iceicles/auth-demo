'use client';
import { useEffect } from 'react';
import { RegisterForm } from '@/components/RegisterForm';
import { API_URL } from '@/endpoint.constant';
import { useAuth } from '@/hooks/useAuth';
import { IFormValues } from '@/interfaces/form';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function Register() {
  const { user } = useAuth();

  const router = useRouter();

  // useEffect to redirect user to dashboard if authenticated
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user]);

  const { register, handleSubmit } = useForm<IFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const sendFormData = async (userData: IFormValues) => {
    try {
      const data = await fetch(`/api/v1/auth/register`, {
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
        const { success } = await data.json();
        if (success) {
          alert(
            'You have successfully created an account. Please login with your email and password'
          );
          router.push('/login');
        }
      } else {
        const errorData = await data.json(); // get the error response
        throw new Error(JSON.stringify(errorData)); // throw the error as a stringified object
      }
    } catch (error: any) {
      console.log('error: ', error);
      const errorResponse = JSON.parse(error.message);
      alert(errorResponse.msg);
    }
  };

  const onSubmit = (data: IFormValues) => {
    sendFormData(data);
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <RegisterForm
        register={register}
        onSubmit={handleSubmit(onSubmit)}
        name={'name'}
        email={'email'}
        password={'password'}
      />
    </div>
  );
}
