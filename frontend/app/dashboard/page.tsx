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
];

export default function Dashboard() {
  const { user } = useAuth();

  if (user === '') {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <span>
          It looks like you're not signed in. If you have an account, please
          <a href='/login' className='border-b-2 border-b-green-800 p-2'>
            {' '}
            Sign in{' '}
          </a>
          . Otherwise, please
          <a href='/register' className='border-b-2 border-b-green-800 p-2'>
            {' '}
            Create One
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
      <div className='flex flex-col items-center justify-center h-[80vh] bg-slate-900 rounded text-white mx-[40px] mt-14'>
        <h1 className='text-4xl'>{renderRandomGreeting()}</h1>
        {/* insert quote of the day here */}
      </div>
    </div>
  );
}
