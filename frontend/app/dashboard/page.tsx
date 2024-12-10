'use client';
import { Button } from '@/components/ui/button';
import { LocalStorage } from '@/enum/localStorage';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// function to get cookies (simpler helper or library might help)
// const getCookie = (name: string): string | null => {
//   const matches = document.cookie.match(
//     new RegExp('(^| )' + name + '=([^;]+)')
//   );
//   return matches ? decodeURIComponent(matches[2]) : null;
// };

export default function Dashboard() {
  const [userName, setUserName] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  // const refreshToken = getCookie('refreshToken');

  useEffect(() => {
    // saved in local storage from login or register page
    const accessToken = localStorage.getItem(LocalStorage.TOKEN);

    getUserData(accessToken);
    // if token is available, fetch user data directly
    //if (accessToken) {
    //} else {
    // if token is not available, handle as if user is unauthenticated
    //setLoading(false);
    // setIsAuthenticated(false);
    // router.push('/');
    //}

    // TODO:
    // invalidate session if user edits the token in local storage <<<------
    // create a new token and store in local storage when user deletes token in local storage <<<------
  }, []);

  const getUserData = async (token: string | null) => {
    try {
      const data = await fetch('http://localhost:4000/api/v1/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
        // method: 'GET',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        credentials: 'include', // Send cookies with request (refresh token)
      });

      if (data.ok) {
        const res = await data.json();
        // if there is no token, we set the access token in local storage to newly provided access token from backend
        if (!token) localStorage.setItem(LocalStorage.TOKEN, res.accessToken);
        console.log('res.accessToken - ', res.accessToken);
        console.log('token - ', token);
        // if (res.accessToken !== token) {
        //   // localStorage.removeItem(LocalStorage.TOKEN);
        //   throw new Error('Invalid token');
        // }
        setUserName(res.user);
        setIsAuthenticated(true);
        setLoading(false);
      } else {
        setIsAuthenticated(false);
        setLoading(false);
        // router.push('/');
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  // const deleteCookie = (name: string) => {
  //   document.cookie =
  //     name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  // };

  const onLogoutClick = () => {
    localStorage.removeItem(LocalStorage.TOKEN);
    // deleteCookie('refreshToken');
    router.push('/');
  };

  const renderDashboardMsg = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (isAuthenticated) {
      return <h1>Hi there, {userName}</h1>;
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
      {renderDashboardMsg()}
      {isAuthenticated && <Button onClick={onLogoutClick}>Logout</Button>}
    </>
  );
}
