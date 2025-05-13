"use client";
import { useStackApp } from "@stackframe/stack";
import { useState } from "react";
import PasswordField from "@/app/components/PasswordField";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/solid";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const app = useStackApp();

  const onSubmit = async () => {
    if (!password) return setError("Por favor ingresa la contraseña");
    const result = await app.signInWithCredential({ email, password });
    if (result.status === "error") setError(result.error.message);
  };

  return (
    <>
      <section
        className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
        style={{ backgroundImage: "url('/login/campo-futbol.jpg')" }}
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
            <p>INICIO DE SESIÓN</p>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

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
                autoComplete="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-sky-50 border border-sky-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-sky-400 text-sky-800 placeholder:text-sky-400"
              />
            </div>

            <PasswordField
              label="Contraseña"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-end text-xs text-sky-700">
              <Link
                href="/auth/forgotPassword"
                className="hover:underline font-semibold"
              >
                ¿Has olvidado tu contraseña?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 rounded-full transition"
            >
              Iniciar sesión
            </button>

            <div className="text-sm mt-2">
              <Link href="/auth/signup" className="text-sm mt-2">
                <span className="text-sky-800 hover:underline">
                  Crear una cuenta
                </span>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
