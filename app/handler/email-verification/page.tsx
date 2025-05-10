"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@stackframe/stack";
import LoaderDots from "@/public/svg/LoaderDots";
import { getAcceptTeamInvitation } from "@/app/lib/actions";

export default function EmailVerificationHandler() {
  const searchParams = useSearchParams();
  const user = useUser();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const hasVerified = useRef(false);

  useEffect(() => {
    if (hasVerified.current) return;

    const code = searchParams.get("code");
    const token = (user as any)?._internalSession?._accessToken?._value?.token;

    if (!code) {
      setStatus("error");
      return;
    }

    hasVerified.current = true;

    const verifyCode = async () => {
      const res = await getAcceptTeamInvitation(code, token);
      if (res.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    };

    verifyCode();
  }, [searchParams, user]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {status === "loading" && (
        <button
          type="button"
          className="bg-blue-600 text-white font-medium py-2 px-4 rounded flex items-center justify-around"
          disabled
        >
          <LoaderDots />
          Procesando
        </button>
      )}
      {status === "success" && (
        <div className="bg-white shadow-xl rounded-xl p-6 text-center max-w-xl w-full">
          <h2 className="text-2xl font-semibold text-green-600 mb-2">
            ¡Correo verificado correctamente!
          </h2>
          <p className="text-gray-500 my-6">
            Tu invitación ha sido aceptada y ahora formas parte del equipo.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-sky-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Ir al inicio
          </button>
        </div>
      )}
      {status === "error" && (
        <div className="bg-white shadow-xl rounded-xl p-6 text-center max-w-xl w-full">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">
            ¡Error al intentar unirte al equipo!
          </h2>
          <p className="text-gray-500 my-6">
            Tu invitación produjo un error, por favor comunicate con el
            administrador.
          </p>
        </div>
      )}
    </div>
  );
}
