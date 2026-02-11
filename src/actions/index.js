"use server";

import { cookies } from "next/headers";

export async function getProfile() {
  try {
    const cookieStore = await cookies(); // async in server actions
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const res = await fetch(`http://localhost:8082/api/v1/profile`, {
      headers: {
        // If backend expects cookie:
        Cookie: `token=${token}`,
        // Or if backend expects Authorization:
        // Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}