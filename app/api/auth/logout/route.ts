import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  const response = NextResponse.redirect(
    new URL("/", process.env.NEXTAUTH_URL || "http://localhost:3000")
  );

  // Delete all auth-related cookies using Set-Cookie header
  for (const cookie of allCookies) {
    response.headers.append(
      "Set-Cookie",
      `${cookie.name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax`
    );
  }

  return response;
}

export async function GET() {
  return POST();
}
