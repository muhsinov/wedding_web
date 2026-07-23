# Supabase RSVP setup

## Architecture

The public form never writes directly from the browser to the database.

```text
Browser form
  → shared Zod validation for immediate feedback
  → Next.js Server Action
  → authoritative server validation
  → phone normalization
  → server-only Supabase service-role client
  → database constraints and unique key
```

Row-level security is enabled and anonymous direct-table access is revoked.

## Create the database

1. Create a Supabase project.
2. Open **SQL Editor → New query**.
3. Copy and run:

```text
supabase/migrations/202607230001_create_rsvps.sql
```

The migration is idempotent for first-time setup and creates the table, indexes, constraints, comments, and security posture.

## Environment

Copy `.env.example` to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Find these values in **Supabase → Project Settings → API**.

Never expose `SUPABASE_SERVICE_ROLE_KEY` in a client component, source repository, screenshot, analytics event, or public environment variable.

Restart Next.js after changing environment variables.

## Data model

`public.rsvps` stores:

| Column              | Type        | Purpose                                         |
| ------------------- | ----------- | ----------------------------------------------- |
| `id`                | UUID        | Primary key                                     |
| `guest_name`        | text        | Guest’s submitted name                          |
| `phone`             | text        | Original submitted phone value                  |
| `phone_normalized`  | text        | Canonical unique phone key                      |
| `attendance_status` | text        | `attending` or `declining`                      |
| `guest_count`       | smallint    | Zero when declining; one or more when attending |
| `message`           | text        | Optional note, maximum 600 characters           |
| `user_id`           | UUID        | Nullable future Supabase Auth relationship      |
| `created_at`        | timestamptz | UTC creation timestamp                          |

## Duplicate prevention

The Server Action normalizes phone formatting before insert. Spaces, punctuation, and parentheses do not create distinct records.

A unique database constraint on `phone_normalized` is the final guard. This remains safe when simultaneous requests reach the server before either can perform an application-level lookup.

Postgres error `23505` is translated into a clear duplicate-reply message without exposing database internals.

## Validation

Validation occurs in three layers:

1. Form controls and interaction state
2. Shared Zod schema on the server
3. SQL constraints in Postgres

The schema verifies name length, plausible phone length, attendance status, conditional guest count, optional-message length, and a bot honeypot.

The database enforces attendance and guest-count consistency even if application code is bypassed.

## Test the flow

1. Run `npm run dev`.
2. Complete the RSVP form with an attending reply.
3. Confirm the success sealing sequence.
4. Check the row in **Table Editor → rsvps**.
5. Submit the same phone number with different formatting.
6. Confirm the duplicate reply is rejected.
7. Submit a declining reply and confirm `guest_count` is zero.
8. Remove the service-role variable locally and confirm the graceful configuration message.

## Vercel

Add all Supabase variables under **Vercel Project → Settings → Environment Variables** for Production, Preview, and Development as appropriate.

After adding or rotating a secret, redeploy. Existing builds do not receive newly added environment variables automatically.

## Rotating credentials

If the service-role key is exposed:

1. Rotate the key immediately in Supabase.
2. Replace the value in Vercel and local secret storage.
3. Redeploy.
4. Review RSVP rows and Supabase logs for unexpected access.
5. Never commit the old or new key.

## Enabling Auth

The repository already includes browser and cookie-aware server clients, plus a nullable `user_id` relationship.

When enabling Auth:

1. Add session middleware using the current `@supabase/ssr` recommendations.
2. Associate authenticated submissions with `auth.users.id`.
3. Add narrow policies allowing a user to read or update only their own RSVP.
4. Decide whether unauthenticated invitation links remain supported.
5. Keep the service-role client server-only.
6. Add rate limiting at the deployment edge if the invitation becomes broadly discoverable.

## Operational queries

Run these from the Supabase SQL Editor.

Attendance totals:

```sql
select
  attendance_status,
  count(*) as replies,
  sum(guest_count) as guests
from public.rsvps
group by attendance_status;
```

Recent replies:

```sql
select guest_name, attendance_status, guest_count, created_at
from public.rsvps
order by created_at desc
limit 25;
```

Potential updates should be handled carefully because phone uniqueness is intentional. For a production guest-editing feature, add authenticated ownership and audit fields in a new migration.
