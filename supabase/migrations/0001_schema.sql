-- 0001_schema.sql
-- Tables de base (profile, session, card, answer, rule) + RLS activée.
-- Aucune policy n'est créée ici : tant que 0002 n'a pas tourné, tout accès
-- est refusé par défaut (deny-all).

create extension if not exists "pgcrypto";

create table public.profile (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  display_name text,
  created_at timestamptz not null default now()
);

create table public.session (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profile (id) on delete cascade,
  title text not null,
  share_token text not null unique,
  created_at timestamptz not null default now()
);

create table public.card (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.session (id) on delete cascade,
  first_name text not null,
  last_name text not null,
  role_title text not null,
  email text not null,
  created_at timestamptz not null default now()
);

create table public.answer (
  id uuid primary key default gen_random_uuid(),
  card_id uuid not null references public.card (id) on delete cascade,
  section_id text not null,
  question_id text not null,
  option_index int not null check (option_index between 0 and 2)
);

create table public.rule (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.session (id) on delete cascade,
  text text not null,
  theme text,
  position int not null default 0,
  created_at timestamptz not null default now()
);

create index session_owner_id_idx on public.session (owner_id);
create index card_session_id_idx on public.card (session_id);
create index answer_card_id_idx on public.answer (card_id);
create index rule_session_id_idx on public.rule (session_id);

alter table public.profile enable row level security;
alter table public.session enable row level security;
alter table public.card enable row level security;
alter table public.answer enable row level security;
alter table public.rule enable row level security;

-- Crée automatiquement la ligne `profile` d'un manager à sa première
-- connexion (auth.users -> public.profile), pour que `session.owner_id`
-- puisse la référencer dès la connexion par lien magique.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profile (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
