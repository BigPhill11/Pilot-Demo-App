#!/bin/sh

# ci_pre_xcodebuild.sh — runs in Xcode Cloud right before the xcodebuild archive.
#
# App Store Connect rejects an upload whose CFBundleVersion is not strictly higher
# than every previously uploaded build ("The bundle version must be higher than the
# previously uploaded version."). A hardcoded number in project.pbxproj collides as
# soon as it's uploaded once, and manual bumping is error-prone.
#
# Fix: stamp a monotonically increasing build number derived from the current UTC
# time (YYYYMMDDHHMM) on every build. It is always larger than the old small numbers
# (…13, 14) and always increases, so uploads are never rejected as duplicates.
# CFBundleVersion is `$(CURRENT_PROJECT_VERSION)`, so we set that build setting.

set -eu

PBXPROJ="${CI_PRIMARY_REPOSITORY_PATH:-$(cd "$(dirname "$0")/../../.." && pwd)}/ios/App/App.xcodeproj/project.pbxproj"
BUILD_NUMBER="$(date -u +%Y%m%d%H%M%S)"

echo "▸ Setting CURRENT_PROJECT_VERSION (CFBundleVersion) to $BUILD_NUMBER"
# macOS/BSD sed (Xcode Cloud runs macOS): in-place edit with an empty backup suffix.
sed -i '' "s/CURRENT_PROJECT_VERSION = [^;]*;/CURRENT_PROJECT_VERSION = ${BUILD_NUMBER};/g" "$PBXPROJ"

echo "▸ Result:"
grep -n "CURRENT_PROJECT_VERSION" "$PBXPROJ" || true
