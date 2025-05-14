"use client";

import { useState } from "react";
import PasswordField from "@/app/components/PasswordField";
import Link from "next/link";
import { useUser, useStackApp } from "@stackframe/stack";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default function CustomCredentialSignIn() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const app = useStackApp();

  const onSubmit = async () => {
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (!password) return setError("Por favor ingresa la contraseña");
    const result = await app.signUpWithCredential({ email, password });
    if (result.status === "error") setError(result.error.message);

    const user = useUser();
    if (user) {
      await user.update({ displayName: username });
    }
  };

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

            <PasswordField
              label="Contraseña"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <PasswordField
              label="Confirmar contraseña"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={
                password !== confirmPassword
                  ? "Las contraseñas no coinciden"
                  : undefined
              }
            />

            {error && <p className="text-red-600 text-base">{error}</p>}
            <button
              type="button"
              className="flex items-center justify-center w-full max-w-sm px-4 py-2 border rounded-md shadow-sm bg-white hover:bg-gray-100 transition"
              onClick={async () => {
                await app.signInWithOAuth("google");
              }}
            >
              <Image
                src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                alt="Google logo"
                width={20}
                height={20}
                className="mr-2"
              />
              <span className="text-sm text-gray-800 font-medium">
                Registrate con Google
              </span>
            </button>

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
