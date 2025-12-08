import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
