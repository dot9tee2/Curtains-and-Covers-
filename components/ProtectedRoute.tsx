"use client";
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/signin");
    }
  }, [user, router]);

  if (!user) return null; // Or a loading spinner

  return <>{children}</>;
} 