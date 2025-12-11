import { prisma } from "./prisma";
import crypto from "crypto";

// Generate a secure random token
export function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

// Generate a 6-digit verification code
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Create email verification token
export async function createVerificationToken(email: string): Promise<string> {
  const token = generateToken();
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  // Delete any existing tokens for this email
  await prisma.verificationToken.deleteMany({
    where: { identifier: email },
  });

  // Create new token
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  return token;
}

// Verify email verification token
export async function verifyEmailToken(
  token: string
): Promise<{ success: boolean; email?: string; error?: string }> {
  const verificationToken = await prisma.verificationToken.findFirst({
    where: { token },
  });

  if (!verificationToken) {
    return { success: false, error: "Geçersiz doğrulama linki" };
  }

  if (verificationToken.expires < new Date()) {
    // Delete expired token (use deleteMany to avoid error if already deleted)
    await prisma.verificationToken.deleteMany({
      where: {
        identifier: verificationToken.identifier,
        token: verificationToken.token,
      },
    });
    return { success: false, error: "Doğrulama linki süresi dolmuş" };
  }

  // Mark email as verified and delete token in a transaction
  try {
    await prisma.$transaction([
      prisma.user.update({
        where: { email: verificationToken.identifier },
        data: { emailVerified: new Date() },
      }),
      prisma.verificationToken.deleteMany({
        where: {
          identifier: verificationToken.identifier,
          token: verificationToken.token,
        },
      }),
    ]);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error verifying email:", error);
    return { success: false, error: "Doğrulama işlemi başarısız oldu" };
  }

  return { success: true, email: verificationToken.identifier };
}

// Create password reset token
export async function createPasswordResetToken(
  email: string
): Promise<string | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return null;
  }

  const token = generateToken();
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  // Delete any existing password reset tokens for this email
  await prisma.verificationToken.deleteMany({
    where: {
      identifier: `password-reset:${email}`,
    },
  });

  // Create new token
  await prisma.verificationToken.create({
    data: {
      identifier: `password-reset:${email}`,
      token,
      expires,
    },
  });

  return token;
}

// Verify password reset token
export async function verifyPasswordResetToken(
  token: string
): Promise<{ success: boolean; email?: string; error?: string }> {
  const resetToken = await prisma.verificationToken.findFirst({
    where: { token },
  });

  if (!resetToken) {
    return { success: false, error: "Geçersiz şifre sıfırlama linki" };
  }

  if (!resetToken.identifier.startsWith("password-reset:")) {
    return { success: false, error: "Geçersiz token tipi" };
  }

  if (resetToken.expires < new Date()) {
    // Delete expired token
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: resetToken.identifier,
          token: resetToken.token,
        },
      },
    });
    return { success: false, error: "Şifre sıfırlama linki süresi dolmuş" };
  }

  const email = resetToken.identifier.replace("password-reset:", "");
  return { success: true, email };
}

// Delete password reset token after use
export async function deletePasswordResetToken(token: string): Promise<void> {
  const resetToken = await prisma.verificationToken.findFirst({
    where: { token },
  });

  if (resetToken) {
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: resetToken.identifier,
          token: resetToken.token,
        },
      },
    });
  }
}
