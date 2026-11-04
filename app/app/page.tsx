import { connection } from "next/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createSession } from "./actions";
import { CopyLinkButton } from "./copy-link-button";
import { SignOutButton } from "./sign-out-button";

export const instant = false;

export default async function AppPage() {
  await connection();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion");
  }

  const { data: sessions } = await supabase
    .from("session")
    .select("id, title, share_token, created_at")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-6 py-16">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-title text-text">Bonjour</h1>
          <p className="text-body text-text-2">{user.email}</p>
        </div>
        <SignOutButton />
      </header>

      <section className="flex flex-col gap-4">
        <p className="text-label uppercase text-text-3">Créer une session</p>
        <form action={createSession} className="flex flex-wrap gap-3">
          <input
            name="title"
            type="text"
            required
            placeholder="Nom de la session"
            className="min-w-0 flex-1 rounded-xs border border-border bg-surface-2 px-4 py-3 text-body text-text outline-none transition placeholder:text-text-3 focus:border-mint focus:shadow-halo"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-3 rounded-pill bg-text py-2 pr-2 pl-6 text-body font-medium text-bg transition hover:bg-white focus:outline-none focus:shadow-halo-lg"
          >
            Créer
            <span className="flex h-8 w-8 items-center justify-center rounded-pill bg-mint text-bg">
              →
            </span>
          </button>
        </form>
      </section>

      <section className="flex flex-col gap-4">
        <p className="text-label uppercase text-text-3">Mes sessions</p>
        {!sessions || sessions.length === 0 ? (
          <p className="text-body text-text-2">
            Aucune session pour le moment. Créez-en une pour commencer.
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {sessions.map((session) => (
              <li
                key={session.id}
                className="flex flex-col gap-3 rounded-sm border border-border bg-surface-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-body text-text">{session.title}</span>
                  <span className="text-sm text-text-3">/r/{session.share_token}</span>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <Link
                    href={`/app/session/${session.id}`}
                    className="rounded-pill border border-border-strong px-4 py-2 text-sm font-medium text-text transition hover:bg-surface-2"
                  >
                    Résultats
                  </Link>
                  <Link
                    href={`/app/session/${session.id}/regles`}
                    className="rounded-pill border border-border-strong px-4 py-2 text-sm font-medium text-text transition hover:bg-surface-2"
                  >
                    Règles
                  </Link>
                  <CopyLinkButton token={session.share_token} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
