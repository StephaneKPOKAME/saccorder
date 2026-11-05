"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ConnexionPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError("L'adresse email est obligatoire.");
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Adresse email invalide.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (signInError) {
      setError(signInError.message);
      setStatus("error");
      return;
    }

    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-logo text-xl text-text">s&apos;accorder</p>
        <h1 className="font-display text-title text-text">Vérifiez votre boîte mail</h1>
        <p className="max-w-sm text-body text-text-2">
          Nous avons envoyé un lien de connexion à {email}. Cliquez dessus pour accéder à
          votre espace.
        </p>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6">
      <p className="font-logo text-xl text-text">s&apos;accorder</p>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex w-full max-w-sm flex-col gap-4"
      >
        <h1 className="font-display text-title text-text text-center">Connexion</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-label uppercase text-text-3">
            Adresse email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="vous@entreprise.com"
            aria-invalid={status === "error"}
            className={
              status === "error"
                ? "rounded-xs border border-abricot bg-surface-2 px-4 py-3 text-body text-text outline-none transition placeholder:text-text-3 focus:shadow-halo"
                : "rounded-xs border border-border bg-surface-2 px-4 py-3 text-body text-text outline-none transition placeholder:text-text-3 focus:border-mint focus:shadow-halo"
            }
          />
        </div>
        {error && <p className="text-sm text-abricot">{error}</p>}
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center rounded-pill bg-text px-6 py-3 text-body font-medium text-bg transition hover:bg-white focus:outline-none focus:shadow-halo-lg disabled:opacity-60"
        >
          {status === "loading" ? "Envoi en cours…" : "Recevoir le lien de connexion"}
        </button>
      </form>
    </main>
  );
}
