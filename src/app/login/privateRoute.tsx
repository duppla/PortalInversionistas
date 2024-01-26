'use client'
import { ReactNode, useEffect, useState} from 'react';
import { useRouter } from 'next/navigation'; 
/* import {useRouter} from "next/router"; */
import { useAuth } from '../context/authContext';

import  navigation from 'next'

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const [redirectToHome, setRedirectToHome] = useState(false);

  useEffect(() => {
    console.log('Efecto 1 ejecutado');
    if (!user) {
      setRedirectToHome(true);
    }
  }, [user]);

  useEffect(() => {
    console.log('Efecto 2 ejecutado');
    if (redirectToHome) {
      router.push('/');
    }
  }, [redirectToHome, router]);

  return <>{children}</>;
};

export default PrivateRoute;
