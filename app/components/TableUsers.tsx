import { useEffect, useState } from "react";

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

type TableUserProps = {
  getUsersTeam: any;
};

export default function TableUser({ getUsersTeam }: TableUserProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTeamUsers();
  }, []);

  const fetchTeamUsers = async () => {
    try {
      console.log(getUsersTeam, "getUsersTeam");

      const mappedMembers: Member[] = getUsersTeam.map((user: any) => ({
        id: user.user_id,
        teamProfileId: {
          displayName: user.display_name || "Sin nombre",
          profileImageUrl: user.profile_image_url || null,
        },
        email: user.user.primary_email || "Sin correo",
      }));
      console.log("mappedMembers", mappedMembers);

      setMembers(mappedMembers);
    } catch (error) {
      console.error("Error al cargar miembros del equipo", error);
    } finally {
      setLoading(false);
    }
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
              alt={selectedMember.id}
              className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
            />
            <p className="text-sm text-gray-700">
              Email: {selectedMember.email}
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
              <img
                src={
                  member.teamProfileId.profileImageUrl || "default-image.jpg"
                }
                alt={member.id}
                className="w-12 h-12 object-cover rounded-full mt-2"
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
