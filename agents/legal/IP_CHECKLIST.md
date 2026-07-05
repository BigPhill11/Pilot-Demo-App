# IP Protection Checklist — Part 1 of the Compliance Plan

> **DISCLAIMER:** Compliance research support prepared by an AI agent. **Not legal advice.**
> Filing decisions and classifications should be confirmed with counsel (Brian, USPTO
> attorney, offered guidance on the June 9, 2026 call).

Status key: `NOT STARTED` · `IN PROGRESS` · `BLOCKED (needs Phil/counsel)` · `FILED` · `DONE`
Last updated: **2026-07-05**. Open risk from the plan: **nothing is filed yet** while an
APS partnership is actively being pursued.

---

## 1. Federal trademark — "Phil's Financials" (HIGHEST PRIORITY)

**Status:** IN PROGRESS (clearance-search protocol documented 2026-07-05; searches not
yet run) · **Owner:** Phil (with trademark counsel — Brian can advise)

- [ ] **Clearance search first.** USPTO trademark search (successor to TESS):
      https://tmsearch.uspto.gov — search "Phil's Financials," "Phils Financials,"
      phonetic variants, and design elements (panda + finance). Also plain-web and app
      store search for common-law conflicts.
      **→ Documented search protocol (agent, 2026-07-05) — run these in the expert-mode
      search box, record hit counts + serial numbers of anything close:**
      1. Exact/near-exact word mark:
         - `CM:"phil's financials"` and `CM:"phils financials"`
      2. Dominant-element + phonetic sweep (catches PHIL/PHILL/FIL variants near finance
         terms):
         - `CM:/[pf]h?il'?s?/ AND CM:/financ/`
         - `CM:*phil* AND CM:*financ*`
      3. Same-name-different-format (surname/nickname conflicts in finance):
         - `CM:*phil* AND (IC:009 OR IC:036 OR IC:041 OR IC:042)`
      4. Class-restricted repeats of 1–2 with live-status filter:
         - append `AND (IC:009 OR IC:041 OR IC:042) AND LD:true`
         - also sweep **IC 036** (financial services) — likelihood-of-confusion risk
           source even though we won't file in it.
      5. Secondary mark (only if pursued): `CM:"bamboo empire"` and
         `CM:*bamboo* AND (IC:009 OR IC:041 OR IC:042) AND LD:true`
      6. Design-mark sweep for the panda logo (if filing the logo): design search codes
         **03.01.14 (pandas)** — query `DC:030114 AND LD:true`, then narrow with
         `AND (IC:009 OR IC:041 OR IC:042)`; also review 03.01.08 (bears) as pandas are
         sometimes miscoded.
      7. Common-law layer: Google/Bing `"phil's financials"`, Apple App Store + Google
         Play search for "phil financial", GA Secretary of State business search, and
         domain/social-handle checks.
      **Evidence:** save each query string, date, hit count, and screenshots of any close
      hits to `agents/legal/evidence/trademark/clearance/` (create when first artifact
      exists; repo-visibility blocker applies — see §5). Syntax note: field tags
      (`CM` = combined mark, `IC` = international class, `LD` = live/dead, `DC` = design
      code) per USPTO search help — verify tags against current UI before relying on
      results. **NOT LEGAL ADVICE; counsel interprets results.**
- [ ] **Decide marks to file:** (a) word mark `PHIL'S FINANCIALS`; (b) consider the panda
      logo as a separate design mark; (c) consider `BAMBOO EMPIRE` as a secondary mark if
      it becomes consumer-facing branding.
- [ ] **Classes (confirm with counsel):**
      - IC 009 — downloadable mobile educational software
      - IC 041 — education services; providing online instruction in financial literacy
      - IC 042 — SaaS featuring financial-education software
- [ ] **File via USPTO TEAS:** https://www.uspto.gov/trademarks/apply — base application
      fee **$350/class** (post-Jan 2025 fee structure; surcharges apply for custom
      identification text or insufficient info — using Trademark ID Manual descriptions
      avoids surcharges).
- [ ] Basis: likely **1(a) use in commerce** (app live with First Tee / PAL cohorts) —
      confirm first-use dates; else 1(b) intent-to-use.
- [ ] **Specimen:** App Store listing screenshot showing the mark with the goods/services.
- **Evidence to store once filed** (create `agents/legal/evidence/trademark/`): serial
  number, filing receipt PDF, specimen files, first-use evidence (dated App Store listing,
  partner emails), all USPTO office-action correspondence, registration certificate.

## 2. Patent landscape — "gamified financial decisions → virtual kingdom" (Bamboo Empire)

**Status:** NOT STARTED · **Owner:** Legal agent can draft the search; counsel interprets

- [ ] **Google Patents search:** https://patents.google.com — suggested queries:
      - `("financial literacy" OR "financial education") AND (game OR gamified) AND ("virtual world" OR "virtual city" OR kingdom OR empire)`
      - `"virtual currency" education simulation reward CPC:G09B19/18` (education re
        finance/economics), also CPC `A63F13/00` (video games), `G06Q40/00` (finance)
      - Known landscape neighbors to review: educational-sim patents by large edtech and
        game publishers (city-builder + learning-reward loops).
- [ ] **Purpose (per Brian):** freedom-to-operate awareness + decide whether the mechanic
      is worth a provisional application. Note: pure game rules/abstract ideas face §101
      hurdles (Alice) — counsel call.
- [ ] Document results in `AUDIT_LOG.md`; store PDFs of closest references in
      `agents/legal/evidence/patent-search/`.
- [ ] Decision gate with counsel: provisional patent ($65–$130 micro/small entity USPTO
      fee) vs trade-secret + copyright posture.

## 3. Copyright registration — interface design + marketing materials (parallel with TM)

**Status:** NOT STARTED · **Owner:** Phil (self-file is feasible; counsel review helpful)

- [ ] Register via the U.S. Copyright Office eCO portal: https://www.copyright.gov/registration/
      — Standard Application **$65** (or Single Application $45 where eligible, one author/
      one work).
- [ ] **Works to register (discuss bundling with counsel):**
      1. App UI as a visual/audiovisual work — deposit: curated screenshots of key screens
         (onboarding, Learn, Bamboo Empire, dashboard, Ask Phil).
      2. Phil the Panda character art + logo (visual arts).
      3. Marketing materials (site copy, pitch/one-pagers) — possibly as a group.
      4. **Optional but valuable:** source code as a literary work (deposit can redact
         trade secrets under Circular 61).
      5. Lesson content/curriculum (literary works) — large and original; strong
         candidate.
- [ ] Confirm **work-for-hire / assignment chain**: any contractor- or AI-generated art
      needs documented rights; AI-generated material has registration limits (Copyright
      Office guidance) — inventory which assets are human-authored. **BLOCKED question
      for Phil:** who created the panda art and comic panels?
- **Evidence to store** (`agents/legal/evidence/copyright/`): case numbers, deposit
  copies exactly as submitted, effective-date receipts, certificates.

## 4. Georgia LLC reporting compliance

**Status:** NOT STARTED (verify current standing) · **Owner:** Phil

- [ ] Confirm the LLC's exact legal name + control number: https://ecorp.sos.ga.gov
      (Business Search). The legal name must then be used in the Privacy Policy, Terms,
      APS paperwork, and USPTO filings.
- [ ] **Annual registration:** due **January 1 – April 1** each year, $50 online via
      eCorp. Verify 2026 registration was filed; calendar 2027.
- [ ] Confirm registered agent info is current; check good-standing status (districts run
      this check during procurement).
- [ ] Consider: does the LLC own the IP? If code/art was created before the LLC existed
      or personally, execute an **assignment to the LLC** before trademark/copyright
      filings name the LLC as owner. **NEEDS ATTORNEY.**
- **Evidence to store** (`agents/legal/evidence/llc/`): certificate of organization,
  annual-registration receipts, certificate of existence (order fresh one before APS
  procurement).

## 5. Cross-cutting

- [ ] Create `agents/legal/evidence/` tree when the first artifact exists (don't commit
      sensitive documents to a public repo — confirm repo visibility first. **BLOCKED:
      ask Phil** whether this repo is private).
- [ ] Terms §6 (`src/pages/TermsPage.tsx:57-60`) claims IP is "the exclusive property of
      Phil's Financials" — replace with the LLC's legal name once confirmed (see proposed
      change PC-8 in `AUDIT_LOG.md`).
- [ ] Once the trademark application is filed, add ™ (pre-registration) usage guidance to
      marketing; ® only after registration.
