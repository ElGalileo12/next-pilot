import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const teamId = "ac0a0072-f41c-4703-ab63-0983b54823d2";
  const apiUrl = `https://api.stack-auth.com/api/v1/team-member-profiles?team_id=${teamId}`;

  const projectId = process.env.NEXT_PUBLIC_STACK_PROJECT_ID;
  const secretServerKey = process.env.STACK_SECRET_SERVER_KEY;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "X-Stack-Access-Type": "server",
        "X-Stack-Project-Id": projectId,
        "X-Stack-Secret-Server-Key": secretServerKey,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener los miembros" },
      { status: 500 }
    );
  }
}
