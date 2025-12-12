import { NextResponse } from "next/server";
import { auth } from "./auth";

/**
 * Check if the current user is authenticated
 * Returns the session or null
 */
export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  return session;
}

/**
 * Check if the current user is an admin
 * Returns the session if admin, or an object with status code for error cases
 */
export async function requireAdmin(): Promise<
  { session: any; status?: never } | { session: null; status: 401 | 403 }
> {
  const session = await requireAuth();
  if (!session) {
    return { session: null, status: 401 }; // Unauthenticated
  }
  if (session.user.role !== "ADMIN") {
    return { session: null, status: 403 }; // Authenticated but not admin
  }
  return { session };
}

/**
 * Create an unauthorized response
 */
export function unauthorizedResponse() {
  return NextResponse.json(
    { error: "Yetkisiz erişim. Lütfen giriş yapın." },
    { status: 401 }
  );
}

/**
 * Create a forbidden response (for non-admin users)
 */
export function forbiddenResponse() {
  return NextResponse.json(
    { error: "Bu işlem için admin yetkisi gereklidir." },
    { status: 403 }
  );
}
