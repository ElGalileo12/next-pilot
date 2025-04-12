// components/PasswordField.tsx
"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type PasswordFieldProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  name?: string;
  error?: string;
};

export default function PasswordField({
  value,
  onChange,
  label = "Contraseña",
  name = "password",
  error,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <>
      <div className="relative">
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
           autoComplete="new-password"
          className={`bg-gray-50 border ${
            error ? "border-red-500" : "border-gray-300"
          } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10`}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-2/3 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
          tabIndex={-1}
        >
          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </>
  );
}
