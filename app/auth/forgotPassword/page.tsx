"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PasswordField from "@/app/components/PasswordField";
import Link from "next/link";
import { useStackApp } from "@stackframe/stack";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function CustomCredentialSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const app = useStackApp();

  const onSubmit = async () => {
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (!password) return setError("Por favor ingresa la contraseña");
    const result = await app.signUpWithCredential({ email, password });
    if (result.status === "error") setError(result.error.message);
  };

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      document.cookie = `invitation_code=${code}; path=/; max-age=${
        60 * 10
      }; SameSite=Strict`;
    }
  }, [searchParams]);

  return (
    <>
      <section
        className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
        style={{ backgroundImage: "url('/login/camisetas.jpg')" }}
      >
        <div className="bg-white bg-opacity-90 max-w-md w-full rounded-2xl shadow-lg p-8 text-center space-y-6">
          <div>
            <h1 className="text-xl font-bold text-sky-900">
              Bienvenido a Goat Sport
            </h1>
            <p className="text-sm text-sky-700 mt-2">
              Tu sitio ideal para la gestión de equipos
            </p>
          </div>

          <div className="bg-sky-500 rounded-full inline-block px-6 py-1 text-white text-sm font-semibold">
            <p>REGRISTRO DE USUARIO</p>
          </div>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <div className="relative">
              <UserIcon className="absolute w-5 h-5 text-sky-400 left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                autoComplete="off"
                value={email}
                placeholder="Correo electrónico"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md bg-sky-50 border border-sky-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-sky-400 text-sky-800 placeholder:text-sky-800"
              />
            </div>

            {error && <p className="text-red-600 text-base">{error}</p>}

            <button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 rounded-md transition"
            >
              Registrarse
            </button>

            <p className="text-sm font-light text-sky-800">
              ¿Ya tienes una cuenta?{" "}
              <Link
                href="/auth/signin"
                className="text-sky-500 hover:underline"
              >
                Inicia sesión
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
