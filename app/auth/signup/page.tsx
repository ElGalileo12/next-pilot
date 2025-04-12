"use client";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import PasswordField from "@/app/components/PasswordField";

export default function CustomCredentialSignIn() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [register, setRegister] = useState(false);

  const onRegister = async () => {
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (!password) return setError("Por favor ingresa la contraseña");

    try {
      const result = await axios.post("/api/auth/signup", {
        username: username,
        email: email,
        password: password,
      });

      console.log(result);
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        setError(error.response?.data.error || "Error del servidor");
      }
    }
  };

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  return (
    <>
      <section className="bg-gray-50 p-20">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
          <div className="w-full bg-gray-200 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Registrarse
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  onRegister();
                }}
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Galileo"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    autoComplete="off"
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
                  type="submit"
                  className="text-white w-full bg-sky-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  {register ? "Registrarse" : "Iniciar sesión"}
                </button>

                <p className="text-sm font-light text-gray-500">
                  ¿Ya tienes una cuenta?
                  <button
                    type="button"
                    onClick={() => {
                      clearForm(), setRegister(!register);
                    }}
                    className="ml-1 text-blue-600 hover:underline"
                  >
                    Inicia sesión
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
