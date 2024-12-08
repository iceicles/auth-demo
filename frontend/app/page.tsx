import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  function giftBoxComponent() {
    // render big button that only auth users can access
    // add animations to make it shiny n stuff
    // if user clicks and are not signed in, make box shake side-to-side and have toptip reminding them to sign in or create an account
    return <Button>GIFT BOX</Button>;
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
      {giftBoxComponent()}
    </div>
  );
}
