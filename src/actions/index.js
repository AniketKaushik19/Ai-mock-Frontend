"use server";

import { cookies } from "next/headers";

export async function getProfile() {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const res = await fetch(
      `${process.env.PUBLIC_BACKEND_URL}profile`,
      {
        headers: {
          Cookie: cookieHeader,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) return null;

    return await res.json();
  } catch {
    return null;
  }
}
