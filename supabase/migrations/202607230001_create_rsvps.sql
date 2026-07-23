create extension if not exists pgcrypto;

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null check (char_length(guest_name) between 2 and 100),
  phone text not null check (char_length(phone) between 7 and 40),
  phone_normalized text not null unique check (char_length(phone_normalized) between 7 and 16),
  attendance_status text not null check (attendance_status in ('attending', 'declining')),
  guest_count smallint not null check (guest_count between 0 and 6),
  message text check (message is null or char_length(message) <= 600),
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default timezone('utc'::text, now()),
  constraint rsvps_attendance_guest_count_check check (
    (attendance_status = 'attending' and guest_count >= 1)
    or (attendance_status = 'declining' and guest_count = 0)
  )
);

create index if not exists rsvps_created_at_idx on public.rsvps (created_at desc);
create index if not exists rsvps_user_id_idx on public.rsvps (user_id) where user_id is not null;

alter table public.rsvps enable row level security;

revoke all on table public.rsvps from anon, authenticated;
grant select, insert, update, delete on table public.rsvps to service_role;

comment on table public.rsvps is 'Wedding invitation replies. Public writes occur only through the validated Next.js Server Action.';
comment on column public.rsvps.phone_normalized is 'Canonical phone value used for duplicate prevention.';
