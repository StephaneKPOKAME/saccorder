import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <Image
        src="/saccorder-logo-horizontal.png"
        alt="S'accorder"
        width={260}
        height={87}
        priority
      />
      <h1 className="text-title text-deep-green">
        Mettre au clair les façons de travailler d&apos;une équipe
      </h1>
    </main>
  );
}
