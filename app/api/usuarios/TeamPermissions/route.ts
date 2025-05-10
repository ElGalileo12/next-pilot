import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const teamId = searchParams.get("teamId");
  const userId = searchParams.get("user_id");

  const apiUrl = `https://api.stack-auth.com/api/v1/team-permissions?team_id=${teamId}&user_id=${userId}`;
  const projectId = process.env.NEXT_PUBLIC_STACK_PROJECT_ID!;
  const secretServerKey = process.env.STACK_SECRET_SERVER_KEY!;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "X-Stack-Access-Type": "server",
        "X-Stack-Project-Id": projectId,
        "X-Stack-Secret-Server-Key": secretServerKey,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(
      "Error al obtener los miembros:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Error al obtener los miembros", details: error.response?.data },
      { status: 500 }
    );
  }
}
