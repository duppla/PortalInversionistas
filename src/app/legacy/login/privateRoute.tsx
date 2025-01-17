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
      // ruta protegida
    }
  }, [user, loading, router]);

  return <>{children}</>;
}
