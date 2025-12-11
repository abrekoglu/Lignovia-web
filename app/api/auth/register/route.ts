import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createVerificationToken } from "@/lib/tokens";
import { sendEmail, emailTemplates } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email ve şifre gerekli" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Şifre en az 8 karakter olmalı" },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Geçerli bir email adresi girin" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Bu email adresi zaten kayıtlı" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        isActive: true,
        role: "USER",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    // Send verification email (non-blocking)
    try {
      const token = await createVerificationToken(email);
      const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
      const verifyLink = `${baseUrl}/auth/verify-email?token=${token}`;

      const template = emailTemplates.emailVerification({
        verifyLink,
        customerName: name || undefined,
      });

      await sendEmail({
        to: email,
        subject: template.subject,
        html: template.html,
      });
    } catch (emailError) {
      // Log email error but don't fail registration
      // eslint-disable-next-line no-console
      console.error("Failed to send verification email:", emailError);
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Hesap başarıyla oluşturuldu. Email adresinizi doğrulamak için gelen kutunuzu kontrol edin.",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Bir hata oluştu. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
