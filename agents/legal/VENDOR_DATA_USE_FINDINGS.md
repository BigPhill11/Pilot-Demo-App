# Vendor Data-Use & DPA Verification — Phil's Financials (PC-16)

> **DISCLAIMER:** Compliance research support prepared by an AI agent. **Not legal advice**
> and no attorney–client relationship. Vendor terms change; every citation below must be
> re-checked against the live page and validated by the privacy attorney (Brian's referral)
> before reliance or any APS procurement representation. Items needing a human with account
> access are marked **OPS**; items needing a lawyer are marked **NEEDS ATTORNEY**.

Prepared: **2026-07-05 (Run 4)** · Owner: Phil (+ ops for account checks, counsel for review)
Executes queue item **PC-16** (vendor DPA evidence pack) and feeds the PC-18 §6 AI
disclosure and the DRAFT privacy policy.

---

## 0. TL;DR — the one question that decides everything

Both remaining student-facing AI features call the **Gemini Developer API**
(`generativelanguage.googleapis.com`) with the `GEMINI_API_KEY` secret:

| Feature | File | Data sent to Google | Model |
|---|---|---|---|
| Ask Phil tutor | `supabase/functions/AskPhil/index.ts:90,145,153` | student's free-text question | `gemini-2.5-flash` |
| Resume bullet feedback | `supabase/functions/resume-bullet-check/index.ts:56,80,88` | student's resume bullet text (may contain name/PII) | `gemini-2.5-flash` |

Under Google's own terms, whether this is compliant reduces to a **single binary**:

> **Is Google Cloud billing enabled on the project that issued `GEMINI_API_KEY`?**
> - **YES → "Paid Services":** Google does **not** use prompts/responses to train or improve
>   its products; the Google Cloud DPA governs; no human review for product improvement.
>   ✅ Compatible with the minors'-service posture (once the DPA is executed).
> - **NO → "Unpaid Services" (free AI Studio key):** Google **uses** the submitted content
>   "to provide, improve, and develop Google products and services and machine learning
>   technologies," **human reviewers may read it,** and Google's terms say *"Do not submit …
>   personal information to the Unpaid Services."* ❌ **P0 defect** for a service used by
>   minors whose policy promises no such use.

**This is the highest-leverage open compliance fact in the audit.** It cannot be resolved
from the repo (an API key string reveals nothing about billing status). **OPS action for
Phil is in §4.**

---

## 1. Google Gemini Developer API — primary-source terms

**Endpoint in use:** `https://generativelanguage.googleapis.com/v1beta/openai/chat/completions`.
This is the **Gemini Developer API** (Google AI), accessed through its OpenAI-compatibility
shim. **No OpenAI vendor is involved** — the `/openai/` path segment is only a request-format
compatibility layer; the request goes to Google and is governed by the **Gemini API
Additional Terms of Service** (https://ai.google.dev/gemini-api/terms). (Contrast: Vertex AI
on `*.googleapis.com/.../locations/...` would be governed by the Google Cloud Platform terms
with region controls — **not** what this app uses.)

Verbatim distinctions (Gemini API Additional Terms, "How Google Uses Your Data", retrieved
2026-07-05 — **verify against live page**):

| Dimension | **Unpaid Services** (free tier) | **Paid Services** (billing enabled) |
|---|---|---|
| Training / product improvement | "Google uses the content you submit … and any generated responses **to provide, improve, and develop Google products and services and machine learning technologies.**" | "Google **doesn't use your prompts … or responses to improve our products.**" |
| Human review | "**Human reviewers may read, annotate, and process** your API input and output." (Google states it disconnects the data from your account/API key/project first.) | No human review for improvement; review limited to safety/abuse/legal. |
| Retention | Retained for product improvement (privacy protections applied). | "Google logs prompts and responses for a **limited period of time, solely for** detecting and preventing violations / legal compliance." |
| Personal-info warning | "**Do not submit sensitive, confidential, or personal information to the Unpaid Services.**" | (No such prohibition — DPA governs.) |
| DPA | Standard privacy policy; DPA applies to EEA/UK/CH regardless. | "Google will process your prompts and responses **in accordance with the Data Processing Addendum for Products Where Google is a Data Processor.**" |

**Regional note:** for users in the EEA/UK/Switzerland, Google applies the paid-tier data
terms even on free tiers. Phil's users are US (GA); **the US free tier gets the unpaid
treatment above** — so US minors' text on a free key is the worst case.

**Legal exposure if the key is unpaid (free tier):**
- **FTC Act § 5 / COPPA § 312 direct-notice accuracy:** the current policy and the DRAFT §6
  both state (or will state) that providers may not train on messages — **false** on the free
  tier → deception risk on a service used by minors.
- **Google's own instruction not to submit personal information** is violated every time a
  student types a name into Ask Phil or a resume bullet — squarely the population COPPA/FERPA
  protect.
- **O.C.G.A. § 20-2-661** (GA Student Data Privacy Act) operator duties: no use of student
  data for non-educational purposes / product development, and reasonable security — the
  free-tier "improve our products + human review" flow is inconsistent with these.

**Verdict:** The AI features are only defensible if `GEMINI_API_KEY` is on a **billing-enabled
(paid) project** AND the Google Cloud DPA is executed. If it is on a free key, treat as **P0**:
switch to a paid/billed key immediately or disable Ask Phil + resume-bullet-check until fixed.

## 2. Perplexity AI — corrected scope (see AUDIT_LOG F-19/F-20)

`phil-chat` (the student-facing Perplexity path) was removed in PC-17. **However**,
`supabase/functions/market-headlines/index.ts:51-92,382` still calls
`https://api.perplexity.ai/chat/completions` (models `sonar-pro` / `sonar-medium` /
`sonar-small`) using `PERPLEXITY_API_KEY`.

- **Data sent:** a fixed "financial news assistant" system prompt + the current **date** +
  a **`userLevel` enum** (e.g., "intermediate"/"advanced"). **No student PII, no student
  free-text, no identifiers** are sent. It generates generic market-news copy.
- **Consequence 1 (OPS SAFETY):** PC-17 ops item #6 said to delete `PERPLEXITY_API_KEY` and
  revoke the key "no other consumer in repo." **That premise is wrong — doing so BREAKS
  `market-headlines` in production.** See the correction in the AUDIT_LOG Run 4 entry;
  **do not revoke the Perplexity key.**
- **Consequence 2 (INVENTORY):** Perplexity remains a **live third-party AI subprocessor** of
  the service. Sensitivity is **low** (no PII), but it belongs in the subprocessor list and,
  if counsel wants belt-and-suspenders, in a DPA/terms review. Perplexity API business terms
  state API data is not used to train models — **verify** at the live Perplexity terms page.

## 3. Supabase — data processor for ALL account + learning data

Supabase stores every account and analytics record (see PRIVACY_POLICY_FINDINGS §1).

- **DPA:** Supabase provides a DPA; per https://supabase.com/legal/dpa it becomes binding by
  requesting the version from the **dashboard → legal documents** and executing it via the
  **PandaDoc** flow. A static PDF is published for review
  (https://supabase.com/downloads/docs/Supabase+DPA+250314.pdf — **check for a newer date**).
- **Certifications referenced:** **SOC 2 Type 2**, **HIPAA**, **ISO 27001** (SOC 2 report
  access requires the Team plan; https://supabase.com/docs/guides/security/soc-2-compliance).
- **Subprocessors / data region:** the DPA landing page does **not** enumerate subprocessors
  or region options — pull the current **subprocessor list** (https://supabase.com/legal/subprocessors,
  verify) and confirm the **project's region** in the dashboard (Project Settings → General /
  Infrastructure). Document the region for procurement (districts ask where student data
  physically resides).

## 4. OPS action list for Phil (to close PC-16)

1. **[DECISIVE] Confirm the Gemini billing tier.** In Google AI Studio / Google Cloud console,
   open the project that owns `GEMINI_API_KEY` → confirm **Billing is enabled and the project
   is on a paid plan** (not the free AI Studio quota). Screenshot the billing status.
   - If **paid** → proceed to step 2. ✅
   - If **free/unpaid** → **P0**: create/enable a billed project, reissue the key, redeploy the
     `GEMINI_API_KEY` secret; until then treat Ask Phil + resume-bullet-check as non-compliant
     for minors. Then step 2.
2. **Execute the Google Cloud DPA** for "Products Where Google is a Data Processor"
   (https://cloud.google.com/terms/data-processing-addendum) and archive the countersigned PDF.
3. **Execute the Supabase DPA** via the dashboard PandaDoc flow; archive it; note the SOC 2 /
   ISO 27001 status and the **project data region**.
4. **Do NOT revoke `PERPLEXITY_API_KEY`** (needed by `market-headlines`). Undeploying the two
   removed functions (PC-17 ops items 5) is still correct; item 6 is **retracted** — see
   AUDIT_LOG Run 4.
5. Save all evidence under `agents/legal/evidence/dpas/` **once repo visibility is confirmed
   private** (standing blocker #4). If the repo is public, keep executed DPAs off-repo and
   store only a pointer/inventory here.

## 5. Effect on the privacy policy AI disclosure (PC-1 / DRAFT §6)

The DRAFT §6 line — *"Under our agreements, these providers may not use your messages to train
their models"* — is **accurate only in the PAID-tier + executed-DPA world.** Two ready variants:

- **If paid + DPA (target state):** keep the line; name **Google (Gemini API)** as the AI
  provider for Ask Phil and resume feedback; drop OpenAI/Perplexity from the *student-facing*
  AI disclosure (neither receives student text after PC-17). Optionally disclose Perplexity in
  the **subprocessor list** as the market-news generator that receives no personal data.
- **If still free-tier at publish time:** the line is false — **do not ship it.** Either fix
  the tier first, or temporarily state that AI features are limited and personal information
  must not be entered (and, ideally, disable them) until the tier is corrected.

**Subprocessor inventory (corrected, this run):** Supabase (all data) · Google/Gemini
(student free-text: Ask Phil, resume bullets) · Perplexity (market-news copy, **no PII**) ·
OpenAI (**admin video pipeline only**, no student data — F-14). AssemblyAI/FRED/Marketstack/
news APIs: no student data.

---

### Open items routed to the privacy attorney

1. Confirm the paid-tier Gemini terms are sufficient for a **minors'** ed service, or whether
   Vertex AI (with region controls + zero-data-retention amendment) is warranted before APS.
2. Whether the low-PII Perplexity `market-headlines` call needs its own DPA/disclosure.
3. Retention wording: even paid-tier Google logs prompts "for a limited period" for abuse
   detection — reconcile with the DRAFT retention section (2025 COPPA amendments).

*End of memo. Append future vendor-verification results below, dated, append-only.*
