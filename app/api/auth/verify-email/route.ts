import { NextResponse } from "next/server";
import { verifyEmailToken } from "@/lib/tokens";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: "Doğrulama token'ı gerekli" },
        { status: 400 }
      );
    }

    const result = await verifyEmailToken(token);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Email adresi başarıyla doğrulandı",
      email: result.email,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Verify email error:", error);
    return NextResponse.json(
      { error: "Bir hata oluştu. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
