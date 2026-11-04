"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createSession(formData: FormData) {
  const title = (formData.get("title") as string | null)?.trim();
  if (!title) return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase.from("session").insert({
    owner_id: user.id,
    title,
    share_token: crypto.randomUUID(),
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/app");
}
