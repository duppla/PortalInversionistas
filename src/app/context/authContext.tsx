'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import {auth} from '../ConfigFirebase/firebase'
import { UserCredential } from "firebase/auth";
import { User } from "firebase/auth";


interface AuthContextType {
    singUp: (email: string, password: string) => Promise<UserCredential>;
    login: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    user: User | null;
    loading: boolean;
  }
const authContext = createContext<AuthContextType | undefined>(undefined);



export const useAuth = (): AuthContextType => {
  const context = useContext(authContext);
  if (!context) throw new Error('useAuth debe estar dentro del proveedor');
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const singUp = async (email: string, password: string): Promise<UserCredential> => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    setUser(credential.user);
    return credential;
  };
  const login = async (email: string, password: string): Promise<UserCredential> => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    setUser(credential.user);
    return credential;
  };
  const logout = async (): Promise<void> => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    })
    return () => unsubscribe();
  }, [])

  const contextValue: AuthContextType = {
    singUp,
    login,
    logout,
    user,
    loading
  };

  return (
    <authContext.Provider value={contextValue}>
      {children}
    </authContext.Provider>
  )
}
/* Consumir el contexto */
export function useAuthContext() {
  return useContext(authContext);
}
