#!/bin/sh

# ci_post_clone.sh — runs in Xcode Cloud immediately after the repository is cloned.
#
# This Capacitor iOS app depends on CocoaPods. The Pods/ directory and the
# generated *.xcconfig files it produces are gitignored, so they do NOT exist in
# the clean checkout Xcode Cloud creates. Without regenerating them the archive
# fails with:
#
#   Unable to open base configuration reference file
#   '.../ios/App/Pods/Target Support Files/Pods-App/Pods-App.release.xcconfig'
#
# Installing CocoaPods and running `pod install` recreates those files so the
# build can open the Pods base configuration.

set -eu

REPO_ROOT="${CI_PRIMARY_REPOSITORY_PATH:-$(cd "$(dirname "$0")/../../.." && pwd)}"
IOS_APP_DIR="$REPO_ROOT/ios/App"
CAPACITOR_PODS_HELPER="$REPO_ROOT/node_modules/@capacitor/ios/scripts/pods_helpers.rb"

echo "▸ Using repository root: $REPO_ROOT"

if [ ! -f "$REPO_ROOT/package-lock.json" ]; then
  echo "✗ Missing package-lock.json at $REPO_ROOT"
  exit 1
fi

echo "▸ Installing JavaScript dependencies with npm ci…"
cd "$REPO_ROOT"
npm ci

if [ ! -f "$CAPACITOR_PODS_HELPER" ]; then
  echo "✗ Capacitor CocoaPods helper not found after npm ci:"
  echo "  $CAPACITOR_PODS_HELPER"
  exit 1
fi

echo "▸ Installing CocoaPods…"
if command -v pod >/dev/null 2>&1; then
  echo "▸ CocoaPods already installed: $(pod --version)"
else
  brew install cocoapods
fi

echo "▸ Running pod install in ios/App…"
cd "$IOS_APP_DIR"
pod install

echo "✓ ci_post_clone complete — Pods regenerated."
