"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/connexion");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="rounded-pill border border-border-strong bg-transparent px-6 py-3 text-body font-medium text-text transition focus:outline-none focus:shadow-halo-lg"
    >
      Se déconnecter
    </button>
  );
}
