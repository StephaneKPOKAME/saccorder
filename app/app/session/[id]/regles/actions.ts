"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type RuleRow = {
  id: string;
  text: string;
  theme: string;
  position: number;
};

export async function addRule(
  sessionId: string,
  text: string,
  theme: string,
): Promise<RuleRow> {
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("rule")
    .select("position")
    .eq("session_id", sessionId)
    .order("position", { ascending: false })
    .limit(1);

  const nextPosition = (existing?.[0]?.position ?? -1) + 1;

  const { data, error } = await supabase
    .from("rule")
    .insert({ session_id: sessionId, text, theme, position: nextPosition })
    .select("id, text, theme, position")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/app/session/${sessionId}/regles`);
  return data;
}

export async function updateRule(
  ruleId: string,
  sessionId: string,
  fields: { text?: string; theme?: string },
) {
  const supabase = await createClient();
  const { error } = await supabase.from("rule").update(fields).eq("id", ruleId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/app/session/${sessionId}/regles`);
}

export async function deleteRule(ruleId: string, sessionId: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("rule").delete().eq("id", ruleId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/app/session/${sessionId}/regles`);
}

export async function swapRulePositions(
  sessionId: string,
  a: { id: string; position: number },
  b: { id: string; position: number },
) {
  const supabase = await createClient();

  const { error: errorA } = await supabase
    .from("rule")
    .update({ position: b.position })
    .eq("id", a.id);
  if (errorA) {
    throw new Error(errorA.message);
  }

  const { error: errorB } = await supabase
    .from("rule")
    .update({ position: a.position })
    .eq("id", b.id);
  if (errorB) {
    throw new Error(errorB.message);
  }

  revalidatePath(`/app/session/${sessionId}/regles`);
}
