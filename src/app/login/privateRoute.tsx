'use client'
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/authContext';

import  navigation from 'next'

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useAuth();
  const router = useRouter();

  // Verifica si el usuario está autenticado
  if (!user) {
    // Redirige al usuario a la página de inicio si no está autenticado
    router.push('/');
    return null;
  }

  // Renderiza el componente hijo si el usuario está autenticado
  return <>{children}</>;
};

export default PrivateRoute;
