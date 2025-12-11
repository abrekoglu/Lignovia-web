import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const isProduction = process.env.NODE_ENV === "production";
  const isSecure = baseUrl.startsWith("https://");

  const response = NextResponse.redirect(new URL("/", baseUrl));

  // Delete all cookies with proper flags for both dev and production
  for (const cookie of allCookies) {
    // Build cookie deletion string with appropriate security flags
    const cookieParts = [
      `${cookie.name}=`,
      "Path=/",
      "Expires=Thu, 01 Jan 1970 00:00:00 GMT",
      "HttpOnly",
      "SameSite=Lax",
    ];

    // Add Secure flag for production HTTPS environments
    if (isProduction || isSecure) {
      cookieParts.push("Secure");
    }

    response.headers.append("Set-Cookie", cookieParts.join("; "));
  }

  // Also explicitly delete NextAuth specific cookies with __Secure- prefix for production
  if (isProduction || isSecure) {
    const secureAuthCookies = [
      "__Secure-authjs.session-token",
      "__Secure-authjs.callback-url",
      "__Secure-authjs.csrf-token",
      "__Secure-next-auth.session-token",
      "__Secure-next-auth.callback-url",
      "__Secure-next-auth.csrf-token",
    ];

    for (const cookieName of secureAuthCookies) {
      response.headers.append(
        "Set-Cookie",
        `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax; Secure`
      );
    }
  }

  return response;
}

export async function GET() {
  return POST();
}
