-- 0002_policies.sql
-- Policies manager. Le collaborateur n'a aucune policy directe sur
-- card/answer : son unique voie d'écriture est la fonction
-- `submit_card_by_token` (voir 0003_functions.sql).

-- profile : chacun lit/modifie uniquement sa propre ligne.
create policy "profile_select_own"
  on public.profile for select
  using (id = auth.uid());

create policy "profile_update_own"
  on public.profile for update
  using (id = auth.uid())
  with check (id = auth.uid());

-- session : le manager accède à ses sessions en lecture/écriture.
create policy "session_select_own"
  on public.session for select
  using (owner_id = auth.uid());

create policy "session_insert_own"
  on public.session for insert
  with check (owner_id = auth.uid());

create policy "session_update_own"
  on public.session for update
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy "session_delete_own"
  on public.session for delete
  using (owner_id = auth.uid());

-- card : lecture réservée au manager propriétaire de la session.
create policy "card_select_owner"
  on public.card for select
  using (
    exists (
      select 1 from public.session
      where session.id = card.session_id
        and session.owner_id = auth.uid()
    )
  );

-- answer : même principe, via card -> session.
create policy "answer_select_owner"
  on public.answer for select
  using (
    exists (
      select 1 from public.card
      join public.session on session.id = card.session_id
      where card.id = answer.card_id
        and session.owner_id = auth.uid()
    )
  );

-- rule : lecture/écriture par le manager propriétaire de la session.
create policy "rule_select_owner"
  on public.rule for select
  using (
    exists (
      select 1 from public.session
      where session.id = rule.session_id
        and session.owner_id = auth.uid()
    )
  );

create policy "rule_insert_owner"
  on public.rule for insert
  with check (
    exists (
      select 1 from public.session
      where session.id = rule.session_id
        and session.owner_id = auth.uid()
    )
  );

create policy "rule_update_owner"
  on public.rule for update
  using (
    exists (
      select 1 from public.session
      where session.id = rule.session_id
        and session.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.session
      where session.id = rule.session_id
        and session.owner_id = auth.uid()
    )
  );

create policy "rule_delete_owner"
  on public.rule for delete
  using (
    exists (
      select 1 from public.session
      where session.id = rule.session_id
        and session.owner_id = auth.uid()
    )
  );
