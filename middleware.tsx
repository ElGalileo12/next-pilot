import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { getMemberRole } from "@/app/lib/actions";

export async function middleware(request: NextRequest) {
  const user = await stackServerApp.getUser();
  const roleCookie = request.cookies.get("user_role")?.value;
/*   let role = roleCookie as "admin" | "member" | null;

  if (!role && user?.id) {
    role = await getMemberRole(user.id);
    if (role) {
      const response = NextResponse.next();
      response.cookies.set("user_role", role, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 6,
      });
    }
  } */
  const { pathname, searchParams } = request.nextUrl;

  const isAuthRoute = pathname.startsWith("/auth");
  const isProtectedRoute = pathname.startsWith("/dashboard");
  const code = searchParams.get("code");

  if (code && user) {
    const redirectUrl = new URL("/handler/email-verification", request.url);
    redirectUrl.searchParams.set("code", code);
    return NextResponse.redirect(redirectUrl);
  }

  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
/* 
  if (user && role === "member" && isProtectedRoute) {
    return NextResponse.redirect(new URL("/grandstand", request.url));
  } */

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
