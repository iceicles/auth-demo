import { AuthenticationStatus } from '@/components/AuthenticationStatus';
import { HeaderNav } from '@/components/HeaderNav';
import Link from 'next/link';

export default function Home() {
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
            Full-stack Authentication Demo App built with MERN stack. <br />
            Clicking on dashboard below takes you to your personal dashboard.{' '}
            <br /> If you don't have an account, please create one!
          </h1>
          <i>
            Tip: you can use a throwaway inbox such as <a href='#'>yopmail</a>{' '}
            or <a href='#'>mailinator</a>
          </i>
        </div>
        {dashboardBtn()}
      </div>
    </>
  );
}
