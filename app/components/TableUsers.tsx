"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { pathEditUserTeam, deleteUserTeam } from "@/app/lib/actions";

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
  const [editableName, setEditableName] = useState("");
  const [editableImage, setEditableImage] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchTeamUsers();
  }, []);

  const fetchTeamUsers = async () => {
    try {
      const mappedMembers: Member[] = getUsersTeam.map((user: any) => ({
        id: user.user_id,
        teamProfileId: {
          displayName: user.display_name || "Sin nombre",
          profileImageUrl: user.profile_image_url || null,
        },
        email: user.user.primary_email || "Sin correo",
      }));
      setMembers(mappedMembers);
    } catch (error) {
      console.error("Error al cargar miembros del equipo", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (member: Member) => {
    setSelectedMember(member);
    setEditableName(member.teamProfileId.displayName || "");
    setEditableImage(member.teamProfileId.profileImageUrl || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMember(null);
    setEditableName("");
    setEditableImage(null);
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    if (!selectedMember) return;

    try {
      const result = await pathEditUserTeam(
        editableName,
        editableImage || "",
        selectedMember.id
      );
      closeModal();
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = document.createElement("img");
      img.onload = () => {
        const size = Math.min(img.width, img.height);
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        const offsetX = (img.width - size) / 2;
        const offsetY = (img.height - size) / 2;
        ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, size, size);
        canvas.toBlob(
          (blob) => {
            if (!blob) return;

            if (blob.size > 100 * 1024) {
              alert(
                "La imagen supera los 100 KB, intenta con otra o usa menos calidad."
              );
              return;
            }

            const readerBase64 = new FileReader();
            readerBase64.onloadend = () => {
              const base64data = readerBase64.result as string;
              setEditableImage(base64data);
            };
            readerBase64.readAsDataURL(blob);
          },
          "image/jpeg",
          0.7
        );
      };
      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  };

  const openDeleteModal = (member: Member) => {
    setSelectedMember(member);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedMember) return;

    try {
      const result = await deleteUserTeam(selectedMember.id);
      setMembers((prev) => prev.filter((m) => m.id !== selectedMember.id));
      closeDeleteModal();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedMember(null);
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
            <h3 className="text-xl font-semibold mb-4">Editar miembro</h3>

            <input
              type="text"
              value={editableName}
              onChange={(e) => setEditableName(e.target.value)}
              placeholder="Nombre del miembro"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            />

            {editableImage && (
              <Image
                src={editableImage}
                alt="Vista previa"
                width={96}
                height={96}
                className="object-cover rounded-full mx-auto mb-4"
                unoptimized
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Guardar
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {isDeleteModalOpen && selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={closeDeleteModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4 text-center">
              ¿Estás seguro que deseas eliminar a este miembro?
            </h3>
            <p className="text-center text-gray-700 mb-4">
              {selectedMember.teamProfileId.displayName}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Eliminar
              </button>
              <button
                onClick={closeDeleteModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      <ul className="space-y-2">
        <li className="font-medium text-gray-700 border-b pb-2 flex items-center justify-between">
          <div className="flex items-center gap-3 w-2/5">
            <span>Miembro</span>
          </div>
          <div className="w-2/5">
            <span>Email</span>
          </div>
          <span>Status</span>
          <div className="w-1/5 flex justify-end">
            <span>Acciones</span>
          </div>
        </li>
        {members.map((member) => (
          <li
            key={member.id}
            onClick={() => openModal(member)}
            className="flex items-center justify-between border-b pb-2 cursor-pointer hover:bg-gray-100 transition rounded"
          >
            <div className="flex items-center gap-3 w-2/5">
              <Image
                width={28}
                height={28}
                src={
                  member.teamProfileId.profileImageUrl ||
                  "/customers/user default.png"
                }
                alt={member.id}
                className="h-10 w-10 mr-2 object-cover rounded-full"
              />
              <p className="font-medium">{member.teamProfileId.displayName}</p>
            </div>
            <div className="w-2/5 text-sm text-gray-600">{member.email}</div>
            <span>Status</span>
            <div className="w-1/5 flex gap-2 justify-end">
              <button
                onClick={() => openModal(member)}
                className="rounded-md border p-2 hover:bg-gray-100"
              >
                <PencilIcon className="w-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openDeleteModal(member);
                }}
                className="rounded-md border p-2 hover:bg-gray-100"
              >
                <TrashIcon className="w-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
