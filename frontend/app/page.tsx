import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  function clickMeBtn() {
    return (
      <Button>
        <Link href='/dashboard'>CLICK ME</Link>
      </Button>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1>
        Auth App built with MERN. To access the special giftbox, please sign in
        with your account.
      </h1>
      <h2>Sign-in if you have an account, otherwise, sign up. </h2>
      <i>
        Tip: you can use a throwaway inbox such as <a href='#'>yopmail</a> or{' '}
        <a href='#'>mailinator</a>
      </i>
      <div>
        <Button>
          <Link href='/login'>Login</Link>
        </Button>
        <Button>
          <Link href='/register'>Register</Link>
        </Button>
      </div>
      {clickMeBtn()}
    </div>
  );
}
