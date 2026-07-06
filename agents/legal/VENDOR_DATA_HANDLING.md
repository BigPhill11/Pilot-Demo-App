# Vendor Data-Handling Verification — Phil's Financials

> **DISCLAIMER:** Compliance research support prepared by an AI agent. **Not legal advice**
> and no attorney–client relationship. Verify with counsel (the privacy attorney Brian
> recommended) and with an operator who has console access before relying on any
> conclusion for the APS procurement process. Items marked **NEEDS ATTORNEY VERIFICATION**
> or **NEEDS OPS CONFIRMATION** are not settled by this memo.

Created: **2026-07-06** (legal agent, executing **PC-16** and gate (b) of **PC-18**).
This memo is the working record for the vendor-DPA evidence pack. It replaces the need to
re-derive vendor terms each run; update it in place as evidence is captured (living
document — the append-only trail lives in `AUDIT_LOG.md`).

---

## 0. Why this memo exists

Two — and, after PC-17, only two — third parties can receive **student personal data**:

| Vendor | What student data reaches it | Where in code | Endpoint / product |
|---|---|---|---|
| **Google (Gemini Developer API)** | Free-text tutor questions; resume bullet text + role context | `supabase/functions/AskPhil/index.ts:145-160`; `supabase/functions/resume-bullet-check/index.ts:80-88` | `https://generativelanguage.googleapis.com/v1beta/openai/chat/completions`, model `gemini-2.5-flash`, auth via `GEMINI_API_KEY` |
| **Supabase** | All account + learning-analytics data (email, username, access code, progress, resume drafts JSONB) | Everywhere; `src/integrations/supabase/client.ts` | Managed Postgres + Auth + Edge Functions, project `qssqbpllqkorfjcxgomh` |

Market-data vendors (FRED, Marketstack, news APIs) and the admin video pipeline
(AssemblyAI / OpenAI transcription) do **not** receive student data (confirmed 2026-07-02
audit + F-14). OpenAI and Perplexity student-chat paths were removed by PC-17 (repo side).

**The single most important unresolved fact** is whether the Google Cloud project behind
`GEMINI_API_KEY` is on the **paid (Cloud Billing enabled)** tier or the **unpaid** tier.
That one bit determines whether minors' free text is being used to train/improve Google
products and read by human reviewers. It is a **NEEDS OPS CONFIRMATION** item and it gates
the accuracy of PC-1 / DRAFT_privacy_policy §6.

---

## 1. Google — Gemini Developer API (`generativelanguage.googleapis.com`)

**Product identification (verified in code):** this is the **Gemini Developer API** (a.k.a.
Generative Language API / Google AI Studio API), **not** Vertex AI on Google Cloud. This
matters because the two products have different contracts and different default data
governance. The Developer API's data use is governed by the **Gemini API Additional Terms
of Service** (https://ai.google.dev/gemini-api/terms), which split sharply by billing tier.

### 1a. Unpaid tier — NOT acceptable for a minors' service

Per the Additional Terms (verbatim, retrieved 2026-07-06):

- "Google uses the content you submit to the Services and any generated responses to
  provide, improve, and develop Google products and services" including "machine learning
  technologies."
- "To help with quality and improve our products, human reviewers may read, annotate, and
  process your API input and output." Google states it disconnects this data "from your
  Google Account, API key, and Cloud project" before review.

**Legal read (not advice):** if the project is unpaid, students' free-text questions and
resume bullets are (a) used to develop Google products and (b) subject to human review.
For a service aimed at minors 13–18 and pursued for a school pilot, that is inconsistent
with COPPA data-minimization expectations, the FERPA "school official"/direct-control
posture (PC-3 / DRAFT §7), and O.C.G.A. § 20-2-661's no-non-educational-use duty. It also
makes the DRAFT §6 sentence "these providers may not use your messages to train their
models" **false** — do not ship PC-1/PC-18 §6 while unpaid.

### 1b. Paid tier (Cloud Billing enabled) — the required posture

Per the same Additional Terms (verbatim):

- "Google doesn't use your prompts … or responses to improve our products, and will
  process your prompts and responses in accordance with the Data Processing Addendum for
  Products Where Google is a Data Processor."
- Human review for product improvement does **not** apply to Paid Services.
- Abuse-monitoring logging still applies (see 1c).

This is the tier the privacy policy language assumes. **Confirming it is a precondition to
PC-1 and to DRAFT_privacy_policy §6 (PC-18 gate (b)).**

### 1c. Abuse monitoring — applies even on the paid tier

Per the Gemini API abuse-monitoring policy (https://ai.google.dev/gemini-api/docs/usage-policies,
retrieved 2026-07-06):

- Google "retains … data for fifty-five (55) days for the purposes of detecting and
  preventing violations of the Prohibited Use Policy."
- Authorized Google employees can access flagged content through an internal governance
  platform to confirm/correct safety classifications.
- That logged data "is not used to train or fine-tune any AI/ML models besides those used
  specifically for policy enforcement."

**Implication:** even on the paid tier, prompts/responses are retained up to 55 days for
policy enforcement and a subset (flagged content) can be human-reviewed for safety. The
privacy policy should not over-promise "we/they don't keep your messages." DRAFT §6's "we
store a daily count of questions asked, not the content" is accurate about *our* systems
(the `ask_phil_try_consume` RPC logs a count, not content); it should not be read to deny
Google's transient abuse-monitoring retention.

### 1d. Zero Data Retention (ZDR) — strongest posture, recommended to pursue

Per https://ai.google.dev/gemini-api/docs/zdr (retrieved 2026-07-06):

- ZDR applies to **Paid Services** and is granted per project on approval.
- "When your request for ZDR for a particular project is approved," all user content
  (prompts and responses) and identifiable metadata (IP addresses, Google Account IDs)
  "are cleared prior to logging" — i.e., the 55-day abuse-monitoring content retention no
  longer stores identifiable prompt/response content.

**Recommendation (for counsel + ops):** for a minors' service headed into district
procurement, request ZDR on the Gemini project once it is on the paid tier. A ZDR
attestation is a strong, cheap procurement artifact and lets the policy make a cleaner
statement about non-retention. Note: some surfaces need an explicit flag (e.g., the
Interactions API `store: false`); our functions use the stateless
`chat/completions`-style endpoint, so no per-request state is stored by us, but confirm
ZDR scope covers this endpoint at approval time.

### 1e. Regional note (informational)

For users in the EEA/Switzerland/UK, Google applies the Paid-Services data terms to all
services (including unpaid quota). This does **not** help a US-based project on the unpaid
tier for US users — do not rely on it.

### 1f. Google — action items

- [ ] **NEEDS OPS CONFIRMATION (P0):** Is the Cloud project for `GEMINI_API_KEY` on the
      paid/Cloud-Billing tier? Screenshot the billing status + the project's API dashboard.
- [ ] **NEEDS OPS CONFIRMATION (P0):** Confirm the Data Processing Addendum for Products
      Where Google is a Data Processor is in force for the project (accept/verify in Cloud
      console); archive the accepted DPA / terms record.
- [ ] **RECOMMENDED (P1):** Submit a ZDR request for the project; archive the approval.
- [ ] Store all of the above under `agents/legal/evidence/dpas/google/` (blocked on the
      repo-visibility question — see `IP_CHECKLIST.md` §5).

---

## 2. Supabase (account + analytics data processor)

Governed by the **Supabase Data Processing Addendum** (https://supabase.com/legal/dpa).
Findings (web layer, 2026-07-06 — confirm against the signed document):

- **DPA availability:** Supabase publishes a static DPA; to make it binding a customer
  signs/completes it via the PandaDoc link Supabase provides. → **NEEDS OPS:** execute and
  archive the signed DPA.
- **Data residency:** each project is deployed to the region chosen at creation and data
  "will remain within the chosen region." → **NEEDS OPS CONFIRMATION:** capture the region
  of project `qssqbpllqkorfjcxgomh`; for a US student service it should be a US region.
- **International-transfer terms:** the DPA incorporates EU Standard Contractual Clauses
  and the UK addendum (relevant only if EU/UK data or subprocessing is in play).
- **Security attestation:** Supabase is **SOC 2 Type 2** and assessed annually
  (https://supabase.com/docs/guides/security/soc-2-compliance) — a usable procurement
  artifact; request the current SOC 2 report under NDA.
- **Subprocessors:** the DPA lists subprocessors (AWS for infrastructure, etc.). → **NEEDS
  OPS:** capture the current subprocessor list as of the evidence date; note that Gemini is
  **not** a Supabase subprocessor — it is our own separate processor reached from the edge
  function, so it must be disclosed independently (it is, in DRAFT §6).

### 2a. Supabase — action items

- [ ] Execute + archive the signed Supabase DPA (`agents/legal/evidence/dpas/supabase/`).
- [ ] Record the project region + confirm US residency.
- [ ] Obtain the current SOC 2 Type 2 report (under NDA) and the subprocessor list.

---

## 3. How this conditions the policy text (PC-1 / PC-18 §6)

| Confirmed state | §6 AI-disclosure language that is accurate |
|---|---|
| Paid tier confirmed, ZDR **not** enabled | "We send your text to Google's Gemini API. Under our paid-tier agreement, Google does not use your messages to train or improve its products. Google may keep messages briefly (up to ~55 days) only to detect misuse." |
| Paid tier confirmed, ZDR **enabled** | Above, plus: "Google does not retain the content of your messages after generating a response, except as needed to prevent abuse." (confirm exact ZDR scope) |
| Unpaid tier | **Do not ship** the "does not train" language. Either move to paid tier first, or disclose that a third-party AI provider may use messages to improve its products and may have them human-reviewed — which is likely unacceptable for this audience; escalate to counsel before any launch/pilot. |

DRAFT_privacy_policy §6 currently assumes the **paid tier**; it is safe to adopt **only
after** the box above is confirmed. This is exactly PC-18 gate (b).

---

## 4. Summary of open items feeding the ledger

- **PC-16 (P0, ops):** status advanced from OPEN to **RESEARCH COMPLETE — awaiting ops
  confirmation.** The two vendor contracts and the decisive questions are now documented;
  what remains is console evidence (billing tier, DPAs, region, ZDR) that only Phil/ops can
  pull. Feeds PC-1 and PC-18 gate (b).
- **PC-18 gate (b):** cannot clear until the Gemini paid-tier bit is confirmed (§1f).
- Evidence-folder creation still blocked on the repo-visibility question.

*Not legal advice. Sources: ai.google.dev/gemini-api/terms; ai.google.dev/gemini-api/docs/usage-policies;
ai.google.dev/gemini-api/docs/zdr; supabase.com/legal/dpa; supabase.com/docs/guides/security/soc-2-compliance
(all retrieved 2026-07-06).*
