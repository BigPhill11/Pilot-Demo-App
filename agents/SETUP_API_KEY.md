# One-Time Setup: API Key for Cloud Agent Runs

Follow these steps in order. Total time: ~5 minutes. After this, the legal and
education agents run in the cloud 3x daily with no further setup.

⚠️ Rule #1: the API key is a password. Never paste it into a file, commit,
chat, or anywhere except GitHub's Secrets page (step 2).

## Step 1 — Create the API key (Anthropic Console)

1. Go to https://console.anthropic.com and sign in (create an account with
   phillipghead@gmail.com if you don't have one).
2. Add billing: Settings → Billing → add a payment method.
   - Recommended: set a monthly spend limit (e.g., $25–50) so agent runs can
     never surprise you. Six runs/day typically costs a few dollars a day
     depending on how much work each run does.
3. Go to Settings → API Keys → "Create Key".
   - Name it: `phils-financials-github-agents`
   - Copy the key immediately (starts with `sk-ant-`). It's shown only once.

## Step 2 — Add the key to GitHub as a secret

1. Go to https://github.com/BigPhill11/Pilot-Demo-App
2. Settings → Secrets and variables → Actions → "New repository secret"
3. Name (must match exactly): `ANTHROPIC_API_KEY`
4. Value: paste the `sk-ant-...` key → "Add secret"

## Step 3 — Push the agent files (from Terminal on the Mac)

```
cd ~/Pilot-Demo-App
git add .github/workflows agents/
git commit -m "Add legal + education agent cloud workflows"
git push
```

## Step 4 — Verify with a manual run

1. GitHub → Actions tab → "Legal Agent (Phil's Financials)" → "Run workflow"
2. Watch it complete (green check). It should open a pull request.
3. Repeat for "Education Agent (Phil's Financials)".

## Step 5 — Turn on phone notifications

1. Install the GitHub mobile app and sign in.
2. In the app: Profile → Settings → Notifications → enable push for
   pull requests on Pilot-Demo-App.
3. From then on: every agent run = a PR notification on your phone.
   Merging a PR = approving that batch of work.

## After it works

Tell Claude "cloud runs are working" so the duplicate local Mac schedules get
paused. If a key ever leaks or you're unsure, delete it in the Anthropic
Console and repeat Steps 1–2 with a fresh one.

## Troubleshooting — agent runs fail immediately with no PR

**Symptom:** The GitHub Actions job shows red (failure), the run takes < 30 s,
and the error is `Claude execution failed: result is_error:true` with
`total_cost_usd: 0`. No pull request is opened.

**What this means:** Claude Code initialised but the Anthropic API rejected the
request before processing a single token. The three most common causes are:

1. **API key not set or set incorrectly.** Go to the repo →
   Settings → Secrets and variables → Actions. Confirm that `ANTHROPIC_API_KEY`
   exists and that its value starts with `sk-ant-api03-`. If it's missing or
   looks wrong, delete it and repeat Steps 1–2 above with a fresh key.

2. **No billing on the Anthropic account.** Even a valid API key returns an
   error if the account has no payment method. Log in to
   https://console.anthropic.com → Settings → Billing and confirm a card is
   saved and the account is not over its spend limit.

3. **Model access.** The agent uses `claude-opus-5` by default, which requires
   a paid plan. A free-trial account may not have access to it. Adding billing
   (step 2 above) normally resolves this; or contact Anthropic support if
   billing is already set up.

**To see the exact error:** The workflows now include `show_full_output: true`,
so the next run will print the full API error message in the job log under
"Run anthropics/claude-code-action@v1". Look for a line like
`"error": "..."` or `"status": 401/402/403` to pinpoint the cause.
