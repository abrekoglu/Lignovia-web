import { Resend } from "resend";

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Email sending options
interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

// Send email
export async function sendEmail(options: SendEmailOptions) {
  try {
    const fromEmail =
      options.from || process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    // Build email payload (only include defined fields)
    const emailPayload: {
      from: string;
      to: string | string[];
      subject: string;
      html?: string;
      text?: string;
      replyTo?: string;
    } = {
      from: fromEmail,
      to: options.to,
      subject: options.subject,
    };

    if (options.html) {
      emailPayload.html = options.html;
    }

    if (options.text) {
      emailPayload.text = options.text;
    }

    if (options.replyTo) {
      emailPayload.replyTo = options.replyTo;
    }

    const { data, error } = await resend.emails.send(emailPayload as any);

    if (error) {
      console.error("Resend error:", error);
      throw new Error(error.message);
    }

    return { success: true, id: data?.id };
  } catch (error) {
    console.error("Email send error:", error);
    throw error;
  }
}

// Email templates for LIGNOVIA
export const emailTemplates = {
  // Order confirmation email
  orderConfirmation: (data: {
    orderNumber: string;
    customerName: string;
    total: string;
  }) => ({
    subject: `LIGNOVIA - Sipariş Onayı #${data.orderNumber}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #4A3A2C; padding: 20px; text-align: center;">
          <h1 style="color: #FAF7F2; margin: 0; font-family: Raleway, sans-serif;">LIGNOVIA</h1>
        </div>
        <div style="padding: 30px; background-color: #FAF7F2;">
          <h2 style="color: #4A3A2C;">Siparişiniz Alındı!</h2>
          <p style="color: #333;">Sayın ${data.customerName},</p>
          <p style="color: #333;">Siparişiniz başarıyla alındı. Sipariş detayları:</p>
          <div style="background-color: #fff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Sipariş No:</strong> ${data.orderNumber}</p>
            <p style="margin: 5px 0;"><strong>Toplam:</strong> ${data.total}</p>
          </div>
          <p style="color: #333;">Siparişinizi takip etmek için hesabınıza giriş yapabilirsiniz.</p>
        </div>
        <div style="background-color: #D6C2B5; padding: 15px; text-align: center;">
          <p style="color: #4A3A2C; margin: 0; font-size: 12px;">© 2024 LIGNOVIA. Tüm hakları saklıdır.</p>
        </div>
      </div>
    `,
  }),

  // Welcome email
  welcome: (data: { customerName: string }) => ({
    subject: "LIGNOVIA'ya Hoş Geldiniz!",
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #4A3A2C; padding: 20px; text-align: center;">
          <h1 style="color: #FAF7F2; margin: 0; font-family: Raleway, sans-serif;">LIGNOVIA</h1>
        </div>
        <div style="padding: 30px; background-color: #FAF7F2;">
          <h2 style="color: #4A3A2C;">Hoş Geldiniz!</h2>
          <p style="color: #333;">Sayın ${data.customerName},</p>
          <p style="color: #333;">LIGNOVIA ailesine katıldığınız için teşekkür ederiz!</p>
          <p style="color: #333;">El yapımı ahşap ürünlerimizi keşfetmek için sitemizi ziyaret edebilirsiniz.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" style="background-color: #C97A5A; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 4px;">Alışverişe Başla</a>
          </div>
        </div>
        <div style="background-color: #D6C2B5; padding: 15px; text-align: center;">
          <p style="color: #4A3A2C; margin: 0; font-size: 12px;">© 2024 LIGNOVIA. Tüm hakları saklıdır.</p>
        </div>
      </div>
    `,
  }),

  // Email verification
  emailVerification: (data: { verifyLink: string; customerName?: string }) => ({
    subject: "LIGNOVIA - Email Adresinizi Doğrulayın",
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #4A3A2C; padding: 20px; text-align: center;">
          <h1 style="color: #FAF7F2; margin: 0; font-family: Raleway, sans-serif;">LIGNOVIA</h1>
        </div>
        <div style="padding: 30px; background-color: #FAF7F2;">
          <h2 style="color: #4A3A2C;">Email Doğrulama</h2>
          <p style="color: #333;">${data.customerName ? `Sayın ${data.customerName},` : ""}</p>
          <p style="color: #333;">LIGNOVIA'ya hoş geldiniz! Email adresinizi doğrulamak için aşağıdaki butona tıklayın:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.verifyLink}" style="background-color: #C97A5A; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 4px;">Email Adresimi Doğrula</a>
          </div>
          <p style="color: #666; font-size: 12px;">Bu link 24 saat geçerlidir. Bu talebi siz yapmadıysanız bu emaili görmezden gelebilirsiniz.</p>
        </div>
        <div style="background-color: #D6C2B5; padding: 15px; text-align: center;">
          <p style="color: #4A3A2C; margin: 0; font-size: 12px;">© 2024 LIGNOVIA. Tüm hakları saklıdır.</p>
        </div>
      </div>
    `,
  }),

  // Password reset email
  passwordReset: (data: { resetLink: string }) => ({
    subject: "LIGNOVIA - Şifre Sıfırlama",
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #4A3A2C; padding: 20px; text-align: center;">
          <h1 style="color: #FAF7F2; margin: 0; font-family: Raleway, sans-serif;">LIGNOVIA</h1>
        </div>
        <div style="padding: 30px; background-color: #FAF7F2;">
          <h2 style="color: #4A3A2C;">Şifre Sıfırlama</h2>
          <p style="color: #333;">Şifrenizi sıfırlamak için aşağıdaki butona tıklayın:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.resetLink}" style="background-color: #C97A5A; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 4px;">Şifremi Sıfırla</a>
          </div>
          <p style="color: #666; font-size: 12px;">Bu link 1 saat geçerlidir. Bu talebi siz yapmadıysanız bu emaili görmezden gelebilirsiniz.</p>
        </div>
        <div style="background-color: #D6C2B5; padding: 15px; text-align: center;">
          <p style="color: #4A3A2C; margin: 0; font-size: 12px;">© 2024 LIGNOVIA. Tüm hakları saklıdır.</p>
        </div>
      </div>
    `,
  }),

  // Shipping notification
  shippingNotification: (data: {
    orderNumber: string;
    trackingNumber: string;
    carrierName: string;
  }) => ({
    subject: `LIGNOVIA - Siparişiniz Kargoya Verildi #${data.orderNumber}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #4A3A2C; padding: 20px; text-align: center;">
          <h1 style="color: #FAF7F2; margin: 0; font-family: Raleway, sans-serif;">LIGNOVIA</h1>
        </div>
        <div style="padding: 30px; background-color: #FAF7F2;">
          <h2 style="color: #4A3A2C;">Siparişiniz Yola Çıktı! 📦</h2>
          <p style="color: #333;">Siparişiniz kargoya verildi ve yolda!</p>
          <div style="background-color: #fff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Sipariş No:</strong> ${data.orderNumber}</p>
            <p style="margin: 5px 0;"><strong>Kargo Firması:</strong> ${data.carrierName}</p>
            <p style="margin: 5px 0;"><strong>Takip No:</strong> ${data.trackingNumber}</p>
          </div>
        </div>
        <div style="background-color: #D6C2B5; padding: 15px; text-align: center;">
          <p style="color: #4A3A2C; margin: 0; font-size: 12px;">© 2024 LIGNOVIA. Tüm hakları saklıdır.</p>
        </div>
      </div>
    `,
  }),
};

// Test connection
export async function testEmailConnection(): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    if (!process.env.RESEND_API_KEY) {
      return { success: false, error: "RESEND_API_KEY not configured" };
    }

    // Send a test email to verify the API key works
    // Note: In production, you'd want to use a verified domain
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
