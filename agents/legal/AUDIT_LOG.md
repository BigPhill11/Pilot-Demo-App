# Legal Agent Audit Log — Phil's Financials

> **DISCLAIMER:** Compliance research support prepared by an AI agent. **Not legal advice.**
> This log is the required documentation trail. It is **append-only**: new runs add dated
> sections; nothing above the current date line is rewritten.

Mode: **PROPOSE-THEN-APPLY.** No app source file was modified in this run. Every item
below is `PROPOSED` until Phil marks it `APPROVED`; a later run applies approved items and
appends an `APPLIED <date>` note.

Priorities: **P0** = blocker for APS procurement · **P1** = fix before pilot expansion ·
**P2** = hygiene.

---

# 2026-07-02 — Initial audit (read-only)

## A. Scope of this run

Created `agents/legal/` working folder (CHARTER.md, AUDIT_LOG.md, IP_CHECKLIST.md,
PRIVACY_POLICY_FINDINGS.md). Audited: `src/pages/PrivacyPage.tsx`, `src/pages/TermsPage.tsx`,
`src/components/auth/AuthPage.tsx`, `src/components/onboarding/` (incl.
`OnboardingAuthGate.tsx`, `OnboardingInterestSurvey.tsx`), `src/App.tsx`,
`src/integrations/supabase/client.ts`, all `supabase/functions/` (AskPhil, phil-chat,
phil-chat-openai, resume-bullet-check, transcription/market functions),
`supabase/migrations/` (profiles, tracking tables, resume_drafts, delete_my_account,
access codes), `src/components/career-readiness/` (resume + AudioRecorder),
`APP_STORE_METADATA.md`, `capacitor.config.json`, `android/.../AndroidManifest.xml`,
`package.json`; greps for PII fields, localStorage, analytics/tracking SDKs.

## B. Key findings (full detail in PRIVACY_POLICY_FINDINGS.md)

1. **F-01 (P0)** Ask Phil chat runs on **Google Gemini** (`supabase/functions/AskPhil/index.ts:144-163`,
   model `gemini-2.5-flash`), not OpenAI as the June-9 plan assumed. A **legacy OpenAI
   function is still deployed** (`supabase/functions/phil-chat-openai/index.ts`, gpt-4o-mini)
   plus a `phil-chat` function. Free-text messages from minors flow to these vendors.
   Privacy Policy §6 names neither vendor. Vendor data-use/DPA status unverified —
   Gemini API free tier can use prompts for product improvement; paid tier does not.
   **Action: confirm billing tier + DPAs (Google, OpenAI, Supabase). NEEDS ATTORNEY/OPS.**
2. **F-02 (P0)** No parental-consent or school-consent mechanism anywhere; age gating is a
   self-attested checkbox (`AuthPage.tsx:212-218`, `OnboardingAuthGate.tsx:222-234`), not a
   neutral age screen. Acceptable for a strict 13+ posture, weak for school deployment
   where under-13 users are plausible (First Tee serves younger kids).
3. **F-03 (P0)** No FERPA "school official" language, no district DPA template, no express
   "no targeted ads / no sale / no non-educational profiling" commitments required in
   substance by O.C.G.A. § 20-2-660 et seq. and by district procurement checklists —
   despite the app factually complying (no ad/tracking SDKs found; only `INTERNET`
   permission on Android).
4. **F-04 (P0)** Legal entity never identified in Privacy Policy or Terms; contact email
   inconsistent (`philliphead@philsfinancials.com` in policy vs `phillipghead@gmail.com`
   in `APP_STORE_METADATA.md:169`; Terms §10 says "contact us through the App" — no such
   channel exists).
5. **F-05 (P1)** Resume builder collects **full name, email, phone, LinkedIn** from minors
   (`ResumeContactSection.tsx`; stored in `resume_drafts` JSONB, RLS-protected). Resume
   bullet text (may contain PII) is sent to Gemini (`resume-bullet-check/index.ts`).
   Privacy Policy §1 does not disclose this category at all.
6. **F-06 (P1)** Extensive learning analytics on minors (streaks, time-on-task, quiz
   mastery, XP, game scores, video watch %: `user_progress`, `quiz_progress`,
   `xp_transactions`, `game_scores`, `bamboo_empire_state`, `initial_assessments`,
   `useReelEngagement.ts`) — legitimate educational use, RLS-protected, but no retention
   schedule anywhere (2025 COPPA amendments require a written retention policy).
7. **F-07 (P1)** Deletion: `delete_my_account()` RPC is solid and immediate; policy says
   "within 30 days"; no parental or school-directed deletion channel documented.
8. **F-08 (P1)** `APP_STORE_METADATA.md:97` sets Apple age rating **4+** while Terms
   require 13+ — inconsistent, and invites "directed to children" characterization.
9. **F-09 (GOOD)** Mic recordings in interview practice stay on-device
   (`AudioRecorder.tsx:119` states this in UI); not uploaded. Not mentioned in policy —
   worth disclosing affirmatively. Verify iOS `NSMicrophoneUsageDescription` (iOS project
   not in this checkout).
10. **F-10 (P2)** `@vercel/analytics` in `package.json:52` but never imported — remove or
    adopt-and-disclose. `capacitor.config.json:31` `allowMixedContent: true`. Edge
    functions use wildcard CORS. `profiles.email` duplicates auth email (minimization).
11. **F-11 (GOOD)** Access-code gating (`validateAccessCode`, `signup_access_code`) limits
    accounts to known partner cohorts — strong procurement story; disclose the
    partner-linkage in the policy.
12. **F-12 (IP)** Terms §6 assigns IP to "Phil's Financials" (not a legal entity name);
    nothing filed with USPTO/Copyright Office; GA LLC standing unverified. See
    `IP_CHECKLIST.md`.

---

## C. PROPOSED CHANGES (none applied — awaiting Phil's approval)

> Note (sequencing, per the June-9 plan): PC-1, PC-2, PC-3, PC-6, PC-7 are the interim
> baseline for the policy; the full privacy-policy/terms rewrite happens LAST with the
> privacy attorney. Applying these now still materially improves the APS posture.

### PC-1 · P0 · Name the AI vendors and their data handling — `src/pages/PrivacyPage.tsx` §6 (lines 57-61)

- **Current:** `The "Ask Phil" feature uses third-party AI services to answer your questions. Messages you send to Ask Phil may be processed by these services to generate responses. We do not store these conversations beyond what is needed to provide the service. Do not include sensitive personal or financial information in your messages to Ask Phil.`
- **Proposed:** `The "Ask Phil" tutor and resume feedback features send the text you type (your question or resume bullet) to our AI service providers — Google (Gemini API) and, for some features, OpenAI — to generate a response. We send only the text needed to answer; we do not send your name, email, or account details with these requests. Under our agreements, these providers may not use your messages to train their models. We store a daily count of questions asked, not the content of your conversations. Please do not include personal information (yours or anyone else's) in messages to Ask Phil.`
- **Rationale:** COPPA direct-notice accuracy; district AI-use disclosure expectations;
  truth-in-privacy-policy (FTC Act §5 deception risk if vendors are misdescribed).
- **PRE-CONDITION:** verify Gemini paid-tier/no-training status and OpenAI API terms
  BEFORE applying, or soften "Under our agreements..." accordingly. If PC-4 (decommission
  OpenAI function) is applied first, drop the OpenAI mention.

### PC-2 · P0 · Expand children's privacy + parental rights — `src/pages/PrivacyPage.tsx` §5 (lines 50-54)

- **Current:** `Our App is intended for users 13 years of age and older. We do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will delete that information promptly. Parents or guardians who believe their child has provided us with personal information should contact us immediately.`
- **Proposed:** `Our App is intended for users 13 years of age and older. We do not knowingly collect personal information from children under 13, and we will promptly delete any such information we discover. Parents and guardians of users under 18 may contact us at [PRIVACY_EMAIL] to review the personal information we hold about their child, request its correction or deletion, or withdraw the child's access to the App. We respond to verified parental requests within 30 days. When the App is used through a school or partner program, the school or program may also authorize collection and direct deletion on families' behalf, as described in Section [School Partners].`
- **Rationale:** COPPA §312.6 parental rights model (even for a 13+ service, districts and
  parents expect these rights); aligns with 2025 COPPA amendment expectations.

### PC-3 · P0 · Add a School Partners / FERPA section — `src/pages/PrivacyPage.tsx` (new §, insert after §5)

- **Proposed new section:** `School and Program Partners. When Phil's Financials is used through a school district or youth program, we act as a "school official" with a legitimate educational interest under FERPA (34 C.F.R. § 99.31(a)(1)), operating under the direct control of the school with respect to education records. In these settings we: use student data solely to provide the App for the school's educational purposes; do not use student data for targeted advertising; do not sell student data or use it to build profiles for non-educational purposes; maintain reasonable security practices designed to protect student data; and delete student data at the direction of the school or district. These commitments also reflect Georgia's Student Data Privacy, Accessibility, and Transparency Act (O.C.G.A. § 20-2-660 et seq.).`
- **Rationale:** FERPA school-official exception; O.C.G.A. § 20-2-661 operator duties;
  this is the paragraph APS legal will look for first.

### PC-4 · P0 · Decommission legacy AI functions — `supabase/functions/phil-chat-openai/`, `supabase/functions/phil-chat/`, `supabase/config.toml` (lines 33-37)

- **Current:** Both legacy functions remain deployed/configured (`verify_jwt = true`)
  though the UI invokes only `AskPhil` and `resume-bullet-check` (verified by grep of
  `functions.invoke(` in `src/`).
- **Proposed:** Delete the two function directories and their `config.toml` entries, and
  undeploy them from the Supabase project (ops step).
- **Rationale:** Data minimization — every live endpoint that can forward student text to
  a third party must be disclosed and covered by a DPA. Removing unused ones shrinks the
  audit surface before procurement. (If OpenAI is intentionally kept, instead confirm its
  DPA and keep the OpenAI mention in PC-1.)

### PC-5 · P0 · Identify the legal entity + governing law + effective date — `src/pages/TermsPage.tsx`

- **Line 18 current:** `Last updated: May 24, 2025` → **Proposed:** `Last updated: [DATE OF APPLICATION]` (and keep in sync with PrivacyPage).
- **§1 (line 24) current:** `By accessing or using Phil's Financials ("the App"), you agree...`
  → **Proposed:** `Phil's Financials is operated by [EXACT GEORGIA LLC LEGAL NAME], a Georgia limited liability company ("we," "us"). By accessing or using Phil's Financials ("the App"), you agree...`
- **New §, insert before §10:** `Governing Law. These Terms are governed by the laws of the State of Georgia, without regard to conflict-of-law rules. Any dispute will be brought in the state or federal courts located in Fulton County, Georgia, unless applicable law provides otherwise.`
- **§10 (line 87) current:** `...please contact us through the App.` → **Proposed:** `...please contact us at [PRIVACY_EMAIL] or [LLC MAILING ADDRESS].`
- **Rationale:** contract enforceability; procurement diligence matches entity names
  across policy/terms/SOS records; COPPA notice requires operator contact info.
- **BLOCKED on:** Phil supplying exact LLC name, canonical privacy email, mailing address.

### PC-6 · P0 · Disclose resume-builder and partner-code data — `src/pages/PrivacyPage.tsx` §1 (lines 23-25)

- **Current:** `We collect information you provide directly to us when you create an account, including your email address and username. We also collect data about your use of the App, such as lessons completed, quiz scores, streak data, and progress through learning modules.`
- **Proposed:** `We collect information you provide directly to us when you create an account: your email address, an optional username, and the access code that links your account to the school or partner program that invited you. If you use the optional Resume Builder, we store the resume details you enter (such as name, contact information, education, and experience) in your private account so you can continue editing them. We also collect data about your use of the App, such as lessons completed, quiz scores, streaks, time spent learning, game progress, and which videos you watch, to power your dashboard and personalize your experience.`
- **Rationale:** COPPA/FTC accuracy — resume PII (F-05) and partner linkage (F-11) are
  currently undisclosed categories; GA operator transparency.

### PC-7 · P1 · Retention, deletion accuracy, parental channel — `src/pages/PrivacyPage.tsx` §7 (lines 64-68)

- **Current:** `You have the right to access, correct, or delete your personal information. You may delete your account at any time through the App settings. Upon account deletion, your personal data will be removed from our systems within 30 days.`
- **Proposed:** `You have the right to access, correct, or delete your personal information. You may delete your account at any time in Profile → Delete Account; this immediately and permanently removes your account and associated personal data from our systems (residual copies in encrypted backups are purged on our backup provider's rotation schedule, within 30 days). Parents, guardians, and partner schools may also request deletion by contacting [PRIVACY_EMAIL]. We retain learning-progress data only while your account is active and delete or de-identify it when no longer needed for the educational purposes described here.`
- **Rationale:** matches actual `delete_my_account()` behavior; adds the written-retention
  commitment expected under the 2025 COPPA amendments; adds parental/school channel.

### PC-8 · P1 · Correct IP ownership entity — `src/pages/TermsPage.tsx` §6 (line 59)

- **Current:** `...are the exclusive property of Phil's Financials and are protected by applicable intellectual property laws.`
- **Proposed:** `...are the exclusive property of [EXACT GEORGIA LLC LEGAL NAME] or its licensors and are protected by United States trademark and copyright law and other applicable intellectual property laws.`
- **Rationale:** IP assertions should name the owner of record that USPTO/Copyright
  filings will use (see IP_CHECKLIST items 1, 3, 4). **BLOCKED on** entity name + IP
  assignment confirmation.

### PC-9 · P1 · One canonical privacy contact — `src/pages/PrivacyPage.tsx` §10 (line 87) and `APP_STORE_METADATA.md` (lines 71-78)

- **Current:** policy uses `philliphead@philsfinancials.com`; App Store metadata uses
  `phillipghead@gmail.com`; support URL placeholder text remains ("or your support email URL").
- **Proposed:** Phil picks ONE monitored address (recommend `privacy@philsfinancials.com`);
  update policy §10, Terms §10 (PC-5), App Store support fields; remove placeholder text
  and confirm `https://philsfinancials.com/privacy` actually serves the current policy
  (Apple requires a working public URL; the in-app route `/privacy` is public per
  `src/App.tsx:85` — the web deployment must expose it).
- **Rationale:** COPPA direct-notice operator contact; App Review consistency.

### PC-10 · P1 · Align Apple age rating with 13+ terms — `APP_STORE_METADATA.md` (lines 96-97)

- **Current:** `The app should be rated: 4+ (no objectionable content)`
- **Proposed:** `The app should be rated 12+ (closest Apple band consistent with our 13+ Terms of Service; do NOT opt into the Kids Category).` Add note: answer App Privacy "Data Collection" questionnaire consistently with Privacy Policy §1 (email, user content, usage data — no tracking).
- **Rationale:** consistency defeats "service directed to children" arguments and matches
  the COPPA posture; App Privacy labels are an FTC/Apple accuracy obligation.

### PC-11 · P1 · Neutral age screen at signup — `src/components/auth/AuthPage.tsx` (lines 211-218) and `src/components/onboarding/OnboardingAuthGate.tsx` (lines 222-234)

- **Current:** checkbox `I confirm that I am 13 years of age or older...` gating the
  submit button.
- **Proposed (design change, needs Phil + attorney sign-off on approach):** replace the
  checkbox with a neutral birth-year (or age) selector placed before the form. If the
  computed age is under 13, block signup with a neutral message ("You can't create an
  account yet") and do not store the attempted value or invite retrying with a different
  age (session-flag the device). Keep the Terms/Privacy consent checkbox separate from
  the age question. Store the age band (13–15 / 16–17 / 18+), not the birthdate, in
  `profiles` (data minimization).
- **Rationale:** FTC guidance favors neutral age screening over "I am 13+" checkboxes;
  age-band storage supports NY CDPA (under-18) analysis without collecting a DOB.

### PC-12 · P1 · Disclose microphone + confirm iOS purpose string — `src/pages/PrivacyPage.tsx` §8 (lines 71-75) + iOS project

- **Current §8:** covers only local storage of preferences.
- **Proposed:** append to §8: `The optional interview-practice recorder uses your device microphone. Recordings are kept only on your device for playback and are never uploaded to our servers; deleting them in the App removes them from your device.` Ops step: verify the Xcode project's `Info.plist` contains `NSMicrophoneUsageDescription` matching this language (iOS project not present in this checkout).
- **Rationale:** accuracy + it is affirmatively a strong story (verified in
  `AudioRecorder.tsx` — audio blob never leaves device).

### PC-13 · P2 · Remove dormant analytics dependency — `package.json` (line 52)

- **Current:** `"@vercel/analytics": "^1.6.1",` (never imported in `src/`).
- **Proposed:** delete the line (and lockfile entry on next install).
- **Rationale:** prevents accidental activation of third-party analytics on a minors'
  service without disclosure; shrinks the SDK inventory districts review.

### PC-14 · P2 · Disable mixed content — `capacitor.config.json` (line 31)

- **Current:** `"allowMixedContent": true,`
- **Proposed:** `"allowMixedContent": false,` (regression-test Android build; all audited
  endpoints are HTTPS).
- **Rationale:** "reasonable security procedures" under O.C.G.A. § 20-2-661 / NY SHIELD;
  removes a cheap finding from any district security review.

### PC-15 · P2 · Tighten CORS on edge functions — `supabase/functions/*/index.ts`

- **Current:** `"Access-Control-Allow-Origin": "*"` in all functions (e.g.
  `AskPhil/index.ts:5`).
- **Proposed:** restrict to the production web origin(s) + Capacitor origins
  (`capacitor://localhost`, `http://localhost` variants used by the app shell).
- **Rationale:** security hardening for endpoints that proxy student text to AI vendors.

### PC-16 · OPS (P0, no code) · Vendor DPA evidence pack

- Confirm and archive under `agents/legal/evidence/dpas/`: Supabase DPA + data-region
  statement; Google Cloud/Gemini API terms tier confirmation (paid tier, no-training);
  OpenAI API DPA (or decommission per PC-4); hosting provider. Required before APS
  procurement; also feeds the accuracy of PC-1.

## D. Items for the privacy attorney (Brian's referral)

1. COPPA posture decision: strict 13+ with neutral age screen (PC-11) vs supporting
   school-consent for under-13 — this decision shapes PC-2/PC-3 final text.
2. Applicability of the 2025 COPPA Rule amendments to a 13+ ed service; retention policy
   wording (PC-7).
3. Safe Harbor program selection (PRIVO / kidSAFE / iKeepSafe / ESRB) — cost vs
   procurement value.
4. NY Child Data Protection Act (under-18 scope) exposure if any NY users; NY Ed Law 2-d
   readiness if a NY school pilot happens.
5. Georgia: confirm no comprehensive privacy act enacted in the 2026 session; operator
   obligations under O.C.G.A. § 20-2-660 et seq.; breach-notification plan.
6. Draft/adopt a district Data Privacy Agreement (SDPC National DPA with Georgia exhibit)
   before the APS conversation.
7. IP: entity/assignment cleanup (LLC owns code, art, marks), trademark classes and
   clearance, copyright deposit strategy incl. AI-generated-art limits.

## E. Status ledger

| ID | Priority | Status |
|---|---|---|
| PC-1 | P0 | PROPOSED (pre-condition: PC-16 verification) |
| PC-2 | P0 | PROPOSED |
| PC-3 | P0 | PROPOSED |
| PC-4 | P0 | PROPOSED (Phil decision: keep or kill OpenAI path) |
| PC-5 | P0 | PROPOSED — BLOCKED on LLC name, email, address |
| PC-6 | P0 | PROPOSED |
| PC-7 | P1 | PROPOSED |
| PC-8 | P1 | PROPOSED — BLOCKED on LLC name |
| PC-9 | P1 | PROPOSED — BLOCKED on canonical email choice |
| PC-10 | P1 | PROPOSED |
| PC-11 | P1 | PROPOSED — design decision needed |
| PC-12 | P1 | PROPOSED + iOS verification pending |
| PC-13 | P2 | PROPOSED |
| PC-14 | P2 | PROPOSED (needs Android regression test) |
| PC-15 | P2 | PROPOSED |
| PC-16 | P0 (ops) | OPEN |

*End of 2026-07-02 entry. Future runs: append below this line.*

---

# 2026-07-05 — Working session (new autonomy policy; PC-4 removal spec; privacy-policy draft; TM clearance protocol)

> Not legal advice. Attorney review required before reliance.

## A. Policy change of record — TIERED AUTONOMY (set by Phil today)

Phil authorized a new operating mode, now recorded in `CHARTER.md` (§"Mode of Operation:
TIERED AUTONOMY") together with the **3x-daily schedule (9:00 AM / 1:00 PM / 5:00 PM)**:

- **AUTO-APPLY** low-risk changes directly, each logged here with date + diff summary.
  Low-risk = additive documentation, code comments, disclaimers, new files under
  `agents/`, non-functional copy fixes not touching data handling.
- **PROPOSE-ONLY** (await Phil's `APPROVED` mark in the ledger) for high-risk: auth,
  onboarding, data collection/flows, user-facing privacy policy/terms text, Supabase
  functions, deletions of code or files, `AndroidManifest.xml`, `APP_STORE_METADATA.md`,
  PII handling.

## B. New findings this run

1. **F-13 (P0, corrects F-01/PC-4 detail):** the legacy `phil-chat` function does NOT use
   OpenAI — it sends student chat text to **Perplexity AI**
   (`api.perplexity.ai/chat/completions`, model `llama-3.1-sonar-small-128k-online`;
   `supabase/functions/phil-chat/index.ts:57-87`). That is a **third AI vendor**, never
   named in any policy text and absent from the 2026-07-02 third-party inventory
   (PRIVACY_POLICY_FINDINGS.md §1 listed only Supabase/Google/OpenAI — corrected by this
   entry; findings doc itself is unchanged per append-only discipline). Same
   data-protection concern as the OpenAI path: minors' free text to an unused vendor
   with no DPA on file.
2. **F-14 (ops constraint):** the `OPENAI_API_KEY` secret is **shared** — besides
   `phil-chat-openai`, it is used by the admin content pipeline
   (`supabase/functions/enhanced-transcription/index.ts:37`,
   `process-video-transcript/index.ts:83`, `ingest-video/index.ts:130`, via
   `_shared/phils-friends-ai.ts`). Those functions process admin-uploaded video
   transcripts, **not student data**. Therefore the secret must NOT be deleted when
   `phil-chat-openai` is removed. `PERPLEXITY_API_KEY`, by contrast, has no other user
   in the repo and can be removed with `phil-chat`.

## C. PROPOSED CHANGES (awaiting APPROVED — nothing deleted this run)

### PC-17 · P0 · REMOVAL PROPOSAL (detailed spec executing PC-4): decommission `phil-chat-openai` and `phil-chat`

**Phil's decision on record (2026-07-05):** remove the legacy chat functions. This spec
is the exact work order; per the autonomy policy, Supabase functions and file deletions
are PROPOSE-ONLY, so **no action is taken until this item is marked `APPROVED`.**

**Complete reference map (repo-wide grep, 2026-07-05 — `phil-chat`, `phil-chat-openai`,
`OPENAI`, case-insensitive):**

| # | Reference | Action on approval |
|---|---|---|
| 1 | `supabase/functions/phil-chat-openai/` (entire directory; only file: `index.ts`, 113 lines — OpenAI `gpt-4o-mini`, `api.openai.com`) | DELETE directory |
| 2 | `supabase/functions/phil-chat/` (entire directory; only file: `index.ts`, 113 lines — Perplexity `llama-3.1-sonar-small-128k-online`, `api.perplexity.ai`) | DELETE directory |
| 3 | `supabase/config.toml:33-34` — `[functions.phil-chat]` / `verify_jwt = true` | DELETE both lines |
| 4 | `supabase/config.toml:36-37` — `[functions.phil-chat-openai]` / `verify_jwt = true` | DELETE both lines |
| 5 | Deployed functions on project `qssqbpllqkorfjcxgomh` | OPS: `supabase functions delete phil-chat-openai` and `supabase functions delete phil-chat` (undeploy; verify gone in dashboard → Edge Functions) |
| 6 | Supabase secret `PERPLEXITY_API_KEY` | OPS: remove from project secrets (no other consumer in repo) AND revoke the key in the Perplexity console |
| 7 | Supabase secret `OPENAI_API_KEY` | **KEEP** — required by `enhanced-transcription`, `process-video-transcript`, `ingest-video` (admin video pipeline, no student data; see F-14). Recommend key rotation as hygiene after decommission |
| 8 | `src/` client code | NO CHANGES NEEDED — verified no `functions.invoke('phil-chat'...)` or `('phil-chat-openai'...)` anywhere; UI invokes only `AskPhil`, `resume-bullet-check`, `market-headlines`, `fred-data`, `enhanced-market-data`, `ingest-video` |
| 9 | Mentions in `agents/legal/*.md` | Historical record — retain (append-only log) |

**Data-protection rationale:** Both endpoints accept authenticated students' free-text
chat and forward it to vendors (OpenAI, Perplexity) with which no DPA is on file, that no
policy text discloses, and that the current UI never calls — yet they remain deployed
with `verify_jwt = true`, so any authenticated minor's client could still reach them.
Data minimization (16 C.F.R. § 312.7 principle; O.C.G.A. § 20-2-661 reasonable-security
duty; 2025 COPPA amendments' third-party-disclosure opt-in expectations) requires that
every live endpoint capable of sending student text to a third party be disclosed,
DPA-covered, and necessary. Removing unused endpoints shrinks the disclosure surface,
the vendor-DPA burden (PC-16 then covers Google + Supabase only), and the APS
procurement audit surface. It also simplifies PC-1 and the §6 AI disclosure in the new
draft policy (Gemini only).

**Post-approval verification checklist (to be logged as `APPLIED`):** dirs gone from
repo; `config.toml` clean; dashboard shows both functions undeployed; `PERPLEXITY_API_KEY`
removed/revoked; `OPENAI_API_KEY` intact; grep for `phil-chat` in `src/` + `supabase/`
returns nothing; Ask Phil feature regression-tested (uses `AskPhil` → Gemini, untouched).

## D. APPLIED this run (auto-apply tier, low-risk)

1. **`agents/legal/CHARTER.md`** — replaced §"Mode of Operation: PROPOSE-THEN-APPLY" with
   §"Mode of Operation: TIERED AUTONOMY (set by Phil, 2026-07-05)" (auto-apply vs
   propose-only lists) and added a new §"Schedule" (3x-daily runs, 9:00/1:00/5:00).
   Diff: ~35 lines added, 8 replaced. Basis: Phil's instruction today; charter update is
   additive documentation under `agents/`.
2. **`agents/legal/DRAFT_privacy_policy.md`** — NEW FILE (low-risk: draft doc under
   `agents/`). Full COPPA/FERPA/Georgia-aligned privacy-policy rewrite v0.1, executing
   the substance of PC-1/2/3/6/7/12 in one coherent document: operator identity
   placeholders; complete data inventory incl. Resume Builder PII and access-code partner
   linkage; express **no targeted ads / no sale / no non-educational profiling**
   commitments (O.C.G.A. § 20-2-661); parental-rights mechanism (review/correct/delete/
   withdraw, 30-day response; COPPA §312.6 model); FERPA "school official" section
   (34 C.F.R. § 99.31(a)(1)) with school-directed cohort deletion; Gemini-only AI
   disclosure (conditioned on PC-4/PC-17 + PC-16 verification, with inline attorney
   pre-condition note); written retention commitment (2025 COPPA amendments); breach
   notification (O.C.G.A. § 10-1-910); mic local-only disclosure; drafting-notes appendix
   mapping every section to findings/statutes. **The draft is NOT live text** — swapping
   it into `src/pages/PrivacyPage.tsx` is PROPOSE-ONLY and additionally gated by the
   June-9 sequencing rule (rewrite adopted LAST, after Safe Harbor (C4) and NY CDPA (N1)
   decisions) → logged as **PC-18** below.
3. **`agents/legal/IP_CHECKLIST.md`** item 1 — added the USPTO clearance-search protocol
   (7 query sets with exact expert-mode search strings for classes 9/41/42 + IC 036
   confusion sweep; panda design-code `DC:030114`; common-law layer; evidence-capture
   procedure). Status: NOT STARTED → IN PROGRESS. Diff: ~30 lines added in place
   (living-document rules). Searches themselves not yet run (Phil or a browser-enabled
   run executes them; syntax tags flagged for verification against the current USPTO UI).

### PC-18 · P0 · Adopt DRAFT_privacy_policy.md into `src/pages/PrivacyPage.tsx`

- **Proposed:** replace the body of `PrivacyPage.tsx` with the finalized text of
  `agents/legal/DRAFT_privacy_policy.md` once (a) placeholders resolved, (b) PC-16 vendor
  verification done, (c) PC-17 applied or §6 expanded to name OpenAI/Perplexity,
  (d) privacy attorney sign-off, (e) Safe Harbor + NY CDPA decisions settled.
- **Status: PROPOSED — BLOCKED** on the above. High-risk (user-facing policy text).

## E. Status ledger (supersedes 2026-07-02 table)

| ID | Priority | Status |
|---|---|---|
| PC-1 | P0 | PROPOSED — largely superseded by DRAFT §6 / PC-18 (pre-condition PC-16) |
| PC-2 | P0 | PROPOSED — superseded by DRAFT §5 / PC-18 |
| PC-3 | P0 | PROPOSED — superseded by DRAFT §7 / PC-18 |
| PC-4 | P0 | PROPOSED — **executed by PC-17 spec; awaiting APPROVED** |
| PC-5 | P0 | PROPOSED — BLOCKED on LLC name, email, address |
| PC-6 | P0 | PROPOSED — superseded by DRAFT §1 / PC-18 |
| PC-7 | P1 | PROPOSED — superseded by DRAFT §8 / PC-18 |
| PC-8 | P1 | PROPOSED — BLOCKED on LLC name |
| PC-9 | P1 | PROPOSED — BLOCKED on canonical email choice |
| PC-10 | P1 | PROPOSED |
| PC-11 | P1 | PROPOSED — design decision needed |
| PC-12 | P1 | PROPOSED — disclosure text superseded by DRAFT §1; iOS `Info.plist` verification still pending |
| PC-13 | P2 | PROPOSED |
| PC-14 | P2 | PROPOSED (needs Android regression test) |
| PC-15 | P2 | PROPOSED |
| PC-16 | P0 (ops) | OPEN — now Google + Supabase only if PC-17 approved |
| **PC-17** | **P0** | **PROPOSED — awaiting APPROVED (removal spec, §C above)** |
| **PC-18** | **P0** | **PROPOSED — BLOCKED (see §D.2)** |

## F. Standing blockers for Phil (unchanged, re-surfaced)

1. **Exact GA LLC legal name** (ecorp.sos.ga.gov) — blocks PC-5, PC-8, PC-18, TM filing.
2. **Canonical privacy contact email + mailing address** — blocks PC-5, PC-9, PC-18.
3. **Panda art / comic-panel authorship** (human vs AI vs contractor) — blocks copyright
   registration strategy (IP_CHECKLIST item 3) and logo design-mark filing.
4. Repo visibility (public/private?) — blocks creating `agents/legal/evidence/`.

## G. For the privacy attorney (additions)

- F-13: confirm no residual Perplexity data-retention exposure from the period
  `phil-chat` was live (was it ever called in production? check Supabase function logs
  before deletion — logs are evidence).
- PC-17 approach generally; PC-18 draft review (see drafting-notes table in the draft).

*End of 2026-07-05 entry. Future runs: append below this line.*
