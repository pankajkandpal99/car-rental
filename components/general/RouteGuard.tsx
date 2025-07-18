"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";
import Loader from "./Loader";
import { useAuth } from "@/hooks/use-auth";

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();

  const protectedPaths = ["/dashboard"];
  const authPages = ["/login", "/register"];

  const isProtectedRoute = protectedPaths.some((path) =>
    pathname?.startsWith(path)
  );
  const isAuthPage = authPages.some((path) => pathname?.startsWith(path));

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated && isAuthPage) {
      router.replace("/dashboard");
      return;
    }

    if (!isAuthenticated && isProtectedRoute) {
      router.replace(`/login?callbackUrl=${pathname}`);
      return;
    }
  }, [
    isAuthenticated,
    isLoading,
    isProtectedRoute,
    isAuthPage,
    pathname,
    router,
  ]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated && isProtectedRoute) {
    return null;
  }

  return <>{children}</>;
}
