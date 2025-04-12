"use client";
import { useStackApp, useUser } from "@stackframe/stack";
import { useEffect, useState } from "react";
import PasswordField from "@/app/components/PasswordField";

export default function CustomCredentialSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [register, setRegister] = useState(false);
  const app = useStackApp();
  const user = useUser();

  useEffect(() => {
    const obtenerSesiones = async () => {
      if (user) {
        const sesionesActivas = await user.getActiveSessions();
        console.log(sesionesActivas[0].isCurrentSession);
      }
    };

    obtenerSesiones();
  }, [user]);

  const onSubmit = async () => {
    if (!password) return setError("Por favor ingresa la contraseña");
    const result = await app.signInWithCredential({ email, password });
    if (result.status === "error") setError(result.error.message);
  };

  const onRegister = async () => {
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (!password) return setError("Por favor ingresa la contraseña");
    const result = await app.signUpWithCredential({ email, password });
    if (result.status === "error") setError(result.error.message);
  };

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  return (
    <>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                {register ? "Registrarse" : "Inicia sesión"}
              </h1>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  register ? onRegister() : onSubmit();
                }}
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Email
                  </label>
                  <input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                  />
                </div>

                <PasswordField
                  label="Contraseña"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {register && (
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
                )}

                <button
                  type="submit"
                  className="text-white w-full bg-sky-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  {register ? "Registrarse" : "Iniciar sesión"}
                </button>

                <p className="text-sm font-light text-gray-500">
                  {register
                    ? "¿Ya tienes una cuenta?"
                    : "¿Aún no tienes una cuenta?"}
                  <button
                    type="button"
                    onClick={() => {
                      clearForm(), setRegister(!register);
                    }}
                    className="ml-1 text-blue-600 hover:underline"
                  >
                    {register ? "Inicia sesión" : "Registrarse"}
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
