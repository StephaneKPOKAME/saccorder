"use server";

import { createClient } from "@/lib/supabase/server";

export type AnswerPayload = {
  section_id: string;
  question_id: string;
  option_index: number;
};

export type IdentityPayload = {
  firstName: string;
  lastName: string;
  role: string;
  email: string;
};

export async function submitCard(
  token: string,
  identity: IdentityPayload,
  answers: AnswerPayload[],
) {
  const supabase = await createClient();

  const { error } = await supabase.rpc("submit_card_by_token", {
    p_token: token,
    p_first_name: identity.firstName,
    p_last_name: identity.lastName,
    p_role: identity.role,
    p_email: identity.email,
    p_answers: answers,
  });

  if (error) {
    throw new Error(error.message);
  }
}
