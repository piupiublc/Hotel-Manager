"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
  allowedRoles?: ('admin' | 'partner' | 'customer')[];
  redirectTo?: string;
}

export function AuthGuard({ 
  children, 
  allowedRoles, 
  redirectTo = "/discovery" 
}: AuthGuardProps) {
  const { user, loading, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isLoggedIn) {
        router.push("/login");
      } else if (allowedRoles && user) {
        const userRole = user.role?.toLowerCase() as any;
        if (!allowedRoles.map(r => r.toLowerCase()).includes(userRole)) {
          // User is logged in but has the wrong role
          router.push(redirectTo);
        }
      }
    }
  }, [user, loading, isLoggedIn, allowedRoles, router, redirectTo]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm font-bold text-slate-500 animate-pulse uppercase tracking-widest">Đang xác thực...</p>
        </div>
      </div>
    );
  }

  // If not logged in or wrong role, the useEffect will handle the redirect.
  // We only render children if the check passes.
  const userRole = user?.role?.toLowerCase() as any;
  const isAllowed = !allowedRoles || (user && allowedRoles.map(r => r.toLowerCase()).includes(userRole));
  
  if (!isLoggedIn || !isAllowed) {
    return null;
  }

  return <>{children}</>;
}
