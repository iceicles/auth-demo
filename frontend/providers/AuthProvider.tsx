'use client';
import { API_URL } from '@/endpoint.constant';
import { IAuthUser } from '@/interfaces/authUser';
import { createContext, useEffect, useState } from 'react';

// context for user data
export const AuthContext = createContext('' as unknown as IAuthUser);

// provider component
export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<string>('');

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
      const data = await fetch(`${API_URL}/users/showMe`, {
        credentials: 'include',
      });
      const res = await data.json();
      setUser(res.user);
    } catch (error) {
      removeUser();
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setAuthUser, removeUser }}>
      {children}
    </AuthContext.Provider>
  );
};
