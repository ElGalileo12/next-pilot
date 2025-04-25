"use client";

import { useState } from "react";
import { useUser, SelectedTeamSwitcher } from "@stackframe/stack";
import TableUser from "@/app/components/TableUsers";

export default function TeamManagementPanel() {
  const user = useUser();
  const team = user?.selectedTeam;

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [userEmail, setUserEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");

  const handleInvite = async () => {
    if (!email) return setMessage("Debes ingresar un correo válido.");
    if (!team) return setMessage("No estás en un equipo.");

    try {
      setLoading(true);
      setMessage(null);

      await team.inviteUser({
        email,
        callbackUrl: `${window.location.origin}/auth/signup`,
      });

      setMessage("Invitación enviada correctamente.");
      setEmail("");
    } catch (error) {
      console.error(error);
      setMessage("Ocurrió un error al enviar la invitación.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    console.log("Actualización de perfil (simulado)", {
      displayName,
      userEmail,
      password,
    });
    // Aquí iría la lógica real de actualización si Stack lo permite.
  };

  const handleRemoveFromTeam = async () => {
    try {
      setLoading(true);
      setMessage(null);

      if (!team) return setMessage("No estás en un equipo.");

      //  await team.removeUser(user!.id);
      setMessage("Has sido eliminado del equipo.");
    } catch (error) {
      console.error(error);
      setMessage("No se pudo eliminar del equipo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen w-full bg-gray-100 p-6 gap-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Panel de Gestión de Usuario</h1>
        <SelectedTeamSwitcher />
      </header>

   {/*    <seCtion className="mb-4"> */}

      <section>
        <TableUser />
      </section>

      {/* Card 1: Invitación */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Invitar usuario al equipo
        </h2>
        <p className="mb-2 text-sm text-gray-600">
          Equipo seleccionado: <strong>{team?.displayName || "Ninguno"}</strong>
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="correo@cliente.com"
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        />
        <button
          onClick={handleInvite}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          {loading ? "Enviando..." : "Enviar invitación"}
        </button>
        {message && <p className="mt-4 text-sm text-center">{message}</p>}
      </div>

      {/* Card 2: Editar Usuario */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Editar Usuario</h2>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Nombre"
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        />
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="Correo"
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nueva contraseña"
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
        />
        <button
          onClick={handleUpdateProfile}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Guardar cambios
        </button>
      </div>

      {/* Card 3: Eliminar Usuario */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Eliminar del equipo</h2>
        <button
          onClick={handleRemoveFromTeam}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Eliminarme del equipo
        </button>
      </div>
    </main>
  );
}
