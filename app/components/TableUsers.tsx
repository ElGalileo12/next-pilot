import { useUser } from "@stackframe/stack";
import { useEffect, useState } from "react";
import { toBase64 } from "@/app/lib/utils";

type Team = {
  displayName: string | null;
  profileImageUrl: string | null;
};

type Member = {
  id: string;
  teamProfileId: Team;
  email: string;
  roles: string[];
};

type LocalTeamUser = {
  id: string;
  email: string;
  roles: string[];
  teamProfile?: {
    displayName: string;
    profileImageUrl: string | null;
  };
};

export default function TableUser() {
  const user = useUser({ or: "redirect" });
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  const team = user?.useTeam("ac0a0072-f41c-4703-ab63-0983b54823d2");
  console.log(team?.useUsers());
  const users: LocalTeamUser[] | undefined = team?.useUsers() as
    | LocalTeamUser[]
    | undefined;

  const teamProfile = team ? user.useTeamProfile(team) : null;

  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /*   const listaUsuarios = team?.listUsers(); */

  useEffect(() => {
    if (!users || users.length === 0) return;
    
  

    /* 
    listaUsuarios?.then((users) => {
      users.forEach((user) => {
        console.log(user);
      });
    }); */

    setMembers(
      users.map((user: LocalTeamUser) => ({
        id: user.id,
        teamProfileId: {
          displayName: user.teamProfile?.displayName || "Sin nombre",
          profileImageUrl: user.teamProfile?.profileImageUrl || null,
        },
        email: user.email || "Sin correo",
        roles: user.roles || [],
      }))
    );

    setLoading(false);
  }, [users?.length]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 100 * 1024) {
      alert("La imagen debe pesar menos de 100KB");
      return;
    }

    const base64 = await toBase64(file);

    if (!team) {
      console.error("Team is null, cannot update team profile.");
      return;
    }

    await team.update({
      profileImageUrl: base64,
    });
  };

  const openModal = (member: Member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMember(null);
    setIsModalOpen(false);
  };

  if (loading) return <p className="p-4">Cargando miembros...</p>;

  return (
    <>
      {isModalOpen && selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-2">
              {selectedMember.teamProfileId.displayName}
            </h3>
            <img
              src={
                selectedMember.teamProfileId.profileImageUrl ||
                "default-image.jpg"
              }
              //alt={selectedMember.teamProfileId.displayName}
              className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
            />
            <p className="text-sm text-gray-700">
              Email: {selectedMember.email}
            </p>
            <p className="text-sm text-gray-700">
              Roles: {selectedMember.roles.join(", ")}
            </p>
          </div>
        </div>
      )}
      <div className="p-4 bg-white shadow rounded-lg w-full max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Miembros del equipo</h2>
        <ul className="space-y-2">
          {members.map((member) => (
            <li
              key={member.id}
              onClick={() => openModal(member)}
              className="flex flex-row justify-between items-center border-b pb-2 cursor-pointer hover:bg-gray-100 transition rounded"
            >
              <p className="font-medium">{member.teamProfileId.displayName}</p>
              <p className="text-sm text-gray-600">{member.email}</p>
              <p className="text-xs text-gray-500">
                Roles: {member.roles.join(", ")}
              </p>
              <img
                src={
                  member.teamProfileId.profileImageUrl || "default-image.jpg"
                }
                //alt={member.teamProfileId.displayName}
                className="w-12 h-12 object-cover rounded-full mt-2"
              />
            </li>
          ))}
        </ul>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
    </>
  );
}
