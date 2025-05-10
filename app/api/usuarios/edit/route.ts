import { NextResponse } from "next/server";
import axios from "axios";

export async function PATCH(request: Request) {
  const body = await request.json();

  // Asegúrate de que los datos están en el cuerpo de la solicitud
  const { display_name, profile_image_url } = body; // Obtener los valores dinámicamente del cuerpo
  const userId = "3adb6a6f-e7cd-4324-9467-03016d98ecb8"; // También puedes recibir userId como parámetro si es necesario
  const teamId = "ac0a0072-f41c-4703-ab63-0983b54823d2"; // O recibirlo también desde el cuerpo si es necesario

  if (!display_name || !userId) {
    return NextResponse.json(
      { error: "Faltan parámetros necesarios (display_name, userId)" },
      { status: 400 }
    );
  }

  const apiUrl = `https://api.stack-auth.com/api/v1/team-member-profiles/${teamId}/${userId}`;
  const token = process.env.STACK_SECRET_SERVER_KEY!;
  const projectId = process.env.NEXT_PUBLIC_STACK_PROJECT_ID!;

  try {
    const response = await axios.patch(
      apiUrl,
      {
        display_name: display_name, // Usar los valores dinámicos recibidos
        profile_image_url: profile_image_url || "", // O dejar vacío si no es proporcionado
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Stack-Access-Type": "server",
          "X-Stack-Access-Token": token,
          "X-Stack-Project-Id": projectId,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(
      "Error updating member profile:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Error updating member profile", details: error.response?.data },
      { status: 500 }
    );
  }
}
