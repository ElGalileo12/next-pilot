// app/login/page.tsx
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/solid";

export default function LoginPage() {
  return (
    <main
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: "url('login/campo-futbol.jpg')" }} // Asegúrate de guardar la imagen como bg-login.png en /public
    >
      <div className="bg-white bg-opacity-90 max-w-md w-full rounded-2xl shadow-lg p-8 text-center space-y-6">
        {/* Encabezado */}
        <div>
          <h1 className="text-xl font-bold text-sky-900">
            Welcome to the website
          </h1>
          <p className="text-sm text-sky-700">
            Learn lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Título del formulario */}
        <div className="bg-sky-500 rounded-full inline-block px-6 py-1 text-white text-sm font-semibold">
          USER LOGIN
        </div>

        {/* Formulario */}
        <form className="space-y-4">
          {/* Email/Usuario */}
          <div className="relative">
            <UserIcon className="absolute w-5 h-5 text-sky-400 left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-sky-50 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sky-800"
            />
          </div>

          {/* Contraseña */}
          <div className="relative">
            <LockClosedIcon className="absolute w-5 h-5 text-sky-400 left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-sky-50 border border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400 text-sky-800"
            />
          </div>

          {/* Acciones inferiores */}
          <div className="flex justify-between text-xs text-sky-700">
            <label className="flex items-center space-x-1">
              <input type="checkbox" className="accent-sky-500" />
              <span>Remember</span>
            </label>
            <a href="#" className="hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Botón Login */}
          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 rounded-full transition"
          >
            LOGIN
          </button>

          {/* Crear cuenta */}
          <div className="text-sm mt-2">
            <a href="#" className="text-sky-700 hover:underline">
              Create Account
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
