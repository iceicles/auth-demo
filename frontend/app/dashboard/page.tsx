'use client';
import { HeaderNav } from '@/components/HeaderNav';
import { useAuth } from '@/hooks/useAuth';

const greetings = [
  'Hi',
  "What's up",
  'How do you do',
  'Feeling well today',
  'Greetings',
  'Hey there',
  'Nice to meet you',
  'Hello',
  "How's it going",
  'Long time no see',
  'How goes it',
];

export default function Dashboard() {
  const { user } = useAuth();

  if (user === '') {
    return (
      <div className='flex items-center justify-center min-h-screen mx-8 md:mx-0 leading-[45px] md:leading-8'>
        <span>
          Huh, It looks like you're not signed in! <br /> If you have an
          account, please
          <a
            href='/login'
            className='p-2 underline underline-offset-8 decoration-green-800'
          >
            {' '}
            Sign in{' '}
          </a>
          . Otherwise, you can
          <a
            href='/register'
            className='p-2 underline underline-offset-8 decoration-green-800'
          >
            {' '}
            Create an account
          </a>
        </span>
      </div>
    );
  }

  const renderRandomGreeting = () => {
    const randomGreeting = Math.floor(Math.random() * greetings.length);
    console.log(greetings[randomGreeting]);
    return (
      <>
        {greetings[randomGreeting]}, {user}!
      </>
    );
  };

  return (
    <div className='bg-gray-400 h-screen'>
      <HeaderNav />
      <div className='flex flex-col items-center justify-center h-[80vh] md:bg-slate-900 rounded md:text-white mx-[40px] mt-14'>
        <h1 className='text-4xl'>{renderRandomGreeting()}</h1>
        {/* insert quote of the day here */}
      </div>
    </div>
  );
}
