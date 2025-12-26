"use server";

import { cookies } from "next/headers";

// TODO: Add expiration time
export async function setAuthCookie(token: string) {
  (await cookies()).set("authToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
}
