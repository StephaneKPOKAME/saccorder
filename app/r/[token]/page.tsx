import { createClient } from "@/lib/supabase/server";
import { CollaboratorForm } from "./collaborator-form";

export const instant = false;

export default async function CollaboratorPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const supabase = await createClient();

  const { data } = await supabase.rpc("public_session", { p_token: token });
  const session = data?.[0];

  if (!session) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
        <p className="font-logo text-xl text-text">s&apos;accorder</p>
        <h1 className="font-display text-title text-text">Ce lien n&apos;est pas valide</h1>
        <p className="max-w-sm text-body text-text-2">
          Demandez-en un nouveau à votre manager.
        </p>
      </main>
    );
  }

  return <CollaboratorForm token={token} sessionTitle={session.title} />;
}
