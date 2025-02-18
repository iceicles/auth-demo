'use client';
import { API_URL } from '@/endpoint.constant';
import { IAuthUser } from '@/interfaces/authUser';
import { createContext, useEffect, useState } from 'react';

// context for user data
export const AuthContext = createContext('' as unknown as IAuthUser);

// provider component
export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // function to set the user data
  const setAuthUser = (userData: any) => {
    setUser(userData);
  };

  const removeUser = () => {
    setUser('');
  };

  // fetch to check if user is authenticated
  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(`/api/v1/users/showMe`, {
        credentials: 'include',
      });
      const res = await data.json();
      setUser(res.user);
      setIsLoading(false);
    } catch (error) {
      removeUser();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setAuthUser, removeUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
