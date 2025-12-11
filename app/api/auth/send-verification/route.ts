import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createVerificationToken } from "@/lib/tokens";
import { sendEmail, emailTemplates } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email gerekli" }, { status: 400 });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Always return the same response to prevent email enumeration
    // Only send email if user exists and is not verified
    if (!user || user.emailVerified) {
      return NextResponse.json({
        success: true,
        message: "Doğrulama emaili gönderildi",
      });
    }

    // Create verification token
    const token = await createVerificationToken(email);

    // Build verification URL
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const verifyLink = `${baseUrl}/auth/verify-email?token=${token}`;

    // Send verification email
    const template = emailTemplates.emailVerification({
      verifyLink,
      customerName: user.name || undefined,
    });

    await sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
    });

    return NextResponse.json({
      success: true,
      message: "Doğrulama emaili gönderildi",
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Send verification error:", error);
    return NextResponse.json(
      { error: "Bir hata oluştu. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
