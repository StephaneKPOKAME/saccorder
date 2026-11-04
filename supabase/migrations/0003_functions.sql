-- 0003_functions.sql
-- Fonctions `security definer` : seule voie d'accès du collaborateur
-- (sans compte, sans policy RLS directe sur session/card/answer).

-- Résout un lien de partage sans exposer la table `session`.
create or replace function public.public_session(p_token text)
returns table (id uuid, title text)
language sql
security definer
set search_path = public
stable
as $$
  select session.id, session.title
  from public.session
  where session.share_token = p_token;
$$;

revoke all on function public.public_session(text) from public;
grant execute on function public.public_session(text) to anon, authenticated;

-- Valide le token, crée la carte et ses réponses. Seule voie d'écriture
-- pour le collaborateur.
create or replace function public.submit_card_by_token(
  p_token text,
  p_first_name text,
  p_last_name text,
  p_role text,
  p_email text,
  p_answers jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_session_id uuid;
  v_card_id uuid;
  v_answer jsonb;
begin
  select session.id into v_session_id
  from public.session
  where session.share_token = p_token;

  if v_session_id is null then
    raise exception 'invalid_token';
  end if;

  insert into public.card (session_id, first_name, last_name, role_title, email)
  values (v_session_id, p_first_name, p_last_name, p_role, p_email)
  returning id into v_card_id;

  for v_answer in select * from jsonb_array_elements(p_answers)
  loop
    insert into public.answer (card_id, section_id, question_id, option_index)
    values (
      v_card_id,
      v_answer ->> 'section_id',
      v_answer ->> 'question_id',
      (v_answer ->> 'option_index')::int
    );
  end loop;

  return v_card_id;
end;
$$;

revoke all on function public.submit_card_by_token(text, text, text, text, text, jsonb) from public;
grant execute on function public.submit_card_by_token(text, text, text, text, text, jsonb) to anon, authenticated;
