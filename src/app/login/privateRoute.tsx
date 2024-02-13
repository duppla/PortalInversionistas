'use client'
import { ReactNode, useEffect, useState} from 'react';
import { useRouter } from 'next/navigation'; 
/* import {useRouter} from "next/router"; */
import { useAuth } from '../context/authContext';

import  navigation from 'next'

interface PrivateRouteProps {
  children: ReactNode;
}

/* const PrivateRoute = ({ children }: PrivateRouteProps) => {
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

export default PrivateRoute; */

export default function ProtectedRoute({ children }: PrivateRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/'); // Redireccionar a la página de inicio de sesión si el usuario no está autenticado
    }
  }, [user, loading, router]);

  // Si el usuario aún no ha sido cargado desde Firebase, puedes mostrar un loader o un mensaje de carga
/*   if (loading) {
    return <div>Cargando...</div>;
  } */

  // Si el usuario está autenticado, renderizar el contenido de la ruta protegida
  return <>{children}</>;
}
