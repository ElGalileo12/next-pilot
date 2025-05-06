import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "@/stack";

export async function middleware(request: NextRequest) {
  const user = await stackServerApp.getUser();
  const { pathname, searchParams } = request.nextUrl;

  const isAuthRoute = pathname.startsWith("/auth");
  const isProtectedRoute = pathname.startsWith("/dashboard");

  const code = searchParams.get("code");

  if (code) {
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

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
