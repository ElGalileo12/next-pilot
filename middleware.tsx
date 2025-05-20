import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";

export async function middleware(request: NextRequest) {
  const user = await stackServerApp.getUser();
  const { pathname, searchParams } = request.nextUrl;

  const isSignin = pathname === "/auth/signin";
  const isSignup = pathname === "/auth/signup";
  const isDashboard = pathname.startsWith("/dashboard");

  const code = searchParams.get("code");

  if (code) {
    const cookieStore = await cookies();
    cookieStore.set("invitation_code", code, {
      secure: true,
      path: "/",
      maxAge: 60 * 30,
    });
  }

  if (!user && isDashboard) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (user && (isSignin || isSignup)) {
    return NextResponse.redirect(new URL("/verificationUser", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
