import { redirect, notFound } from "next/navigation";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { computeQuestionCounts } from "@/lib/analysis";
import { TeamView } from "./team-view";

export const instant = false;

export default async function SessionResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/connexion");
  }

  const { data: session } = await supabase
    .from("session")
    .select("id, title, owner_id")
    .eq("id", id)
    .single();

  if (!session || session.owner_id !== user.id) {
    notFound();
  }

  const { data: cards } = await supabase
    .from("card")
    .select("id, first_name, last_name, role_title, created_at")
    .eq("session_id", id)
    .order("created_at", { ascending: true });

  const cardIds = (cards ?? []).map((card) => card.id);

  const { data: answerRows } =
    cardIds.length > 0
      ? await supabase
          .from("answer")
          .select("card_id, question_id, option_index")
          .in("card_id", cardIds)
      : { data: [] };

  const answersByCard = new Map<string, Record<string, number>>();
  for (const row of answerRows ?? []) {
    const current = answersByCard.get(row.card_id) ?? {};
    current[row.question_id] = row.option_index;
    answersByCard.set(row.card_id, current);
  }

  const cardsWithAnswers = (cards ?? []).map((card) => ({
    id: card.id,
    firstName: card.first_name,
    lastName: card.last_name,
    roleTitle: card.role_title,
    answers: answersByCard.get(card.id) ?? {},
  }));

  const questionCounts = computeQuestionCounts(cardsWithAnswers.map((card) => card.answers));

  return (
    <TeamView
      sessionId={id}
      sessionTitle={session.title}
      cards={cardsWithAnswers}
      questionCounts={questionCounts}
    />
  );
}
