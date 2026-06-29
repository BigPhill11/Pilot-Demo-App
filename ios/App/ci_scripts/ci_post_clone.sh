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

set -e

echo "▸ Installing CocoaPods…"
brew install cocoapods

echo "▸ Running pod install in ios/App…"
cd "$CI_PRIMARY_REPOSITORY_PATH/ios/App"
pod install

echo "✓ ci_post_clone complete — Pods regenerated."
