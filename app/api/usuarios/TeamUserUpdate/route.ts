import { NextResponse } from "next/server";
import axios from "axios";

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const teamId = searchParams.get("teamId");
  const userId = searchParams.get("user_id");

  if (!teamId || !userId) {
    return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
  }

  const { display_name, profile_image_url } = await request.json();

  const dataToUpdate: Record<string, string> = {};
  if (display_name) dataToUpdate.display_name = display_name;
  if (profile_image_url) dataToUpdate.profile_image_url = profile_image_url;

  if (Object.keys(dataToUpdate).length === 0) {
    return NextResponse.json(
      { error: "No hay campos para actualizar." },
      { status: 400 }
    );
  }

  const apiUrl = `https://api.stack-auth.com/api/v1/team-member-profiles/${teamId}/${userId}`;

  const projectId = process.env.NEXT_PUBLIC_STACK_PROJECT_ID!;
  const secretServerKey = process.env.STACK_SECRET_SERVER_KEY!;

  try {
    const response = await axios.patch(apiUrl, dataToUpdate, {
      headers: {
        "X-Stack-Access-Type": "server",
        "X-Stack-Project-Id": projectId,
        "X-Stack-Secret-Server-Key": secretServerKey,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(
      "Error al actualizar el perfil:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      {
        error: "Error al actualizar el perfil",
        details: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
