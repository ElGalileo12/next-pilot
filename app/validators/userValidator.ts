export function validateUserInput(
  username: string,
  email: string,
  password: string
) {
  if (!username || !email || !password) {
    return "Todos los campos son requeridos";
  }

  if (password.length < 6) {
    return "La contraseña debe tener al menos 6 caracteres";
  }

  return null;
}
