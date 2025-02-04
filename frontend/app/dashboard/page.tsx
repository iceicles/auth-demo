'use client';
import { useAuth } from '@/hooks/useAuth';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      <h1>Hi, {user} </h1>
    </>
  );
}
