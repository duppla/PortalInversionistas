"use client";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
/* import {useRouter} from "next/router"; */
import { useAuth } from "../context/authContext";

import navigation from "next";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: PrivateRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!loading && !token) {
      router.push("/"); // Redireccionar a la página de inicio de sesión si el usuario no está autenticado
    }
  }, [user, loading, router]);

  return <>{children}</>;
}
