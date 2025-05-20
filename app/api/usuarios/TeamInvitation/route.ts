import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  const accessToken = req.headers.get("x-stack-access-token");

  const idProject = process.env.NEXT_PUBLIC_STACK_PROJECT_ID!;
  const idClientKey = process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY!;

  const res = await fetch(
    "https://api.stack-auth.com/api/v1/team-invitations/accept",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Stack-Access-Type": "client",
        "X-Stack-Project-Id": idProject,
        "X-Stack-Publishable-Client-Key": idClientKey,
        "x-stack-access-token": accessToken!,
      },
      body: JSON.stringify({ code }),
    }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
