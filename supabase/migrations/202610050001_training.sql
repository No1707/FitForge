begin;

create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  goal text not null default '',
  source text not null default 'manual' check (source in ('ai', 'manual')),
  schedule jsonb not null default '[]'::jsonb,
  tips jsonb not null default '[]'::jsonb,
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.programs add column if not exists settings jsonb;
alter table public.programs enable row level security;
drop policy if exists fitforge_programs_owner on public.programs;
create policy fitforge_programs_owner on public.programs for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
-- Restrictive ownership also constrains any permissive legacy policy.
drop policy if exists fitforge_programs_owner_guard on public.programs;
create policy fitforge_programs_owner_guard on public.programs as restrictive for all to public
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
grant select, insert, update, delete on public.programs to authenticated;
-- Keep the most recently updated active program if legacy data contains several.
with ranked as (
  select id, row_number() over (partition by user_id order by updated_at desc, created_at desc, id) as position
  from public.programs where is_active
)
update public.programs set is_active = false where id in (select id from ranked where position > 1);
create unique index if not exists fitforge_one_active_program on public.programs (user_id) where is_active;

create or replace function public.set_active_program(target_id uuid)
returns void language plpgsql security invoker set search_path = '' as $$
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtext(auth.uid()::text));
  if not exists (select 1 from public.programs where id = target_id and user_id = auth.uid()) then
    raise exception 'Program not found';
  end if;
  update public.programs set is_active = false, updated_at = now() where user_id = auth.uid() and is_active;
  update public.programs set is_active = true, updated_at = now() where id = target_id and user_id = auth.uid();
end;
$$;
revoke all on function public.set_active_program(uuid) from public, anon;
grant execute on function public.set_active_program(uuid) to authenticated;

-- Completed sessions contain snapshots, independent of later program edits/deletions.
create table if not exists public.workout_sessions (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  program_id text not null,
  completed_at timestamptz not null,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  constraint fitforge_workout_object check (jsonb_typeof(payload) = 'object'),
  constraint fitforge_workout_identity check (payload ? 'id' and payload->>'id' = id::text),
  constraint fitforge_workout_completed check (payload->>'completedAt' is not null and (payload->>'completedAt')::timestamptz = completed_at),
  constraint fitforge_workout_size check (octet_length(payload::text) <= 250000)
);
create index if not exists fitforge_workout_history on public.workout_sessions (user_id, completed_at desc);
alter table public.workout_sessions enable row level security;
drop policy if exists fitforge_workouts_owner on public.workout_sessions;
create policy fitforge_workouts_owner on public.workout_sessions for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
grant select, insert, update, delete on public.workout_sessions to authenticated;
revoke all on public.workout_sessions from anon;

commit;
