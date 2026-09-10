-- NORCET study material managed from /admin/norcet-resources.
-- Rows start as drafts; only published rows are readable by the public site.

create table if not exists public.norcet_resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'Notes'
    check (category in ('Syllabus', 'Previous Year Papers', 'Notes', 'Mock Tests', 'Guides')),
  stage text not null default 'Both stages'
    check (stage in ('Both stages', 'Stage I', 'Stage II')),
  subject text not null default '',
  description text not null default '',
  language text not null default 'English',
  file_url text not null,
  file_size text not null default '',
  is_new boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists norcet_resources_created_at_idx
  on public.norcet_resources (created_at desc);

create index if not exists norcet_resources_published_idx
  on public.norcet_resources (published);

alter table public.norcet_resources enable row level security;

drop policy if exists "norcet resources are publicly readable" on public.norcet_resources;
create policy "norcet resources are publicly readable"
  on public.norcet_resources
  for select
  to anon, authenticated
  using (published = true);

drop policy if exists "admins can read all norcet resources" on public.norcet_resources;
create policy "admins can read all norcet resources"
  on public.norcet_resources
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.admins
      where admins.user_id = auth.uid()
    )
  );

drop policy if exists "admins can insert norcet resources" on public.norcet_resources;
create policy "admins can insert norcet resources"
  on public.norcet_resources
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.admins
      where admins.user_id = auth.uid()
    )
  );

drop policy if exists "admins can update norcet resources" on public.norcet_resources;
create policy "admins can update norcet resources"
  on public.norcet_resources
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.admins
      where admins.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.admins
      where admins.user_id = auth.uid()
    )
  );

drop policy if exists "admins can delete norcet resources" on public.norcet_resources;
create policy "admins can delete norcet resources"
  on public.norcet_resources
  for delete
  to authenticated
  using (
    exists (
      select 1
      from public.admins
      where admins.user_id = auth.uid()
    )
  );

grant select on public.norcet_resources to anon;
grant select, insert, update, delete on public.norcet_resources to authenticated;
