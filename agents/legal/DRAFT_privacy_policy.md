# DRAFT Privacy Policy — Phil's Financials (v0.1, 2026-07-05)

> **DISCLAIMER:** This is a working DRAFT prepared by an AI compliance agent. It is **not
> legal advice** and is **not the live policy**. It must be reviewed by the privacy
> attorney (Brian's referral) before adoption. Swapping this text into
> `src/pages/PrivacyPage.tsx` is a HIGH-RISK, PROPOSE-ONLY change under the charter and
> requires Phil's `APPROVED` mark in `AUDIT_LOG.md`.
>
> **Placeholders that MUST be resolved before adoption (standing blockers):**
> - `[LLC LEGAL NAME]` — exact Georgia LLC legal name (verify at ecorp.sos.ga.gov)
> - `[PRIVACY_EMAIL]` — one canonical, monitored privacy contact (recommend
>   `privacy@philsfinancials.com`); currently inconsistent
>   (`philliphead@philsfinancials.com` vs `phillipghead@gmail.com`)
> - `[MAILING ADDRESS]` — LLC mailing address (COPPA direct-notice element)
> - `[EFFECTIVE DATE]` — date of adoption
> - OpenAI/Perplexity mentions depend on the PC-4 decommission decision (see §6 note)

---

# Privacy Policy

**Effective date: [EFFECTIVE DATE]**

Phil's Financials is operated by **[LLC LEGAL NAME]**, a Georgia limited liability company
("Phil's Financials," "we," "us"). This Privacy Policy explains what information we
collect through the Phil's Financials app and website (the "App"), how we use it, and the
choices you and your family have. The App is a financial-literacy learning tool for
students ages 13–18, offered through partner schools and youth programs.

If you have any questions, contact us at **[PRIVACY_EMAIL]** or by mail at
**[MAILING ADDRESS]**.

## 1. Information We Collect

**Account information.** When you create an account we collect your email address, an
optional username, a password (stored only in securely hashed form), and the access code
that links your account to the school or partner program that invited you (for example,
First Tee of Metro Atlanta or Atlanta PAL). We also record your confirmation that you are
13 or older.

**Learning activity.** To power your dashboard and personalize your experience, we collect
data about how you use the App: lessons completed, quiz answers and mastery, XP and coins
earned, game progress (including Bamboo Empire), streaks, time spent learning, which
short videos you watch and how much of them, and your answers to the optional interest
survey (your goals and interests — we do not ask about your family's income or finances).

**Resume Builder (optional).** If you choose to use the Resume Builder, we store the
resume details you enter — such as your name, contact information, education, and
experience — in your private account so you can keep editing them. You control this
content and can delete it at any time.

**Ask Phil questions.** When you ask Phil the panda a question, we count how many
questions you ask each day (to apply a daily limit), but we do not keep a stored history
of your conversation content on our servers. See Section 6 for how AI providers process
your messages.

**Microphone (interview practice, optional).** The interview-practice recorder uses your
device microphone only if you choose to use it. **Recordings stay on your device** for
your own playback and are never uploaded to our servers. Deleting them in the App removes
them from your device.

**What we do NOT collect.** We do not collect precise location, contacts, photos,
advertising identifiers, or browsing history. The App contains no advertising or social
media SDKs and does not track you across other apps or websites.

## 2. How We Use Information

We use the information above only to: (a) provide, maintain, and improve the App;
(b) track your learning progress and personalize your learning experience; (c) apply
usage limits and keep the App secure; (d) let your partner program know, in aggregate,
how its cohort is doing (see Section 4); and (e) communicate with you about your account.

**We do not use your information for targeted advertising. We do not sell your personal
information. We do not build profiles of students for any purpose other than the
educational purposes described in this policy.**

## 3. Data Storage and Security

Your data is stored with Supabase, our cloud database provider, protected by row-level
security so that each student account can access only its own records. We use encryption
in transit, hashed passwords, and access controls, and we limit the personal information
we collect to what the App actually needs. No system is perfectly secure, but we maintain
reasonable security procedures and practices appropriate to the nature of the information
we hold, as required by Georgia law.

If we ever discover a breach of security affecting your unencrypted personal information,
we will notify affected users (and, for school deployments, the school or district)
without unreasonable delay, consistent with O.C.G.A. § 10-1-910 et seq. and the terms of
our school agreements.

## 4. Information Sharing

We do not sell, trade, or rent personal information. We share information only with:

- **Service providers (subprocessors)** who help us run the App and are bound to use the
  data only to provide their service to us: Supabase (database and authentication) and
  Google (Gemini API, for the AI features described in Section 6).
- **Your school or partner program**, which may receive aggregate or cohort-level
  learning-progress information for its educational program. Access codes link accounts
  to the distributing partner.
- **Legal requirements:** we may disclose information when required by law, or to protect
  the rights, safety, or property of our users or others.

We may share aggregate, de-identified statistics (such as overall usage numbers) that do
not identify any individual.

## 5. Children's Privacy and Parents' Rights

The App is intended for users **13 years of age and older**. We do not knowingly collect
personal information from children under 13, and we will promptly delete any such
information we discover.

**Parents and guardians of users under 18** may contact us at **[PRIVACY_EMAIL]** to:

- review the personal information we hold about their child;
- request that it be corrected or deleted; or
- withdraw the child's access to the App.

We respond to verified parental requests within 30 days. When the App is used through a
school or partner program, the school or program may also authorize collection and direct
deletion on families' behalf, as described in Section 7.

## 6. AI Features (Ask Phil and Resume Feedback)

The "Ask Phil" tutor and the resume feedback feature send the text you type (your
question, or the resume bullet being checked) to our AI service provider, **Google
(Gemini API)**, to generate a response. We send only the text needed to answer — not your
name, email, or account details. We store a daily count of questions asked, not the
content of your conversations.

<!-- ATTORNEY/OPS PRE-CONDITION (PC-16): confirm the Gemini API project is on the paid
tier with no-training data-use terms before adopting the next sentence. If PC-4
(decommission of the legacy phil-chat-openai and phil-chat functions) is NOT applied
first, OpenAI and Perplexity must be added to this section and to Section 4. -->
Under our provider agreements, your messages may not be used to train the provider's
models.

Please do not include personal information (yours or anyone else's) in messages to Ask
Phil or in text you submit for feedback.

## 7. School and Program Partners (FERPA)

When Phil's Financials is used through a school district or youth program, we act as a
**"school official" with a legitimate educational interest** under FERPA
(34 C.F.R. § 99.31(a)(1)), operating under the direct control of the school with respect
to education records. In these settings we:

- use student data solely to provide the App for the school's educational purposes;
- do not use student data for targeted advertising;
- do not sell student data or use it to build profiles for non-educational purposes;
- maintain reasonable security practices designed to protect student data;
- delete or de-identify student data at the direction of the school or district,
  including cohort-level deletion identified by partner access code; and
- support the school in responding to parents' requests to inspect and review their
  child's records.

These commitments also reflect Georgia's Student Data Privacy, Accessibility, and
Transparency Act (O.C.G.A. § 20-2-660 et seq.).

## 8. Data Retention and Deletion

We retain personal information **only while your account is active** and only as long as
needed for the educational purposes described in this policy — never indefinitely.

You may delete your account at any time in **Profile → Delete Account**. Deletion is
**immediate and permanent**: your account and associated personal data are removed from
our systems right away, and residual copies in encrypted backups are purged on our backup
provider's rotation schedule, within 30 days.

Parents, guardians, and partner schools may also request deletion by contacting
**[PRIVACY_EMAIL]**. Learning-progress data that is no longer needed is deleted or
de-identified.

## 9. Cookies and Local Storage

The App uses local storage on your device to save preferences (such as theme settings)
and session data. This data stays on your device and is not transmitted to our servers
unless it is part of your account data described above. We do not use third-party
advertising or analytics cookies.

## 10. Your Rights

You have the right to access, correct, or delete your personal information (Sections 5
and 8). If you believe we hold information about you in error, contact us at
**[PRIVACY_EMAIL]** and we will investigate and respond within 30 days.

## 11. Changes to This Policy

We may update this Privacy Policy from time to time. We will post the updated policy in
the App with a new effective date and, for material changes affecting how we handle
student data, we will notify users (and partner schools, where applicable) before the
changes take effect.

## 12. Contact Us

**[LLC LEGAL NAME]**
[MAILING ADDRESS]
**[PRIVACY_EMAIL]**

---

## Drafting notes (not part of the policy — for Phil and the privacy attorney)

| Policy § | Source finding / proposal | Statutory hook | Attorney check |
|---|---|---|---|
| Header, §12 | F-04, PC-5, PC-9 | COPPA direct-notice operator identity (16 C.F.R. § 312.4) | Entity name, address, email — **BLOCKED on Phil** |
| §1 | F-05, F-06, F-11, PC-6, PC-12 | COPPA/FTC Act §5 accuracy | Resume PII + access-code linkage now disclosed |
| §2, §7 | F-03, PC-3 | O.C.G.A. § 20-2-661 operator duties; 34 C.F.R. § 99.31(a)(1) | Confirm school-official framing vs district DPA language (SDPC NDPA) |
| §3 | G2 | O.C.G.A. § 10-1-910 et seq.; NY SHIELD if NY users | Breach-notification wording |
| §5 | F-02, PC-2 | COPPA §312.6 parental rights model; 2025 COPPA amendments | Posture decision: strict 13+ vs school consent for under-13 |
| §6 | F-01, PC-1, PC-4 | Direct-notice accuracy; vendor DPA status | **PRE-CONDITION PC-16:** Gemini paid tier/no-training; drop or add OpenAI + Perplexity per PC-4 outcome |
| §8 | F-07, C3, PC-7 | 2025 COPPA amendments written-retention requirement | Applicability to a 13+ service — NEEDS ATTORNEY VERIFICATION |
| §9 | D11 | — | localStorage inventory verified 2026-07-02 |
| Whole doc | Sequencing rule | June-9 plan: rewrite LAST | Adoption also requires Safe Harbor decision (C4) and NY CDPA analysis (N1) |

Not addressed in this draft (deliberately): Terms of Service rewrite (separate doc,
PC-5/PC-8), Apple App Privacy labels (PC-10), age-screen redesign (PC-11).
