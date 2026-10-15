"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }

    if (requiredRole && user.role !== requiredRole) {
      router.replace("/login");
    }
  }, [user, requiredRole, router]);

  if (!user) {
    return <p>Checking authentication...</p>;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <p>Checking permissions...</p>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
