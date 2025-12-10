import { NextResponse } from "next/server";

// GET: Test iyzico credentials configuration
export async function GET() {
  try {
    const apiKey = process.env.IYZICO_API_KEY;
    const secretKey = process.env.IYZICO_SECRET_KEY;
    const baseUrl =
      process.env.IYZICO_BASE_URL || "https://sandbox-api.iyzipay.com";

    if (!apiKey || !secretKey) {
      return NextResponse.json(
        {
          success: false,
          error: "iyzico credentials not configured",
          details: {
            api_key: !!apiKey,
            secret_key: !!secretKey,
            base_url: baseUrl,
          },
          hint: "Add IYZICO_API_KEY and IYZICO_SECRET_KEY to your .env file",
        },
        { status: 500 }
      );
    }

    // Validate credentials format
    const isSandbox =
      apiKey.startsWith("sandbox-") || baseUrl.includes("sandbox");
    const isValidFormat = apiKey.length > 10 && secretKey.length > 10;

    if (!isValidFormat) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid credentials format",
          hint: "API keys should be at least 10 characters long",
        },
        { status: 500 }
      );
    }

    // Test cards for sandbox
    const testCards = {
      success: {
        cardNumber: "5528790000000008",
        expireMonth: "12",
        expireYear: "2030",
        cvc: "123",
        cardHolderName: "John Doe",
      },
      failure: {
        cardNumber: "5406670000000009",
        expireMonth: "12",
        expireYear: "2030",
        cvc: "123",
        cardHolderName: "John Doe",
      },
      threeDSecure: {
        cardNumber: "4603450000000000",
        expireMonth: "12",
        expireYear: "2030",
        cvc: "123",
        cardHolderName: "John Doe",
      },
    };

    return NextResponse.json({
      success: true,
      message: "iyzico credentials configured correctly!",
      environment: isSandbox ? "SANDBOX" : "PRODUCTION",
      credentials: {
        api_key_configured: true,
        secret_key_configured: true,
        base_url: baseUrl,
      },
      testCards: {
        success: `${testCards.success.cardNumber.substring(0, 4)}****${testCards.success.cardNumber.substring(12)}`,
        failure: `${testCards.failure.cardNumber.substring(0, 4)}****${testCards.failure.cardNumber.substring(12)}`,
        threeDSecure: `${testCards.threeDSecure.cardNumber.substring(0, 4)}****${testCards.threeDSecure.cardNumber.substring(12)}`,
      },
      note: "Full test card numbers available in lib/iyzico.ts. Actual API connection will be tested during payment flow.",
    });
  } catch (error) {
    console.error("iyzico test error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
