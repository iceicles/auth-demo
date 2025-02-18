'use client';
import { API_URL } from '@/endpoint.constant';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export const HeaderNav = () => {
  const { user, removeUser } = useAuth();

  const router = useRouter();

  const logoutHandler = async () => {
    try {
      const request = await fetch(`/api/v1/auth/logout`, {
        method: 'delete',
        credentials: 'include',
      });

      if (request.ok) {
        removeUser();
        router.push('/');
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const renderLoginBtn = () => {
    return (
      <nav className='mx-4 border-b-2 border-gray-900 p-8 sm:w-[500px] sm:mx-10'>
        <ul>
          <li>
            <a
              href='/login'
              className='border border-solid p-4 bg-green-600 text-white rounded-sm'
            >
              Sign-In
            </a>
          </li>
        </ul>
      </nav>
    );
  };

  const renderLogoutBtn = () => {
    return (
      <nav className='flex mx-4 border-b-2 border-gray-900 p-8 sm:w-[500px] sm:mx-10'>
        <ul>
          <li>
            <a
              onClick={logoutHandler}
              className='border border-solid p-4 bg-slate-600 text-white rounded-sm cursor-pointer'
            >
              Logout
            </a>
          </li>
        </ul>
      </nav>
    );
  };

  return !user ? renderLoginBtn() : renderLogoutBtn();
};
