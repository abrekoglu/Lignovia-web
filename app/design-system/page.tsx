"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen p-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="mb-4 flex justify-center">
          <Logo width={250} height={44} />
        </div>
        <h1 className="font-display text-4xl font-light text-primary">
          Design System
        </h1>
        <p className="mt-2 text-text-secondary">
          UI Component Library & Theme Preview
        </p>
        <div className="mt-4">
          <Button
            variant="outline"
            onClick={() => {
              if (typeof document !== "undefined") {
                document.documentElement.classList.toggle("dark");
              }
            }}
          >
            🌓 Toggle Dark Mode
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-12">
        {/* ================================================
            LOGO
            ================================================ */}
        <section id="logo">
          <h2 className="mb-6 border-b border-border pb-2 text-3xl font-bold">
            🌳 Logo
          </h2>
          <div className="space-y-8">
            {/* Light Background */}
            <div>
              <h3 className="mb-4 text-xl font-semibold">Light Background</h3>
              <div className="flex items-center justify-center rounded-lg border border-border bg-[#FAF7F2] p-8">
                <Image
                  src="/images/logo.svg"
                  alt="LIGNOVIA Logo - Light"
                  width={300}
                  height={53}
                  priority
                />
              </div>
            </div>

            {/* Dark Background */}
            <div>
              <h3 className="mb-4 text-xl font-semibold">Dark Background</h3>
              <div className="flex items-center justify-center rounded-lg border border-border bg-[#1E1A17] p-8">
                <Image
                  src="/images/logo-dark.svg"
                  alt="LIGNOVIA Logo - Dark"
                  width={300}
                  height={53}
                  priority
                />
              </div>
            </div>

            {/* Auto Theme Logo (using Logo component) */}
            <div>
              <h3 className="mb-4 text-xl font-semibold">Auto Theme Logo (Component)</h3>
              <p className="mb-4 text-sm text-text-secondary">
                Bu component dark mode açıldığında otomatik olarak logo versiyonunu değiştirir.
              </p>
              <div className="flex items-center justify-center rounded-lg border border-border bg-background p-8">
                <Logo width={300} height={53} variant="auto" />
              </div>
            </div>

            {/* Logo Sizes */}
            <div>
              <h3 className="mb-4 text-xl font-semibold">Logo Boyutları</h3>
              <div className="flex flex-wrap items-end gap-8 rounded-lg border border-border bg-background p-8">
                <div className="text-center">
                  <Logo width={400} height={70} />
                  <p className="mt-2 text-sm text-text-secondary">400px (Large)</p>
                </div>
                <div className="text-center">
                  <Logo width={250} height={44} />
                  <p className="mt-2 text-sm text-text-secondary">250px (Medium)</p>
                </div>
                <div className="text-center">
                  <Logo width={150} height={26} />
                  <p className="mt-2 text-sm text-text-secondary">150px (Small)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================
            COLORS
            ================================================ */}
        <section id="colors">
          <h2 className="mb-6 border-b border-border pb-2 text-3xl font-bold">
            🎨 Renkler
          </h2>

          {/* Brand Colors */}
          <div className="mb-8">
            <h3 className="mb-4 text-xl font-semibold">Marka Renkleri</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              <ColorCard name="Primary" hex="#4A3A2C" />
              <ColorCard name="Secondary" hex="#D6C2B5" />
              <ColorCard name="Accent" hex="#C97A5A" />
              <ColorCard name="Background" hex="#FAF7F2" />
              <ColorCard name="Foreground" hex="#3E342B" />
              <ColorCard name="Surface" hex="#FFFFFF" />
            </div>
          </div>

          {/* Semantic Colors */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">UI Renkleri</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <ColorCard name="Destructive" hex="#DC2626" />
              <ColorCard name="Muted" hex="#F1EFEC" />
              <ColorCard name="Border" hex="#E4DED7" />
              <ColorCard name="Ring" hex="#C97A5A" />
            </div>
          </div>
        </section>

        {/* ================================================
            TYPOGRAPHY
            ================================================ */}
        <section id="typography">
          <h2 className="mb-6 border-b border-border pb-2 text-3xl font-bold">
            📝 Tipografi
          </h2>
          <div className="space-y-8">
            {/* Font Families */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-2xl font-thin">
                    Raleway
                  </CardTitle>
                  <CardDescription>Display / Heading Font</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-display text-3xl font-thin">Thin (100)</p>
                  <p className="font-display text-3xl font-light">Light (300)</p>
                  <p className="font-display text-3xl font-normal">Regular (400)</p>
                  <p className="font-display text-3xl font-medium">Medium (500)</p>
                  <p className="font-display text-3xl font-semibold">Semibold (600)</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Inter</CardTitle>
                  <CardDescription>Body / UI Font</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-lg font-light">Light (300)</p>
                  <p className="text-lg font-normal">Regular (400)</p>
                  <p className="text-lg font-medium">Medium (500)</p>
                  <p className="text-lg font-semibold">Semibold (600)</p>
                  <p className="text-lg font-bold">Bold (700)</p>
                </CardContent>
              </Card>
            </div>

            {/* Heading Hierarchy */}
            <div>
              <h3 className="mb-4 text-xl font-semibold">Başlık Hiyerarşisi</h3>
              <div className="space-y-4 rounded-lg border border-border p-6">
                <div>
                  <p className="font-display text-5xl font-thin">Display - font-display text-5xl font-thin</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">Heading 1 - text-4xl font-bold</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">Heading 2 - text-3xl font-bold</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold">Heading 3 - text-2xl font-semibold</p>
                </div>
                <div>
                  <p className="text-xl font-semibold">Heading 4 - text-xl font-semibold</p>
                </div>
                <div>
                  <p className="text-lg font-medium">Heading 5 - text-lg font-medium</p>
                </div>
                <div>
                  <p className="text-base">Body - text-base (16px)</p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Small - text-sm text-text-secondary</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Extra Small - text-xs</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================
            BUTTON
            ================================================ */}
        <section id="button">
          <h2 className="mb-6 border-b border-border pb-2 text-3xl font-bold">
            🔘 Button
          </h2>

          {/* Variants */}
          <div className="mb-8">
            <h3 className="mb-4 text-xl font-semibold">Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="accent">Accent</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-8">
            <h3 className="mb-4 text-xl font-semibold">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">🛒</Button>
            </div>
          </div>

          {/* States */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">States</h3>
            <div className="flex flex-wrap gap-4">
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </section>

        {/* ================================================
            INPUT
            ================================================ */}
        <section id="input">
          <h2 className="mb-6 border-b border-border pb-2 text-3xl font-bold">
            📝 Input
          </h2>
          <div className="max-w-md space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Text Input</label>
              <Input type="text" placeholder="E-posta adresinizi girin" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Password Input</label>
              <Input type="password" placeholder="Şifrenizi girin" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Disabled Input</label>
              <Input type="text" placeholder="Disabled" disabled />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Search with Button</label>
              <div className="flex gap-2">
                <Input type="text" placeholder="Ürün ara..." className="flex-1" />
                <Button>Ara</Button>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================
            CARD
            ================================================ */}
        <section id="card">
          <h2 className="mb-6 border-b border-border pb-2 text-3xl font-bold">
            🃏 Card
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Product Card */}
            <Card>
              <div className="h-48 rounded-t-lg bg-secondary"></div>
              <CardHeader>
                <CardTitle>Ahşap Kesme Tahtası</CardTitle>
                <CardDescription>El yapımı ceviz ağacı</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-accent">₺299,00</p>
                <Button className="mt-4 w-full" variant="accent">
                  Sepete Ekle
                </Button>
              </CardContent>
            </Card>

            {/* Simple Card */}
            <Card>
              <CardHeader>
                <CardTitle>Basit Kart</CardTitle>
                <CardDescription>Açıklama metni</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Kart içeriği burada yer alır.</p>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="border-accent">
              <CardHeader>
                <CardTitle className="text-accent">Bilgi Kartı</CardTitle>
                <CardDescription>Accent border ile</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Önemli bilgiler için kullanılabilir.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ================================================
            PLACEHOLDER: DAHA FAZLA COMPONENT
            ================================================ */}
        <section id="coming-soon" className="rounded-lg border-2 border-dashed border-border p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-text-secondary">
            🚧 Yakında Eklenecek Component&apos;ler
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Select",
              "Checkbox",
              "Radio",
              "Switch",
              "Textarea",
              "Modal/Dialog",
              "Dropdown Menu",
              "Toast",
              "Tabs",
              "Accordion",
              "Badge",
              "Avatar",
              "Skeleton",
              "Tooltip",
              "Breadcrumb",
              "Pagination",
            ].map((name) => (
              <span
                key={name}
                className="rounded-full bg-muted px-3 py-1 text-sm text-text-secondary"
              >
                {name}
              </span>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border pt-8 text-center text-sm text-text-secondary">
          <p>LIGNOVIA Design System v1.0</p>
          <p className="mt-1">
            Son güncelleme: {new Date().toLocaleDateString("tr-TR")}
          </p>
        </footer>
      </div>
    </main>
  );
}

// Helper Component for Color Cards
function ColorCard({
  name,
  hex,
  className,
}: {
  name: string;
  hex: string;
  className?: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div 
        className={`h-16 ${className || ""}`}
        style={{ backgroundColor: hex }}
      ></div>
      <div className="bg-card p-2 text-center">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-text-secondary">{hex}</p>
      </div>
    </div>
  );
}

