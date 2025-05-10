"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useUser } from "@stackframe/stack";
import TableUser from "@/app/components/TableUsers";
import { getUsersTeam, getTeamId, getTeamUserData } from "@/app/lib/actions";
import { TeamMembersSkeleton } from "@/app/ui/skeletons";

export default function TeamManagementPanel() {
  const user = useUser();
  let team = user?.selectedTeam;

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dataTeam, setDataTeam] = useState<any[]>([]);
  interface TeamData {
    profile_image_url?: string;
    display_name?: string;
    id?: string;
    created_at_millis?: number;
  }

  const [teamData, setTeamData] = useState<TeamData>({});

  const fetchUsers = async () => {
    try {
      if (!user?.id) return;
      const data = await getUsersTeam(user.id);
      const responseTeam = await getTeamUserData(user.id);
      setTeamData(responseTeam);
      setDataTeam(data.items);
    } catch (error) {
      console.error("Error al obtener usuarios del equipo:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

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

  return (
    <section className="flex flex-col min-h-screen w-full  p-6 gap-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Panel de Gestión de Usuario</h1>
        <div className="flex items-center justify-between border rounded-lg p-2 shadow-sm w-1/3 max-w-sm bg-white">
          <div className="flex items-center space-x-5">
            <Image
              width={28}
              height={28}
              src={teamData?.profile_image_url || "/default-team-logo.png"}
              alt="Team Logo"
              className="object-cover rounded-md"
            />
            <span className="text-sm font-medium text-gray-900">
              {teamData?.display_name || "Sin equipo"}
            </span>
          </div>
        </div>
      </header>

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

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Editar Usuario </h2>

        {dataTeam && dataTeam?.length > 0 ? (
          <TableUser getUsersTeam={dataTeam} />
        ) : (
          <TeamMembersSkeleton />
        )}
      </div>
    </section>
  );
}
