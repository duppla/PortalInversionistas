'use client'
import { ReactNode, useEffect} from 'react';
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

/*   // Verifica si el usuario está autenticado
  if (!user) {
    // Redirige al usuario a la página de inicio si no está autenticado
    router.push('/');
    return null;
  } */
    // Efecto secundario para manejar la redirección
    useEffect(() => {
      // Verifica si el usuario está autenticado
      if (!user) {
        // Redirige al usuario a la página de inicio si no está autenticado
        router.push('/');
      }
    }, [user, router]); // Asegúrate de incluir las dependencias adecuadas

  // Renderiza el componente hijo si el usuario está autenticado
  return <>{children}</>;
};

export default PrivateRoute;
