import { NextResponse } from "next/server";
import { getProfile } from "./actions";

const ALWAYS_PUBLIC = ["/signup", "/login"];

export async function proxy(req) {
  const { pathname } = req.nextUrl;

  if (ALWAYS_PUBLIC.includes(pathname)) {
    return NextResponse.next();
  }

  const user = await getProfile();

  if (!user) {
    if (pathname === "/" || pathname === "/signup" || pathname === "/login") {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/signup", req.url));
  }

  if (user.isBoarding === 0) {
    if (pathname !== "/onboarding") {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }
    return NextResponse.next();
  }

  if (user.isBoarding === 1) {
    if (
      pathname === "/" ||
      pathname === "/signup" ||
      pathname === "/onboarding"
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
