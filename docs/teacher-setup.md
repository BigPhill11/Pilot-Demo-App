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

The database does not have the teacher tables yet. Nine SQL files add them, and
this step is what makes `/teach` work at all — until it is done, the dashboard
404s against the API.

**Do this one, it is the shortest path.** Two copy-and-paste blocks in your
browser, no terminal, no installs:

1. Open <https://supabase.com/dashboard/project/qssqbpllqkorfjcxgomh/sql/new>.
   That is the **SQL Editor** — left sidebar, the icon labelled *SQL Editor*,
   then **New query**. It is a text box you paste SQL into and a green **Run**
   button.
2. Open [`docs/sql/teacher-setup-part-1-enum.sql`](sql/teacher-setup-part-1-enum.sql)
   in this repo. Select all of it, paste it into that box, click **Run**. It
   finishes instantly and says *Success. No rows returned*.
3. Click **New query** to get an *empty tab*. This matters — see the warning
   below.
4. Open [`docs/sql/teacher-setup-part-2-feature.sql`](sql/teacher-setup-part-2-feature.sql),
   select all, paste, **Run**. It is long (about 1,600 lines) but takes a second
   or two. Same *Success* message.

That is the whole step. Both files are safe to run twice, so if you lose track
of whether one went through, just run it again.

> **Why two files instead of one paste?** The editor runs everything in a tab as
> a single transaction, and Postgres refuses to *use* an enum value in the same
> transaction that *added* it. Part 1 adds `teacher` to the role enum; part 2
> uses it. Combined in one tab you get `unsafe use of new value "teacher" of
> enum type app_role` and nothing is applied. Two tabs, in order, is all it
> takes.

### If you cannot copy the whole file

Part 2 is about 1,600 lines, and some setups will not copy that much at once.
Almost always the cause is GitHub's file viewer rather than your machine: it
renders long files a screenful at a time, so *select all* grabs only what is on
screen — often a hundred-odd lines.

Two ways around it, in order of preference:

**Use the raw file.** On the GitHub page for the file, click the **copy icon**
in the toolbar above the code ("Copy raw file"). That copies the entire file
regardless of length, because it never goes through the rendered view. Opening
the `raw.githubusercontent.com` URL and pressing Ctrl-A / Cmd-A works too — the
raw page is plain text with nothing virtualised.

**Or paste it in small pieces.** `docs/sql/chunks/` holds the same SQL split into
17 numbered files, none longer than 150 lines. Run them in numbered order,
`01` through `17`, each in its own new query tab. Chunk 1 is the enum, so the
transaction boundary is handled for you.

The chunks are cut only between whole statements, never inside a function, and
each one is safe to run twice — so if you lose your place, re-run the chunk you
are unsure about and carry on. Running all 17 produces a database identical to
the two-file route.

### Where the commands you were given actually run

If you were handed this:

```bash
npx supabase login
npx supabase link --project-ref qssqbpllqkorfjcxgomh
npx supabase db push
```

those are **terminal commands on your own computer**, run from the root of this
repository — not something you paste into the Supabase website. There is no
place in the Supabase dashboard to type them. `npx` is part of Node.js, and
`db push` uploads the migration files from `supabase/migrations/` to the
project.

The CLI is the better habit long term, because it records which migrations the
project has already seen. It has one snag on this project: the database was
partly built by pasting SQL into the dashboard, so the remote migration history
is incomplete, and `db push` may refuse to run or ask you to repair history
first. If that happens, do not fight it — use the two-file paste above, which
has exactly the same end result.

### The nine files, for reference

Filename order matters; the bundle preserves it.

```
20260801000000_teacher_role_enum.sql      -- adds 'teacher' to app_role   (part 1)
20260801000100_classrooms.sql             -- classrooms + classroom_members, backfill
20260801000200_teacher_rpcs.sql           -- the dashboard's data functions
20260801000300_sync_module_progress.sql   -- localStorage progress write-through
20260801000400_teacher_signup.sql         -- teacher role granted at signup
20260802000000_access_code_lifecycle.sql  -- code expiry + usage caps
20260802000100_teacher_role_grant.sql     -- upgrade an existing account
20260802000200_assessment_responses.sql   -- scenario answer capture
20260802000300_teacher_teachback.sql      -- teach-back proficiency
```

Everything under `docs/sql/` — both bundle files and the 17 chunks — is
generated from these, so the migrations stay the source of truth. After changing
any of them:

```bash
node scripts/build-teacher-sql.mjs
```

### Lost track of where you are?

Paste this into the SQL editor at any point. It reports which parts are in and
what to do next, and it is safe to run at any time:

```sql
select
  case when exists (
         select 1 from pg_type t join pg_enum e on e.enumtypid = t.oid
         where t.typname = 'app_role' and e.enumlabel = 'teacher')
       then 'done' else 'NOT DONE' end                              as part_1_enum,
  case when to_regclass('public.classrooms') is not null
        and to_regclass('public.classroom_members') is not null
        and to_regclass('public.assessment_responses') is not null
        and (select count(*) from pg_proc p
               join pg_namespace n on n.oid = p.pronamespace
              where n.nspname = 'public' and p.proname like 'teacher\_%') = 11
       then 'done' else 'NOT DONE' end                              as part_2_feature,
  case
    when not exists (
      select 1 from pg_type t join pg_enum e on e.enumtypid = t.oid
      where t.typname = 'app_role' and e.enumlabel = 'teacher')
      then 'Run part 1 (the ALTER TYPE line), then part 2.'
    when to_regclass('public.classrooms') is null
      then 'Part 1 is in. Open a NEW tab and run part 2.'
    when (select count(*) from pg_proc p
            join pg_namespace n on n.oid = p.pronamespace
           where n.nspname = 'public' and p.proname like 'teacher\_%') < 11
      then 'Part 2 only partly applied. Re-run it in a new tab.'
    else 'Database is ready. Next: merge the PR and publish the app.'
  end                                                               as what_to_do_next;
```

### Confirm it worked

Run this in the SQL editor as a third query. Four rows come back, and the
`ok` column should read `yes` on all of them:

```sql
select 'role enum has teacher' as check,
       case when 'teacher' = any (enum_range(null::public.app_role)::text[])
            then 'yes' else 'no' end as ok
union all
select 'teacher functions (expect 11)',
       case when count(*) = 11 then 'yes' else 'no: ' || count(*) end
  from pg_proc p join pg_namespace n on n.oid = p.pronamespace
 where n.nspname = 'public' and p.proname like 'teacher\_%'
union all
select 'new tables (expect 3)',
       case when count(*) = 3 then 'yes' else 'no: ' || count(*) end
  from information_schema.tables
 where table_schema = 'public'
   and table_name in ('classrooms', 'classroom_members', 'assessment_responses')
union all
select 'code limit columns (expect 2)',
       case when count(*) = 2 then 'yes' else 'no: ' || count(*) end
  from information_schema.columns
 where table_schema = 'public' and table_name = 'access_codes'
   and column_name in ('expires_at', 'max_redemptions');
```

Then see how many classrooms the backfill created:

```sql
select count(*) from public.classrooms;
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

## Claiming the classes that already existed

The migration turns every pre-existing student access code into a classroom and
enrols everyone who signed up with it. Those classrooms are real, with full
rosters — but they have **no owner**, because the database has no way to guess
which teacher a code from six months ago belonged to. A teacher only sees
classrooms where `teacher_id` is their own user id, so until someone is
assigned, these are invisible to everyone.

This only matters if the project already had students before the teacher feature
existed. A brand-new project can skip it.

First, see what the backfill produced:

```sql
select c.name,
       c.join_code,
       c.teacher_id is null as unclaimed,
       (select count(*) from public.classroom_members m
         where m.classroom_id = c.id and m.status = 'active') as students
from public.classrooms c
order by students desc;
```

Then hand each one to a teacher by email. Run this once per classroom, changing
the code and the email:

```sql
update public.classrooms
set teacher_id = (select id from auth.users where lower(email) = lower('teacher@school.org'))
where join_code = 'CLASS-XS83';
```

To give every unclaimed class to one person — the usual case when the owner has
been running all the cohorts themselves:

```sql
update public.classrooms
set teacher_id = (select id from auth.users where lower(email) = lower('you@example.com'))
where teacher_id is null;
```

The account you name must already exist and must hold the `teacher` role, or the
dashboard will list the classroom and then refuse to load it. Grant the role
first from the **Teacher Access** card in `/admin`.

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

### Which questions land in Scenario answers

Every graded multiple-choice surface on the main learning paths records the
option each student picked:

| Surface | Shows up as |
| --- | --- |
| Personal finance lesson knowledge checks | Personal Finance, lesson title |
| Personal finance test-outs | Personal Finance, "<Module> — test out" |
| Village lesson checks | Market Intelligence, lesson title |
| Language of Finance / Ownership / Headlines lesson checks | Market Intelligence, lesson title |
| Economics lesson quizzes | Economics, lesson title |
| Interviewing and email-etiquette lesson checkpoints | Career Readiness, e.g. "Interviewing · Prepare" |

Deliberately not recorded: flashcard drills, the Panda Jump game, and the
practice activities that have no single right answer. They measure effort rather
than understanding, and mixing them in would bury the questions that actually
diagnose a misconception.

Two details worth knowing when reading the numbers. A student who changes their
pick before moving on is recorded as having chosen the first option, because
that is what they knew unaided. And a student who retries a quiz creates a
second attempt, with the view showing their most recent one — so the list
reflects what the class understands now, not what they got wrong first.

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
