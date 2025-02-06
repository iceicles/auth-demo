'use client';
import { RegisterForm } from '@/components/RegisterForm';
import { API_URL } from '@/endpoint.constant';
import { IFormValues } from '@/interfaces/form';
import { useForm } from 'react-hook-form';

export default function Register() {
  const { register, handleSubmit } = useForm<IFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const sendFormData = async (userData: IFormValues) => {
    try {
      await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          userData,
        }),
      });
    } catch (error) {
      console.log('error: ', error);
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
