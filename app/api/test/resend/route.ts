import { NextResponse } from 'next/server';
import { sendEmail, emailTemplates, testEmailConnection } from '@/lib/email';

// GET: Test Resend connection
export async function GET() {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: 'RESEND_API_KEY not configured',
          hint: 'Add RESEND_API_KEY to your .env file',
        },
        { status: 500 }
      );
    }

    const connectionResult = await testEmailConnection();

    if (!connectionResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: connectionResult.error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Resend API key configured!',
      templates: Object.keys(emailTemplates),
      hint: 'Use POST to send a test email',
    });
  } catch (error) {
    console.error('Resend test error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// POST: Send test email
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, template } = body;

    if (!to) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email address (to) is required',
        },
        { status: 400 }
      );
    }

    // Use welcome template for test
    const emailTemplate = template === 'order' 
      ? emailTemplates.orderConfirmation({
          orderNumber: 'TEST-001',
          customerName: 'Test Kullanıcı',
          total: '₺999,00',
        })
      : emailTemplates.welcome({
          customerName: 'Test Kullanıcı',
        });

    const result = await sendEmail({
      to,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
    });

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully!',
      emailId: result.id,
      sentTo: to,
    });
  } catch (error) {
    console.error('Resend send test error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

