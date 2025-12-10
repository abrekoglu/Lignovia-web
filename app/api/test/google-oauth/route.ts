import { NextResponse } from "next/server";

// GET: Test Google OAuth credentials configuration
export async function GET() {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const nextAuthUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const nextAuthSecret = process.env.NEXTAUTH_SECRET;

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        {
          success: false,
          error: "Google OAuth credentials not configured",
          details: {
            client_id: !!clientId,
            client_secret: !!clientSecret,
            nextauth_url: nextAuthUrl,
            nextauth_secret: !!nextAuthSecret,
          },
          hint: "Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to your .env file",
          instructions: [
            "1. Go to https://console.cloud.google.com",
            "2. Create a new project or select existing",
            "3. Enable Google+ API",
            "4. Go to Credentials > Create Credentials > OAuth client ID",
            "5. Application type: Web application",
            "6. Authorized redirect URIs:",
            `   - ${nextAuthUrl}/api/auth/callback/google (development)`,
            "   - https://your-domain.vercel.app/api/auth/callback/google (production)",
            "7. Copy Client ID and Client Secret",
          ],
        },
        { status: 500 }
      );
    }

    // Validate credentials format
    const isValidClientId = clientId.includes(".apps.googleusercontent.com");
    const isValidClientSecret = clientSecret.length > 20;

    if (!isValidClientId) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid Google Client ID format",
          hint: "Client ID should end with .apps.googleusercontent.com",
        },
        { status: 500 }
      );
    }

    if (!isValidClientSecret) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid Google Client Secret format",
          hint: "Client Secret should be at least 20 characters long",
        },
        { status: 500 }
      );
    }

    if (!nextAuthSecret) {
      return NextResponse.json(
        {
          success: false,
          error: "NEXTAUTH_SECRET not configured",
          hint: "Add NEXTAUTH_SECRET to your .env file (min 32 characters)",
          note: "You can generate one with: openssl rand -base64 32",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Google OAuth credentials configured correctly!",
      credentials: {
        client_id_configured: true,
        client_secret_configured: true,
        nextauth_url: nextAuthUrl,
        nextauth_secret_configured: true,
      },
      redirectUris: {
        development: `${nextAuthUrl}/api/auth/callback/google`,
        production:
          "https://your-domain.vercel.app/api/auth/callback/google (update after deployment)",
      },
      note: "NextAuth.js integration will be done in Phase 2 (Authentication System)",
    });
  } catch (error) {
    console.error("Google OAuth test error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
