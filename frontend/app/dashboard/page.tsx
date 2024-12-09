'use client';
import { Button } from '@/components/ui/button';
import { LocalStorage } from '@/enum/localStorage';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  // read from local storage to retrieve user's name
  const token = localStorage.getItem(LocalStorage.TOKEN);

  const router = useRouter();

  const onLogoutClick = () => {
    // remove token from local storage
    localStorage.removeItem(LocalStorage.TOKEN);
    // navigate user to root page (/)
    router.push('/');
  };

  // render logout button
  const logoutBtn = () => {
    return (
      token && (
        <>
          <Button onClick={onLogoutClick}>Logout</Button>
        </>
      )
    );
  };

  // render main dashboard msg
  const render = () => {
    if (token) {
      return <h1>Hi there {}</h1>;
    } else {
      return (
        <div>
          <h1>
            Sorry, you're not authorized to access this resource. Please sign in
            with your existing account, or create one.
          </h1>
          <Link href='/'>Click me to navigate back</Link>
        </div>
      );
    }
  };
  return (
    <>
      {render()}
      {logoutBtn()}
    </>
  );
}
