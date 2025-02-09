'use client';
import { AuthenticationStatus } from '@/components/AuthenticationStatus';
import { HeaderNav } from '@/components/HeaderNav';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function Home() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center h-screen relative'>
        <div className='spinner'></div>
      </div>
    );
  }
  function dashboardBtn() {
    return (
      <Link
        href='/dashboard'
        className='mt-10 p-6 border-b-2 border-b-green-700'
      >
        DASHBOARD 🎉
      </Link>
    );
  }

  return (
    <>
      <HeaderNav />
      <div className='flex flex-col items-center justify-center h-screen relative'>
        <AuthenticationStatus />
        <div className='m-10 sm:border sm:border-dashed sm:border-slate-800 sm:p-[60px]'>
          <h1 className='mb-4'>
            This is a Full-stack Authentication Demo App built with{' '}
            <a
              href='https://www.geeksforgeeks.org/mern-stack/'
              target='_blank'
              className='underline'
            >
              MERN
            </a>{' '}
            stack. <br />
            Clicking on dashboard below takes you to your personal dashboard.{' '}
            <br /> If you don't have an account, please create one!
          </h1>
          <i>**You don't need to use an existing/real email**</i> 😉
        </div>
        {dashboardBtn()}
      </div>
    </>
  );
}
