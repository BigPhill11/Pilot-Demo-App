# Privacy Posture Gap Analysis — Phil's Financials

> **DISCLAIMER:** Compliance research support prepared by an AI agent. **Not legal advice.**
> Items marked **NEEDS ATTORNEY VERIFICATION** should go to the privacy attorney Brian
> recommended before any APS procurement conversation.

Date of audit: **2026-07-02** (read-only; no source files modified).
Repo audited: `/Users/garrett/Pilot-Demo-App`.

---

## 1. What the app ACTUALLY collects from minors (verified in code)

| # | Data | Where collected | Where it flows / is stored |
|---|---|---|---|
| D1 | **Email address** | `src/components/auth/AuthPage.tsx`, `src/components/onboarding/OnboardingAuthGate.tsx` | Supabase `auth.users` AND duplicated into `public.profiles.email` by the `handle_new_user` trigger (`supabase/migrations/20250616041405_*.sql:68-73`) |
| D2 | **Username** (optional; defaults to the email local-part, which is often a real name) | Both auth forms | `profiles.username` |
| D3 | **Password** | Both auth forms (min 6 chars) | Supabase Auth (hashed) |
| D4 | **Age attestation** (`age_confirmed` boolean — checkbox only, no DOB) | Both auth forms | `profiles.age_confirmed` (`supabase/migrations/20251225001813_*.sql`) |
| D5 | **Access code → partner linkage** | Both auth forms | `profiles.signup_access_code` + `raw_user_meta_data.access_code`; ties each student to the distributing org (First Tee / PAL / school) |
| D6 | **Learning analytics**: streaks (`current_streak`, `longest_streak`, `last_login_date`), quiz mastery, XP/coin transactions, game scores, achievements, engagement score, daily activities, time-on-task | `ProgressContext`, dashboard components (`StreakCounter.tsx`, `TimeSpentCard.tsx`, `WeeklyActivityChart.tsx`), `useReelEngagement.ts` (video watch % analytics) | Supabase tables: `profiles`, `user_progress`, `quiz_progress`, `xp_transactions`, `game_scores`, `user_achievements`, `bamboo_empire_state`, `initial_assessments` (JSONB survey responses) |
| D7 | **Ask Phil free-text chat messages** (students can type anything) | `src/components/AskPhil.tsx`, `src/components/ai/PhilChatAssistant.tsx` | Edge function `supabase/functions/AskPhil/index.ts` → **Google Gemini API** (`gemini-2.5-flash`). Legacy functions also deployed: `phil-chat-openai` → **OpenAI** (`gpt-4o-mini`), `phil-chat`. Per-user daily quota logged via `ask_phil_try_consume` RPC |
| D8 | **Resume builder PII**: full name, email, phone, LinkedIn, education, work history | `src/components/career-readiness/resume/ResumeContactSection.tsx`; type at `src/types/career-readiness.ts:669,736` | Stored in `public.resume_drafts` (JSONB, per-user, RLS-protected). Resume **bullet text + role context** sent to Google Gemini via `supabase/functions/resume-bullet-check/index.ts` |
| D9 | **Microphone audio** (interview practice) | `src/components/career-readiness/interviewing/AudioRecorder.tsx` | **Local only** — blob never uploaded; UI states "Recordings stay on this device." Good. |
| D10 | **Interest survey** (goal, interests, finance goals, time commitment) | `src/components/onboarding/OnboardingInterestSurvey.tsx` | Profiles/survey fields. Does **not** ask family income — keep it that way (PPRA, see §4) |
| D11 | **localStorage** | ~20 keys (theme, streaks, quiz mastery, game stats, tinder matches, tutorial flags) | On-device only; no PII observed in keys audited |

**Third parties that receive student data (verified):** Supabase (all account + analytics
data), Google (Gemini API — chat messages, resume bullets), OpenAI (legacy `phil-chat-openai`
path, if still callable). Market-data vendors (FRED, Marketstack, news APIs) and AssemblyAI
(admin video transcription) do **not** receive student data. `@vercel/analytics` is in
`package.json` but is **not imported anywhere in `src/`** — dormant dependency.

**Positive findings:** access-code gating limits signups to known partner cohorts (good
data-minimization story for districts); RLS `auth.uid()` policies on every user table;
full self-serve deletion via `delete_my_account()` SECURITY DEFINER RPC
(`supabase/migrations/20260629000000_*.sql`) wired to UI in `ProfilePage.tsx` /
`ProfileSettings.tsx`; Android manifest requests only `INTERNET`; no ad SDKs, no trackers,
no social SDKs found.

---

## 2. COPPA (15 U.S.C. §§ 6501–6506; 16 C.F.R. Part 312)

The app declares itself 13+ (Terms §2; signup checkbox), which — if effective — keeps it
outside COPPA's under-13 scope under the "actual knowledge" standard. **But:**

| Gap | Detail | Severity |
|---|---|---|
| C1. Age gate is not a neutral age screen | A pre-checked-able "I am 13+" checkbox is weaker than FTC-recommended neutral age screening (ask DOB/age, block + don't invite retry if under 13). If a district or partner enrolls under-13 students (First Tee serves ages well below 13; "middle schooler" is literally a Gemini prompt persona in `AskPhil/index.ts:67`), the "actual knowledge" defense erodes. | **P0** for school pilots |
| C2. No parental notice/consent mechanism at all | If ANY under-13 use is contemplated (or a district requires it), COPPA requires direct notice + verifiable parental consent — or **school consent acting for parents** in the educational context (FTC guidance). Nothing exists in code or policy. | **P0** decision point |
| C3. 2025 COPPA Rule amendments | Amendments effective June 23, 2025 (compliance ~April 22, 2026) added: separate opt-in consent for third-party disclosures, a **written data-retention policy** (retain only as long as necessary; no indefinite retention), expanded direct-notice content. App has no published retention schedule; analytics tables retain indefinitely. **NEEDS ATTORNEY VERIFICATION** of exact applicability given 13+ posture. | **P1** |
| C4. Safe Harbor program | Plan calls for investigating a COPPA Safe Harbor: **PRIVO, kidSAFE, iKeepSafe, ESRB Privacy Certified, TrustArc/TRUSTe**. A seal materially helps district procurement. Costs/timelines vary (~$3k–$15k+/yr). | **P1** |
| C5. Privacy policy under-13 section is passive | §5 only says "contact us." COPPA-style parental rights (review, delete, refuse further collection) and a named contact/postal address are absent. | **P0** (text fix proposed) |

## 3. FERPA (20 U.S.C. § 1232g; 34 C.F.R. Part 99) — school pilots

When APS (or any district) uses the app for instruction, student data the app holds can be
**education records**. Districts will demand, before procurement:

| Gap | Detail | Severity |
|---|---|---|
| F1. No "school official" language | Neither policy nor terms designates Phil's Financials as a school official under the district's direct control, with legitimate educational interest, using records only for the contracted purpose (34 C.F.R. § 99.31(a)(1)(i)(B)). | **P0** |
| F2. No Data Privacy Agreement (DPA) template | Districts (incl. APS) typically require a signed student-data-privacy agreement — many use the **SDPC/A4L National DPA (NDPA)** with a Georgia exhibit. Have one ready before the procurement conversation. | **P0** (attorney task) |
| F3. No district-directed deletion path | Self-serve user deletion exists, but there is no documented process for a school to direct deletion of a cohort's records (FERPA/GA student-data expectation). Access codes make cohort identification feasible — document the procedure. | **P1** |
| F4. PPRA (20 U.S.C. § 1232h) | The onboarding interest survey currently avoids the 8 protected areas (notably **income**). Any future survey asking about family finances in a school context could trigger PPRA notice/consent. Add a design guardrail. | **P2** |

## 4. Georgia law

| Gap | Detail | Severity |
|---|---|---|
| G1. Georgia Student Data Privacy, Accessibility, and Transparency Act (O.C.G.A. § 20-2-660 et seq.) | Applies to "operators" of sites/apps used for K-12 school purposes: **no targeted advertising, no sale of student data, no profiling for non-educational purposes; must maintain reasonable security; must delete school-controlled data at district request.** App practices appear compatible (no ads/sale found), but the policy never states these commitments — districts look for the express language. | **P0** (text fix proposed) |
| G2. Georgia breach notification (O.C.G.A. § 10-1-910 et seq.) | No breach-notification commitment in the policy and no internal incident-response note. | **P1** |
| G3. Georgia comprehensive consumer privacy law | As of the audit, Georgia had **not** enacted a comprehensive consumer privacy act (bills pending in recent sessions). **NEEDS ATTORNEY VERIFICATION** for 2026 session developments. | **P2 watch item** |
| G4. Georgia LLC standing | Annual registration with GA Secretary of State due Jan 1–Apr 1 each year; lapse looks bad in procurement diligence. See `IP_CHECKLIST.md` item 4. | **P1** |

## 5. New York (flagged in the June 9 plan)

| Gap | Detail | Severity |
|---|---|---|
| N1. NY Child Data Protection Act (Gen. Bus. Law art. 39-FF, effective June 20, 2025) | Applies to operators of online services that process personal data of **minors under 18** in NY — broader than COPPA. Requires processing be "strictly necessary" for the service or have informed consent (device-signal mechanics still being implemented by AG rulemaking). If any NY users/pilots occur, this governs the 13–17 core audience. **NEEDS ATTORNEY VERIFICATION.** | **P1** (P0 if NY pilot) |
| N2. NY Education Law § 2-d | If piloting with NY schools: Parents' Bill of Rights, signed DPA with specific security terms, NIST CSF alignment, breach notification to district. | Pre-req for any NY school pilot |
| N3. NY SHIELD Act | Reasonable-safeguards + breach-notification duties for NY residents' private information (email + password counts). Largely met technically (Supabase, RLS, hashing) but undocumented. | **P2** |
| N4. NY SAFE for Kids Act | Targets "addictive feeds" and nighttime notifications to minors on social platforms. Streaks/gamification are probably outside scope (not a social feed), but keep on watch list as AG rules issue. | Watch item |

## 6. Policy/Terms document defects (current text)

Files: `src/pages/PrivacyPage.tsx`, `src/pages/TermsPage.tsx`.

1. **AI vendor misdescribed** — Policy §6 says generic "third-party AI services"; reality is
   Google Gemini (primary) + OpenAI (legacy function still deployed with `verify_jwt`).
   The June-9 plan itself assumed "OpenAI-powered" — the codebase has since moved to
   Gemini. Must be accurate, and vendor **no-training/DPA status must be confirmed**
   (Google: data-use terms differ between free and paid Gemini API tiers — confirm the
   project is on the paid tier with data-use restrictions; OpenAI API: no training on API
   data by default). **NEEDS ATTORNEY/OPS VERIFICATION.** (P0)
2. **No legal entity identified** — neither doc names the Georgia LLC. Procurement teams
   check that the contracting entity matches the policy. (P0)
3. **No governing-law clause** in Terms (Georgia). No effective-date consistency: Terms
   "May 24, 2025" vs Privacy "June 2026." (P1)
4. **Contact inconsistencies** — Policy: `philliphead@philsfinancials.com`; App Store
   metadata: `phillipghead@gmail.com`; Terms §10: "contact us through the App" (no channel
   exists). One canonical privacy contact + postal address needed (COPPA direct-notice
   element). (P0)
5. **No retention schedule** (see C3), no breach-notification statement (G2), no
   subprocessor list (Supabase, Google, OpenAI, hosting), no mic disclosure for the
   interview recorder (even though local-only — say so, it's a selling point). (P1)
6. **No express "no targeted advertising / no sale of student data / no profiling"
   commitments** — factually true today, and exactly what O.C.G.A. § 20-2-661 and district
   checklists require in writing. Cheap, high-value addition. (P0)
7. **Deletion statement mismatch** — Policy §7 says removal "within 30 days"; the
   `delete_my_account()` RPC is immediate. Understate or match reality; also add a
   **parental/guardian deletion-request channel** and school-directed deletion. (P1)
8. **Apple age rating 4+** (`APP_STORE_METADATA.md:97`) conflicts with the 13+ Terms and
   invites a "designed for children" characterization. Should be 12+ (Apple bands) with
   guidance text updated. (P1)

## 7. Technical hygiene items with privacy relevance

- `capacitor.config.json:31` — `"allowMixedContent": true` on Android permits HTTP
  content in the WebView; weakens the "reasonable security" story. Recommend `false`. (P2)
- Edge functions use `Access-Control-Allow-Origin: *`; tighten to app origins. (P2)
- `profiles.email` duplicates `auth.users.email` — minimization: consider dropping the
  column or documenting why it's needed. Deletion cascade does cover it. (P2)
- `@vercel/analytics` dormant dependency — remove it or consciously adopt + disclose. If
  the web build ever deploys on Vercel with analytics auto-injection, disclosure would be
  required. (P2)
- Verify iOS `Info.plist` contains `NSMicrophoneUsageDescription` with accurate text
  (iOS project not present in this checkout; verify in the Xcode project). (P1 verify)
- Confirm Supabase project region + signed DPA; export evidence for procurement. (P0 ops)

## 8. Sequencing reminder (from the June 9 plan)

Rewrite `PrivacyPage.tsx`/`TermsPage.tsx` **LAST**, after: Safe Harbor decision (C4),
COPPA-amendment applicability (C3), Georgia operator commitments (G1), NY CDPA analysis
(N1), and AI-vendor DPA confirmations (§6.1). The concrete text edits in
`AUDIT_LOG.md → PROPOSED CHANGES` are the interim, defensible baseline — the attorney
review supersedes them.
