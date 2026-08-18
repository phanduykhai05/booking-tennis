"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useSession } from "@/lib/api/session";

type AdminRouteGuardProps = {
  children: React.ReactNode;
};

export default function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const router = useRouter();
  const { isReady, session } = useSession();
  const isAdmin = session?.user.role === "admin";

  useEffect(() => {
    if (isReady && !isAdmin) router.replace("/404");
  }, [isAdmin, isReady, router]);

  if (!isReady || !isAdmin) return null;

  return children;
}
