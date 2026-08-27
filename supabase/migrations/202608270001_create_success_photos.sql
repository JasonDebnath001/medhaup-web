create table if not exists public.success_photos (
  id uuid primary key default gen_random_uuid(),
  src text not null,
  alt text not null default 'Student success photo',
  aspect text not null default 'tall'
    check (aspect in ('tall', 'wide', 'square')),
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists success_photos_created_at_idx
  on public.success_photos (created_at desc);

alter table public.success_photos enable row level security;

drop policy if exists "success photos are publicly readable" on public.success_photos;
create policy "success photos are publicly readable"
  on public.success_photos
  for select
  to anon, authenticated
  using (published = true);

drop policy if exists "admins can read all success photos" on public.success_photos;
create policy "admins can read all success photos"
  on public.success_photos
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.admins
      where admins.user_id = auth.uid()
    )
  );

drop policy if exists "admins can insert success photos" on public.success_photos;
create policy "admins can insert success photos"
  on public.success_photos
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.admins
      where admins.user_id = auth.uid()
    )
  );

drop policy if exists "admins can update success photos" on public.success_photos;
create policy "admins can update success photos"
  on public.success_photos
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

drop policy if exists "admins can delete success photos" on public.success_photos;
create policy "admins can delete success photos"
  on public.success_photos
  for delete
  to authenticated
  using (
    exists (
      select 1
      from public.admins
      where admins.user_id = auth.uid()
    )
  );

grant select on public.success_photos to anon;
grant select, insert, update, delete on public.success_photos to authenticated;
