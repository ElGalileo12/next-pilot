"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function EmailInviteRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Solo se ejecuta en el dashboard, no en auth ni handler
    const isInDashboard = pathname?.startsWith("/dashboard");
    if (!isInDashboard) return;

    const code = localStorage.getItem("pending_invite_code");
    if (code) {
      localStorage.removeItem("pending_invite_code");
      router.replace(`/handler/email-verification?code=${code}`);
    }
  }, [pathname]);

  return null;
}
