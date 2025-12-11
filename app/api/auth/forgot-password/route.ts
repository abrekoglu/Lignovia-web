import { NextResponse } from "next/server";
import { createPasswordResetToken } from "@/lib/tokens";
import { sendEmail, emailTemplates } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email gerekli" }, { status: 400 });
    }

    // Create password reset token (returns null if user doesn't exist)
    const token = await createPasswordResetToken(email);

    // Always return success to prevent email enumeration
    if (token) {
      // Build reset URL
      const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
      const resetLink = `${baseUrl}/auth/reset-password?token=${token}`;

      // Send password reset email
      const template = emailTemplates.passwordReset({ resetLink });

      await sendEmail({
        to: email,
        subject: template.subject,
        html: template.html,
      });
    }

    return NextResponse.json({
      success: true,
      message:
        "Eğer bu email adresi kayıtlıysa, şifre sıfırlama linki gönderildi",
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Bir hata oluştu. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
