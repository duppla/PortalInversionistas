"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({
  children,
}: Readonly<PrivateRouteProps>) {
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
