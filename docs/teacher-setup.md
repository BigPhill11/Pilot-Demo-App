# Setting up teacher access on the live app

Everything below runs against the live Supabase project `qssqbpllqkorfjcxgomh`.
Work top to bottom the first time; after that only steps 4 onward matter for
each new teacher.

## The one thing to understand first

Teachers are not a separate login system. There is one Supabase auth, one users
table, one sign-in form. What separates a teacher from a student is a single row
in `public.user_roles` saying `teacher`, and that row is written for you when
someone signs up with a code whose `grants_role` is `teacher`.

So "setting up teacher login" is really three things: get the tables and
functions into the database, issue a teacher code, and have the teacher sign up
with it.

---

## Step 1 — Apply the migrations

Nine migration files carry the teacher feature. They must run in filename order,
because the enum value has to be committed before anything references it:

```
20260801000000_teacher_role_enum.sql      -- adds 'teacher' to app_role
20260801000100_classrooms.sql             -- classrooms + classroom_members, backfill
20260801000200_teacher_rpcs.sql           -- the dashboard's data functions
20260801000300_sync_module_progress.sql   -- localStorage progress write-through
20260801000400_teacher_signup.sql         -- teacher role granted at signup
20260802000000_access_code_lifecycle.sql  -- code expiry + usage caps
20260802000100_teacher_role_grant.sql     -- upgrade an existing account
20260802000200_assessment_responses.sql   -- scenario answer capture
20260802000300_teacher_teachback.sql      -- teach-back proficiency
```

### Option A — Supabase CLI (recommended)

```bash
npx supabase login
npx supabase link --project-ref qssqbpllqkorfjcxgomh
npx supabase db push
```

`db push` applies only the migrations the project has not seen yet and runs each
file in its own transaction, which is exactly what the enum migration needs.

If `db push` reports that earlier migrations are missing from the remote
history, the project was built by applying SQL through the dashboard rather than
the CLI. In that case use Option B rather than forcing history to match.

### Option B — Dashboard SQL editor

Open the SQL editor in the Supabase dashboard and run the nine files **one at a
time, in the order listed above**, waiting for each to succeed before starting
the next.

Do not paste several files into one editor tab. `ALTER TYPE ... ADD VALUE`
cannot be used in the same transaction that later reads the new value, so
combining the first file with any of the others fails.

### Confirm it worked

```sql
select unnest(enum_range(null::public.app_role));           -- expect admin, user, teacher
select count(*) from public.classrooms;                      -- backfilled from existing codes
select proname from pg_proc p join pg_namespace n on n.oid = p.pronamespace
  where n.nspname = 'public' and proname like 'teacher\_%';  -- expect 9 functions
```

The classrooms count is not zero on a project that already has student access
codes: the migration turns each existing student code into a classroom and
enrolls everyone who signed up with it, so old cohorts appear without anyone
re-registering.

## Step 2 — Regenerate the TypeScript types (optional but worth it)

```bash
npx supabase gen types typescript --project-id qssqbpllqkorfjcxgomh > src/integrations/supabase/types.ts
```

The generated types are stale — they predate `access_codes`, `user_roles` and
everything above — which is why the teacher code keeps its own hand-written
shapes in `src/integrations/supabase/teacherTypes.ts` and routes calls through
`src/lib/teacherApi.ts`. Regenerating is not required for anything to work.

## Step 3 — Check the auth settings

In the dashboard under **Authentication → Providers → Email**:

- **Confirm email**: if this is on, a new teacher must click the link in their
  inbox before they can sign in. That is fine, but tell them to expect it, and
  make sure the redirect URL for the site is correct under **URL Configuration**
  or the link will bounce them somewhere unhelpful.
- Nothing else needs changing. There is no separate teacher provider, no SSO
  requirement, no extra table.

## Step 4 — Issue a teacher code

Sign in with your admin account and go to `/admin`. In the **Access Codes** card:

1. Leave the code field blank to auto-generate one (it will look like
   `TEACH-K4RM`), or type your own.
2. Add a label so you remember who it went to, e.g. `Ms. Rivera — Sample High`.
3. Set the dropdown to **Teacher code**. Doing this switches the defaults to 30
   days and one sign-up, which is what you want: a teacher code hands over the
   ability to see student data, so it should not stay live indefinitely or work
   more than once.
4. Adjust **Valid for** and **Usable by** if you need something different. A
   district pilot with four teachers starting the same week would be 30 days and
   4 sign-ups; a single teacher is 1.
5. Click **Add**, then send the code to the teacher.

Both limits are enforced in the database at sign-up, not just in the form, so a
code that has expired or run out cannot be used even by someone hitting the API
directly. You can change either limit later from the `...` menu on the code row,
and the row shows at a glance whether a code is active, expired, or used up.

## Step 5 — The teacher signs up

Send them to the app with this instruction: **tap "I'm a teacher" at the bottom
of the sign-up screen**, then enter the `TEACH-` code, their email, and a
password.

They can also go straight to `/teach` while signed out — that opens the same
form already in teacher mode.

The teacher code is only needed once, at sign-up. From then on they sign in with
email and password like anyone else.

## Step 6 — The teacher creates their first class

Immediately after signing up they are asked to name a class (plus optional
school and term). Saving it generates a separate student code that looks like
`CLASS-XS83`, which is the code they hand to their students.

The two code types are easy to confuse, so it is worth being explicit with
teachers: `TEACH-` codes are for instructors and unlock the dashboard, `CLASS-`
codes are for students and put them on a roster. A teacher never gives out their
`TEACH-` code.

## Step 7 — Students join

Students sign up normally with the `CLASS-` code in the access code field. A
database trigger matches the code to the classroom and adds them to the roster,
so the teacher does not have to approve anyone. They appear on the dashboard on
the teacher's next refresh.

---

## Turning an existing account into a teacher

Teacher codes only work for people who have not signed up yet. For an account
that already exists — a teacher who used a student code, or one created before
any of this existed — there are two routes:

**From the admin panel.** Go to `/admin`, find the **Teacher Access** card,
enter the person's email, and click **Make teacher**. The same card lists
everyone who currently has the role, with how many classes and students each
one has, and a **Revoke** button for when an instructor leaves.

**By the teacher themselves.** Send them a `TEACH-` code and have them visit
`/teach` while signed in. Instead of being turned away they are asked for a
teacher code, and redeeming it unlocks the dashboard on their existing account
without losing any of their progress.

## What a teacher sees

The dashboard lives at `/teach` and has five views:

- **Overview** — class KPIs, daily activity heatmap, module completion matrix.
- **Students** — sortable roster with status, streaks, progress, CSV export.
- **Scenario answers** — every question the class has answered, hardest first,
  showing which option each student picked. Expanding a question shows the
  distribution across options with student names, so a wrong answer six students
  share reads as one misconception rather than six problems.
- **Teach-backs** — how well each student explains concepts back to Phil,
  scored by the AI grader, plus the facts they most often leave out.
- **Class insights** — per-module averages and the concepts the class as a whole
  keeps missing.

Scenario answers and teach-backs only contain data recorded after these
migrations are applied. Nothing before that was ever stored, so both views start
empty and fill in as students work.

## Troubleshooting

**"A valid access code is required to create an account."** The code is
inactive, misspelled, or does not exist. Codes are case-insensitive but the
hyphen matters.

**"That access code has expired."** Open `/admin`, find the code, and use the
`...` menu to push the expiry out.

**"That access code has already been used the maximum number of times."** Either
the teacher code was already redeemed, or a class code hit its cap. The same
menu has **Allow one more sign-up** and **Remove sign-up limit**.

**Teacher signed up but `/teach` asks for a teacher code.** The code they used
had `grants_role = 'user'`. Grant the role by email from the Teacher Access
card; no need to make them sign up again.

**Dashboard loads but the roster is empty.** Students must sign up with that
class's `CLASS-` code. If they used a different code they are on a different
roster. Check which code an account used with
`select username, signup_access_code from profiles where email = '…';`

**Everything 404s from the app.** The migrations have not been applied to this
project. Re-run step 1 and confirm with the verification queries.
