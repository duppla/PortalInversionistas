'use client'
import { ReactNode } from "react";
import PrivateRoute from "../login/privateRoute";
import Navbar from './Components/navbarFixed';
import { useAuth } from "../context/authContext";

function Layout({ children }: { children: ReactNode; }) {

  const { logout } = useAuth();

  return (
    <PrivateRoute>
      <div>
        <Navbar />
     
        
        <div>
          {children}
        </div>
        <button onClick={logout}>Cerrar sesión</button>
      </div>
    </PrivateRoute>
  )
}

export default Layout
