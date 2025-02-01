'use client';
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

  // const removeUser = () => {
  //   setUser('');
  // };

  // const fetchUser = async () => {
  //   try {
  //     const data = await fetch(`http://localhost:4000/api/v1/auth/showMe`);
  //     const res = await data.json();
  //     setUser(res.user);
  //   } catch (error) {
  //     removeUser();
  //   }
  // };

  // useEffect(() => {
  //   fetchUser();
  // }, []);

  return (
    <AuthContext.Provider value={{ user, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
