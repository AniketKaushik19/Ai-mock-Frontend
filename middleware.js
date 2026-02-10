// middleware.js
import { NextResponse } from "next/server";

// Public routes that don't require auth
const PUBLIC_PATHS = ["/", "/signup"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Home and signup are always available
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // Call the same API your useGetProfile hook uses
  // (adjust the URL to match your backend route)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile`, {
    headers: {
      cookie: req.headers.get("token") || "",
    },
  });

  if (!res.ok) {
    // No profile → force signup
    return NextResponse.redirect(new URL("/signup", req.url));
  }

  const data = await res.json();

  // If not signed up (no user object)
  if (!data?.user) {
    return NextResponse.redirect(new URL("/signup", req.url));
  }

  // If signed up but onboarding not done
  if (!data.user.isBoarding) {
    if (pathname !== "/onboarding") {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }
    return NextResponse.next();
  }

  // If onboarding done, allow dashboard
  if (data.user.isBoarding) {
    if (pathname === "/signup" || pathname === "/onboarding") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware to all routes except static assets
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};