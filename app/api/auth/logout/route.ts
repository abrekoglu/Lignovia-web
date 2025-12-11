import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Helper to check if a cookie is auth-related (NextAuth/Auth.js)
function isAuthCookie(cookieName: string): boolean {
  const authPatterns = [
    "authjs",
    "next-auth",
    "__Secure-authjs",
    "__Secure-next-auth",
    "__Host-authjs",
    "__Host-next-auth",
    "session-token",
    "callback-url",
    "csrf-token",
  ];
  const lowerName = cookieName.toLowerCase();
  return authPatterns.some((pattern) =>
    lowerName.includes(pattern.toLowerCase())
  );
}

export async function POST() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const isProduction = process.env.NODE_ENV === "production";
  const isSecure = baseUrl.startsWith("https://");

  const response = NextResponse.redirect(new URL("/", baseUrl));

  // Delete all auth-related cookies dynamically
  // This approach handles any cookie name configuration
  for (const cookie of allCookies) {
    // Only delete auth-related cookies to avoid affecting other app cookies
    if (!isAuthCookie(cookie.name)) {
      continue;
    }

    // Determine if this is a __Secure- or __Host- prefixed cookie
    const isSecurePrefixed =
      cookie.name.startsWith("__Secure-") || cookie.name.startsWith("__Host-");

    // Build cookie deletion string with appropriate security flags
    const cookieParts = [
      `${cookie.name}=`,
      "Path=/",
      "Expires=Thu, 01 Jan 1970 00:00:00 GMT",
      "HttpOnly",
      "SameSite=Lax",
    ];

    // Add Secure flag for:
    // 1. Production/HTTPS environments
    // 2. Cookies with __Secure- or __Host- prefix (required by spec)
    if (isProduction || isSecure || isSecurePrefixed) {
      cookieParts.push("Secure");
    }

    response.headers.append("Set-Cookie", cookieParts.join("; "));
  }

  return response;
}

export async function GET() {
  return POST();
}
