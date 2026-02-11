import { NextResponse } from "next/server";
import { getProfile } from "@/actions";

const ALWAYS_PUBLIC = ["/signup", "/login","/contact" , "/about" ,"/",];

export async function proxy(req) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (ALWAYS_PUBLIC.includes(pathname)) {
    return NextResponse.next();
  }

  const user = await getProfile();
  const res=await user?.user || null;
  
  

  if (!res) {
    if (pathname === "/" || pathname === "/signup" || pathname === "/login") {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/signup", req.url));
  }

  if (res?.isBoarding === 0) {
    if (pathname !== "/onboarding") {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }
    return NextResponse.next();
  }

  if (res?.isBoarding === 1) {
    if (
      pathname === "/" 
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};