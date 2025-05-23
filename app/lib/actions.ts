"use server";

import { cookies } from "next/headers";
import axios from "axios";
import postgres from "postgres";
import { string, z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { stackServerApp } from "@/stack";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
});

const UpdateInvoice = FormSchema.omit({ id: true, date: true });
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  //throw new Error('Failed to Delete Invoice');
  // Uncomment the following line to enable deletion
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath("/dashboard/invoices");
}

// Api stack auth, funcional
export async function getUsersTeam(userId: string) {
  try {
    const selectedTeamId = await axios.get(
      `${baseUrl}/api/usuarios/TeamId?user_id=${userId}`
    );

    const response = await axios.get(
      `${baseUrl}/api/usuarios?teamId=${selectedTeamId.data.teamId}`
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Error al obtener usuarios del equipo:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function getTeamUserData(userId: string) {
  try {
    const selectedTeamId = await axios.get(
      `${baseUrl}/api/usuarios/TeamId?user_id=${userId}`
    );

    const response = await axios.get(
      `${baseUrl}/api/usuarios/TeamUserData?user_id=${selectedTeamId.data.teamId}`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error al obtener el ID del equipo:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function getTeamId(userId: string) {
  try {
    const response = await axios.get(
      `${baseUrl}/api/usuarios/TeamId?user_id=${userId}`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error al obtener el ID del equipo:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function getAcceptTeamInvitation(code: string, token: string) {
  try {
    const res = await axios.post(
      `${baseUrl}/api/usuarios/TeamInvitation`,
      { code },
      {
        headers: {
          "x-stack-access-token": token,
          "Content-Type": "application/json",
        },
      }
    );

    return { success: true, data: res.data };
  } catch (err: any) {
    console.error("Error al verificar código:", err);
    return {
      success: false,
      error: err.response?.data?.message || err.message,
    };
  }
}

export async function getTeamInvitation(code: {}) {
  try {
    const res = await axios.post(
      `${baseUrl}/api/usuarios/TeamUserInvitation`,
      { code },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return { success: true, data: res.data };
  } catch (err: any) {
    console.error("Error al verificar código:", err);
    return {
      success: false,
      error: err.response?.data?.message || err.message,
    };
  }
}

export async function getMemberRole(
  userId: string
): Promise<"admin" | "member" | null> {
  try {
    const { data: teamRes } = await axios.get(
      `${baseUrl}/api/usuarios/TeamId?user_id=${userId}`
    );

    const teamId = teamRes?.teamId;
    if (!teamId) return null;

    const { data: permissionsRes } = await axios.get(
      `${baseUrl}/api/usuarios/TeamPermissions?teamId=${teamId}&user_id=${userId}`
    );

    const permissions = permissionsRes?.items;

    if (!Array.isArray(permissions) || permissions.length === 0) {
      return null;
    }

    const isAdmin = permissions.some((p) => p.id === "admin");
    return isAdmin ? "admin" : "member";
  } catch (error) {
    console.error("Error al obtener el rol del miembro:", error);
    return null;
  }
}

export async function pathEditUserTeam(
  displayName: string,
  imageProfile: string,
  userId: string
) {
  try {
    const selectedTeamId = await axios.get(
      `${baseUrl}/api/usuarios/TeamId?user_id=${userId}`
    );

    const response = await axios.patch(
      `${baseUrl}/api/usuarios/TeamUserUpdate?teamId=${selectedTeamId.data.teamId}&user_id=${userId}`,
      {
        display_name: displayName,
        profile_image_url: imageProfile,
      }
    );

    return response.data;
  } catch (err: any) {
    console.error("Error al verificar código:", err);
    return {
      success: false,
      error: err.response?.data?.message || err.message,
    };
  }
}

export async function deleteUserTeam(userId: string) {
  try {
    const selectedTeamId = await axios.get(
      `${baseUrl}/api/usuarios/TeamId?user_id=${userId}`
    );

    const response = await axios.delete(
      `${baseUrl}/api/usuarios/TeamUserDelete?teamId=${selectedTeamId.data.teamId}&user_id=${userId}`
    );

    return response.data;
  } catch (err: any) {
    console.error("Error al verificar código:", err);
    return {
      success: false,
      error: err.response?.data?.message || err.message,
    };
  }
}

// Codigo de verificación user
export async function getLocalCode() {
  const cookieStore = await cookies();
  const code = cookieStore.get("invitation_code")?.value;
  return code ?? null;
}

// para ver los usuarios que han sido invitados a un equipo
export async function getTeamInvitations(teamId: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

    const response = await axios.get(
      `${baseUrl}/api/usuarios/list-invitation?teamId=${teamId}`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error al obtener usuarios del equipo:",
      error.response?.data || error.message
    );
    throw error;
  }
}
// para aceptar invitaciones
export async function getTeamAccept(teamId: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

    const response = await axios.get(
      `${baseUrl}/api/usuarios/accept-invitation?teamId=${teamId}`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error al obtener usuarios del equipo:",
      error.response?.data || error.message
    );
    throw error;
  }
}
// en espera...
export async function deleteTeamInvitation(teamId: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

    const response = await axios.get(
      `${baseUrl}/api/usuarios/delete-invitation${teamId}`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error al obtener usuarios del equipo:",
      error.response?.data || error.message
    );
    throw error;
  }
}
