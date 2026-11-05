import Link from "next/link";
import { Wordmark } from "@/components/logo";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <Wordmark />
      <p className="font-display text-[clamp(56px,10vw,96px)] font-medium leading-none tracking-[-.03em] text-text">
        404
      </p>
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-title text-text">Cette page n&apos;existe pas</h1>
        <p className="max-w-sm text-body text-text-2">
          Elle a peut-être été déplacée, ou l&apos;adresse est incorrecte.
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex items-center gap-3 rounded-pill bg-text py-2 pr-2 pl-6 text-body font-medium text-bg transition hover:bg-white focus:outline-none focus:shadow-halo-lg"
      >
        Retour à l&apos;accueil
        <span className="flex h-8 w-8 items-center justify-center rounded-pill bg-mint text-bg">
          →
        </span>
      </Link>
    </main>
  );
}
