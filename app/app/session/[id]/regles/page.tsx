import { redirect, notFound } from "next/navigation";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { computeQuestionCounts } from "@/lib/analysis";
import { RulesView } from "./rules-view";

export const instant = false;

export default async function SessionRulesPage({
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
    .select("id")
    .eq("session_id", id);

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

  const questionCounts = computeQuestionCounts(Array.from(answersByCard.values()));
  const contrastChips = questionCounts
    .filter((question) => question.isContrast)
    .map((question) => ({
      questionId: question.questionId,
      questionLabel: question.questionLabel,
      sectionTitle: question.sectionTitle,
    }));

  const { data: rules } = await supabase
    .from("rule")
    .select("id, text, theme, position")
    .eq("session_id", id)
    .order("position", { ascending: true });

  return (
    <RulesView
      sessionId={id}
      sessionTitle={session.title}
      contrastChips={contrastChips}
      initialRules={rules ?? []}
    />
  );
}
