// app/verify-email/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"pending" | "success" | "error">(
    "pending"
  );

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) return setStatus("error");
  }, [searchParams]);

  if (status === "pending") return <p>Verificando...</p>;
  if (status === "success")
    return <p>¡Tu email ha sido verificado con éxito!</p>;
  return <p>Hubo un error al verificar tu email.</p>;
}
