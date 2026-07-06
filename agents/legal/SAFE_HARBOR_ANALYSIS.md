# COPPA Safe Harbor Program Analysis — Phil's Financials

> **DISCLAIMER:** Compliance research support prepared by an AI agent. **Not legal advice**
> and no attorney–client relationship. Program rosters, fees, and scope change; every
> figure and eligibility conclusion below is **NEEDS ATTORNEY VERIFICATION** and must be
> confirmed with the privacy attorney (Brian's referral) and directly with each program
> before Phil relies on it or represents it in APS procurement.

**Prepared:** 2026-07-06 (Run 1). **Advances:** `PRIVACY_POLICY_FINDINGS.md` §2 gap **C4**
(Safe Harbor program selection) and `AUDIT_LOG.md` attorney-item D.3. Directly addresses
**one of the four PC-18 gates** ("Safe Harbor + NY CDPA decisions settled") by making that
decision *ready to be made* — the decision itself is Phil's + counsel's.

---

## 0. The threshold question — do we even need a Safe Harbor seal?

A COPPA Safe Harbor is a **mechanism for demonstrating COPPA compliance**; COPPA
(16 C.F.R. Part 312) governs the online collection of personal information **from children
under 13**. Phil's Financials is a **strict 13+ service** (Terms §2; signup age
attestation). If that 13+ posture holds in fact, the app is largely **outside COPPA's
under-13 scope**, and a Safe Harbor seal is **not legally required.**

So the seal is a **strategic / procurement decision, not a compliance obligation** — *unless*
the COPPA-posture decision changes. Two things make it worth real consideration anyway:

1. **Under-13 exposure is realistic, not theoretical.** First Tee of Metro Atlanta and
   Atlanta PAL serve children well under 13, and `AskPhil/index.ts` even carries a
   "middle schooler" persona. If under-13 students end up enrolled (directly or via a
   partner cohort), COPPA's "actual knowledge" standard is triggered and the seal becomes
   materially protective. This is the same risk flagged in `PRIVACY_POLICY_FINDINGS.md`
   gap **C1** and proposed change **PC-11** (neutral age screen).
2. **Procurement signal.** For APS and youth-serving partners, a recognized third-party
   privacy seal is a fast, legible trust signal that shortens district security/privacy
   review. But note the nuance below: for a **school** buyer, a **FERPA / state
   student-data** certification is usually the *more* relevant signal than a COPPA seal.

**Bottom line:** the Safe Harbor decision is downstream of the **COPPA-posture decision**
(attorney item D.1: strict 13+ with a neutral age screen, vs. supporting under-13 use with
school/parental consent). That decision should be made *first*; this document lays out the
options so it can be.

---

## 1. Currently FTC-approved COPPA Safe Harbor programs (verify roster before relying)

Per FTC and secondary sources (below), there are **six currently active** FTC-approved
COPPA Safe Harbor programs (down from seven — Aristotle, Inc. withdrew in August 2021 after
FTC staff raised enforcement concerns):

| Program | Operator | Historical positioning |
|---|---|---|
| **iKeepSafe** | Internet Keep Safe Coalition | **Education / edtech.** Bundles COPPA + FERPA + multi-state student-privacy (CSPC). |
| **kidSAFE** | Samet Privacy, LLC | Kids' sites/apps/games; **tiered seals** (lighter-weight entry option). |
| **PRIVO** | Privacy Vaults Online, Inc. | Oldest (approved 2004); rigorous; strong **parental consent management (VPC)**. |
| **CARU** | BBB National Programs (Children's Advertising Review Unit) | Advertising-to-children focus. |
| **ESRB Privacy Certified** | Entertainment Software Rating Board | Games / interactive entertainment. |
| **TrustArc** (formerly TRUSTe) | TrustArc | General-purpose privacy compliance. |

> **VERIFY:** The FTC's official roster page (`ftc.gov/enforcement/coppa-safe-harbor-program`)
> returned HTTP 403 from this environment and could **not** be read directly. The six-program
> list above is from secondary/authoritative sources and must be confirmed against the live
> FTC page by Phil or a browser-enabled run before it is relied on or cited to APS. The
> 2025 COPPA amendments now require each program to **publicly post its current member list**
> (updated every six months) — those member pages are a second way to confirm a program is
> active and to see who else in edtech carries the seal.

---

## 2. Fit analysis for Phil's Financials (13–18 financial-literacy app, school pilots)

Our facts: minors 13–18; pursuing school/district (APS) and youth-org (First Tee, PAL)
deployment; free-text AI tutor (Gemini); learning analytics; resume-builder PII; **no ads,
no data sale, no trackers** (verified). The decisive dimension is **school procurement fit**,
which points at student-privacy scope, not just COPPA.

### Top recommendation — **iKeepSafe** (best fit *if* we pursue a seal)

- **Why it fits us best:** iKeepSafe is the education-focused program and certifies against
  the exact trifecta a school district cares about: **COPPA Safe Harbor + FERPA + California
  Student Privacy Certification (CSPC)**. iKeepSafe describes CSPC as having evolved to
  encompass "the most stringent student data privacy and security legislation across the
  U.S." — i.e., it functions as a **multi-state student-privacy** assessment, which maps
  directly onto our FERPA gaps (F1–F3), Georgia's O.C.G.A. § 20-2-660 et seq. operator
  duties (G1), and the New York student-privacy watch items (N1–N2).
- **Procurement value:** a single vendor badge answering COPPA **and** FERPA **and**
  state student-data expectations is the strongest possible artifact to hand APS legal —
  far more on-point for a *school* buyer than a COPPA-only seal. Public examples of edtech
  vendors carrying the iKeepSafe COPPA+FERPA+CSPC trifecta include ParentSquare, Promethean
  (ClassFlow), ManagedMethods, and others — useful precedent to show the pattern is standard
  for school-facing products.
- **Caveats:** the FERPA/CSPC assessments assume you can articulate the school-official
  relationship and district-directed deletion — which we do **not** yet have in policy
  (that is exactly PC-3 / DRAFT §7 and gap F1/F3). So iKeepSafe certification is gated on
  first landing the FERPA policy work. Fees are **not published** — request a quote.

### Budget-conscious alternative — **kidSAFE**

- kidSAFE explicitly offers a **tiered / "three-layered" seal structure** — a company can
  start modest and graduate to the full COPPA Safe Harbor audit later, acknowledging that
  "maturity, needs, and budget vary." For a Georgia LLC that has **filed nothing yet** and
  is pre-revenue-scale, this is the lowest-friction on-ramp to *a* recognized seal.
- **Trade-off:** kidSAFE is oriented to kids' apps/games generally; it is **not** the
  FERPA/state-student-privacy bundle. It signals COPPA credibility but does less of the
  school-procurement heavy lifting than iKeepSafe. Good if the near-term goal is a
  consumer/app-store trust seal; weaker if the near-term goal is APS.

### Higher-rigor / consent-heavy option — **PRIVO**

- PRIVO is the longest-tenured program (since 2004) and is built around **verifiable
  parental consent (VPC) management** — assess → identify → remediate → certify, with
  six-month and annual audits plus quarterly reviews.
- **When it wins:** if the COPPA-posture decision flips to **supporting under-13 users with
  verifiable parental consent** (rather than strict 13+), PRIVO's consent-management tooling
  becomes the most valuable, because we would then actually need to *operate* a VPC flow —
  which the app has **none of** today (gap C2). If we stay strict 13+, PRIVO's consent
  machinery is largely unused overhead.

### Poor fit for us — **CARU, ESRB, TrustArc**

- **CARU** centers on advertising directed to children — we run no ads, so most of its value
  surface doesn't apply. **ESRB** is games/interactive-entertainment oriented. **TrustArc**
  is a capable general-purpose privacy shop but not education-specialized. None delivers the
  FERPA/state-student-privacy story that a district buyer is actually asking for. Deprioritize
  unless a specific reason emerges.

---

## 3. Cost & timeline (UNVERIFIED — must request quotes)

- **None of the six programs publishes fees.** All require you to become a paying member and
  request a quote scoped to your product. The prior working estimate in
  `PRIVACY_POLICY_FINDINGS.md` C4 (**~$3k–$15k+/yr**) is an **unverified order-of-magnitude
  range**, not a quote — treat it as a planning placeholder only.
- **Timeline** is an assess → remediate → certify cycle with **ongoing** obligations
  (PRIVO: six-month + annual audits, quarterly reviews; all programs now file annual reports
  to the FTC and publish member lists). Budget for a recurring annual cost and staff time,
  not a one-time fee.
- **Sequencing reality:** a Safe Harbor assessment will *fail or stall* until the underlying
  policy/practice gaps are fixed — most of PC-2/PC-3/PC-6/PC-7 (parental rights, FERPA
  school-official language, full data inventory, retention schedule) and a written retention
  policy (2025 COPPA amendment). **Certification is the capstone, not the starting point.**

---

## 4. 2025 COPPA amendment interaction (timing)

The amended COPPA Rule (effective **June 23, 2025**; general compliance date **April 22,
2026**, now passed) imposed **new Safe Harbor-program obligations** with earlier deadlines:
programs had to **publicly post member lists** (by **July 21, 2025**, updated every six
months) and **submit reports to the FTC** (by **October 22, 2025**, then annually), including
disciplinary-action disclosures and triennial technology-capability updates. Practical
implication for us: (a) the programs are under heightened FTC scrutiny, so a seal is more
meaningful now; (b) if we join, **our product name becomes publicly listed** on the
program's member page — a small marketing plus and a transparency commitment to plan for.

---

## 5. Decision matrix (for Phil + counsel)

| If the COPPA-posture decision is… | Then, on Safe Harbor… |
|---|---|
| **Strict 13+, neutral age screen (PC-11)**, no under-13 use | Seal is **optional but high-value for procurement.** Recommend **iKeepSafe** for the COPPA+FERPA+CSPC bundle; **kidSAFE** if budget forces a lighter first step. Do it **after** the FERPA/retention policy work lands. |
| **Support under-13 via school/parental consent** | Seal becomes **much more important** (COPPA now squarely applies). **PRIVO** rises for consent-management depth; **iKeepSafe** still strong for the school bundle. Consider engaging *before* building the consent flow so the program guides the VPC design. |
| **Undecided / APS conversation imminent** | Interim: don't over-invest. Get **quotes from iKeepSafe + kidSAFE**, land the free policy fixes (DRAFT policy, PC-2/3/6/7), and let counsel decide posture first. A signed **district DPA** (SDPC National DPA + GA exhibit, attorney item D.6) may satisfy APS faster than a seal. |

---

## 6. Recommended next actions

1. **Counsel decides the COPPA posture first** (attorney item D.1). Everything here branches
   off it. *(Blocked on attorney.)*
2. **Request scoped quotes** from **iKeepSafe** (COPPA+FERPA+CSPC) and **kidSAFE** (tiered)
   so Phil has real numbers. *(Phil / ops — non-legal.)*
3. **Confirm the live FTC roster** at `ftc.gov/enforcement/coppa-safe-harbor-program` and
   note which edtech peers carry each seal (browser-enabled run or Phil).
4. **Do the free groundwork regardless:** land the DRAFT privacy policy's FERPA/parental-
   rights/retention sections (PC-2/PC-3/PC-6/PC-7 / PC-18) — these are prerequisites for
   *passing* any assessment and are valuable on their own.
5. **For the near-term APS conversation,** treat a **signed district DPA** (attorney item
   D.6) as the higher-priority artifact; position the seal as a follow-on credential.

---

## 7. For the privacy attorney (adds to `AUDIT_LOG.md` §D)

- Confirm whether a strict-13+ posture makes a COPPA Safe Harbor **unnecessary**, and whether
  the under-13 exposure (First Tee/PAL younger cohorts) is real enough to change that.
- If we pursue a seal, confirm **iKeepSafe** as the recommended program given the school
  focus, and whether its **FERPA/CSPC** certifications adequately cover **Georgia
  (O.C.G.A. § 20-2-660 et seq.)** and **New York (Ed Law 2-d, NY CDPA)** obligations, or
  whether a separate state analysis is still required.
- Advise on **seal vs. signed district DPA** priority for the APS timeline.

## Sources

- [FTC — COPPA Safe Harbor Program](https://www.ftc.gov/enforcement/coppa-safe-harbor-program) *(official roster; returned 403 from this environment — verify directly)*
- [FTC — Children's Privacy (business guidance)](https://www.ftc.gov/business-guidance/privacy-security/childrens-privacy)
- [Children's Online Privacy Protection Act — Wikipedia](https://en.wikipedia.org/wiki/Children's_Online_Privacy_Protection_Act) *(six active programs; Aristotle withdrew Aug 2021)*
- [iKeepSafe — COPPA Safe Harbor](https://ikeepsafe.org/certification/coppa/) and [California Student Privacy Certified (CSPC)](https://ikeepsafe.org/certification/cspc/)
- [The Learning Counsel — ParentSquare earns iKeepSafe COPPA+FERPA+CSPC](https://thelearningcounsel.com/articles/industry-news/parentsquare-earns-ikeepsafe-coppa-safe-harbor-ferpa-and-california-student-data-privacy/)
- [kidSAFE — Our Seals (tiered structure)](https://www.kidsafeseal.com/aboutourseals.html) and [+COPPA CERTIFIED Seal](https://kidsafe.com/our-seals/coppa-seal)
- [PRIVO — COPPA Safe Harbor Program](https://www.privo.com/coppa-safe-harbor-program)
- [BBB National Programs (CARU) — COPPA Safe Harbor Services](https://bbbprograms.org/programs/children/safe-harbor)
- [Davis Wright Tremaine — FTC Amends COPPA Rule (2025)](https://www.dwt.com/blogs/privacy--security-law-blog/2025/05/coppa-rule-ftc-amended-childrens-privacy)
- [White & Case — Unpacking the FTC's COPPA amendments](https://www.whitecase.com/insight-alert/unpacking-ftcs-coppa-amendments-what-you-need-know)
- [Bass, Berry & Sims — Amendments to the COPPA Rule Now in Effect](https://www.bassberry.com/news/amendments-to-the-coppa-rule-now-in-effect/)

*Not legal advice. Counsel and each program must confirm scope, fees, and current approval status.*
