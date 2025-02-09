'use client';
import { useAuth } from '@/hooks/useAuth';

export const AuthenticationStatus = () => {
  const { user } = useAuth();

  return !user ? (
    <h1 className='self-end mr-4 text-l absolute top-8'>🔴 Unauthenticated</h1>
  ) : (
    <h1 className='self-end mr-4 text-l absolute top-8'>🟢 Authenticated</h1>
  );
};
