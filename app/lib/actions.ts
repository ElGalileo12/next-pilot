"use server";

import axios from "axios";
import postgres from "postgres";
import { string, z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
export async function acceptTeamInvitation(code: string, token: string) {
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
// -------------------------

// para ver los usuarios que pertenecen a un equipo
export async function getUsersTeam(teamId: string) {
  try {
    const response = await axios.get(
      `${baseUrl}/api/usuarios?teamId=${teamId}`
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
