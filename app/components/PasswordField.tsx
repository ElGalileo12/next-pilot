// components/PasswordField.tsx
"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LockClosedIcon } from "@heroicons/react/24/solid";

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
        <LockClosedIcon className="absolute w-5 h-5 text-sky-400 left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder={label}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          autoComplete="new-password"
          className={`w-full pl-10 pr-4 py-2 bg-sky-50 text-sky-800 rounded-full 
          ${error ? "border-red-500" : "border-sky-200"} 
          focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent 
          placeholder:text-sky-400`}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sky-500 hover:text-sky-800"
          tabIndex={-1}
        >
          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </>
  );
}
