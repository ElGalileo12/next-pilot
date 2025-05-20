import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  const apiUrl = "https://api.stack-auth.com/api/v1/team-invitations/send-code";
  const projectId = process.env.NEXT_PUBLIC_STACK_PROJECT_ID!;
  const secretServerKey = process.env.STACK_SECRET_SERVER_KEY!;

  try {
    const response = await axios.post(apiUrl, code, {
      headers: {
        "X-Stack-Access-Type": "server",
        "X-Stack-Project-Id": projectId,
        "X-Stack-Secret-Server-Key": secretServerKey,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(
      "Error al invitar miembro:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Error al invitar miembro", details: error.response?.data },
      { status: 500 }
    );
  }
}
