#!/bin/sh

# ci_post_clone.sh — runs in Xcode Cloud immediately after the repository is cloned.
#
# This is a Capacitor app, so the iOS archive depends on artifacts that are NOT in
# the git checkout because they are gitignored / generated:
#
#   * Node/npm is not preinstalled on the Xcode Cloud image            -> "npm: command not found"
#   * ios/App/App/public (the bundled web app) is produced by cap sync  -> "Build input file cannot be found: .../public"
#   * Pods/ + Pods-App.*.xcconfig are produced by pod install           -> "Unable to open base configuration reference file"
#
# To make the clean checkout buildable we install Node + CocoaPods, install JS
# dependencies, build the web app, then run `npx cap sync ios` which copies dist/
# into ios/App/App/public AND runs pod install (regenerating the xcconfig files).

set -eu

# Homebrew (and anything we install through it) lives here on the Apple Silicon
# Xcode Cloud runners. Put it on PATH up front so `npm`/`pod` resolve after install.
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
export HOMEBREW_NO_AUTO_UPDATE=1
export HOMEBREW_NO_INSTALL_CLEANUP=1

REPO_ROOT="${CI_PRIMARY_REPOSITORY_PATH:-$(cd "$(dirname "$0")/../../.." && pwd)}"
IOS_APP_DIR="$REPO_ROOT/ios/App"

echo "▸ Using repository root: $REPO_ROOT"

if [ ! -f "$REPO_ROOT/package-lock.json" ]; then
  echo "✗ Missing package-lock.json at $REPO_ROOT"
  exit 1
fi

# 1. Node / npm — not preinstalled on Xcode Cloud. This is the step that was failing
#    with "npm: command not found" (exit 127).
if command -v npm >/dev/null 2>&1; then
  echo "▸ npm already installed: $(npm --version)"
else
  echo "▸ npm not found — installing Node via Homebrew…"
  brew install node
fi

# 2. CocoaPods — needed by `cap sync` to regenerate the Pods xcconfig files.
if command -v pod >/dev/null 2>&1; then
  echo "▸ CocoaPods already installed: $(pod --version)"
else
  echo "▸ Installing CocoaPods…"
  brew install cocoapods
fi

# 3. JavaScript dependencies.
echo "▸ Installing JavaScript dependencies with npm ci…"
cd "$REPO_ROOT"
npm ci

# 4. Build the web app (produces dist/). Vite reads VITE_* values from the Xcode
#    Cloud environment, falling back to the committed .env.production defaults so the
#    archive is functional even if those env vars are not configured in App Store
#    Connect.
echo "▸ Building web assets with npm run build…"
npm run build

# 5. Sync into iOS: copies dist/ -> ios/App/App/public and runs pod install in
#    ios/App, regenerating Pods + the *.xcconfig files the archive references.
echo "▸ Running npx cap sync ios…"
npx cap sync ios

echo "✓ ci_post_clone complete — Node deps installed, web assets built, Pods regenerated."
