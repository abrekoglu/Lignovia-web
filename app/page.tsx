import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center">
        <Image
          src="/images/logo.svg"
          alt="LIGNOVIA"
          width={350}
          height={61}
          priority
          className="mx-auto"
        />
        <p className="mt-6 text-xl text-text-secondary">
          Ahşap Mutfak ve Dekorasyon Ürünleri
        </p>
        <p className="mt-2 text-text-secondary">🚧 Site yapım aşamasında</p>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/design-system">
            <Button variant="outline">🎨 Design System</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
