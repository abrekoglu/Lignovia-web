import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import { SessionProvider } from "@/components/providers/session-provider";
import "./globals.css";

// Body font - Inter
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

// Display/Heading font - Raleway
const raleway = Raleway({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-raleway",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LIGNOVIA - Ahşap Mutfak ve Dekorasyon Ürünleri",
  description: "Modern, minimalist ahşap mutfak ve dekorasyon ürünleri",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${raleway.variable}`}>
      <body className="font-sans antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
