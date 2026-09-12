#!/usr/bin/env bash
#
# Builds the deployable site: the website at the root, the documentation
# under /docs, assembled into _site/.
#
#   ./scripts/build-site.sh            build everything and assemble
#   ./scripts/build-site.sh docs       just the documentation
#   ./scripts/build-site.sh website    just the website
#   ./scripts/build-site.sh assemble   just combine what is already built
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$ROOT/_site"
DOMAIN="www.dropzone.dev"

say() { printf '\033[1m==>\033[0m %s\n' "$1"; }
die() { printf '\033[31merror:\033[0m %s\n' "$1" >&2; exit 1; }

build_docs() {
  say "Building the documentation"
  pnpm --filter @dropzone/docs run build
}

build_website() {
  # The website demos the library from this workspace rather than npm, and
  # resolves it through dist/, so it has to exist first.
  say "Building the library"
  pnpm --filter dropzone run build

  say "Building the website"
  pnpm --filter @dropzone/website run build
}

assemble() {
  say "Assembling $OUT"

  [ -d "$ROOT/apps/website/build" ] || die "apps/website/build is missing -- build the website first"
  [ -d "$ROOT/apps/docs/build" ]    || die "apps/docs/build is missing -- build the docs first"

  rm -rf "$OUT"
  mkdir -p "$OUT"
  cp -R "$ROOT/apps/website/build/." "$OUT/"
  cp -R "$ROOT/apps/docs/build" "$OUT/docs"

  # Kept alongside the repository setting so the domain survives a deployment
  # made before that setting is applied.
  echo "$DOMAIN" > "$OUT/CNAME"

  # A build that quietly produced nothing should fail here rather than deploy
  # an empty site over a working one.
  [ -f "$OUT/index.html" ]      || die "the website produced no index.html"
  [ -f "$OUT/docs/index.html" ] || die "the documentation produced no index.html"

  say "Done: $(du -sh "$OUT" | cut -f1) in _site ($(find "$OUT" -name '*.html' | wc -l | tr -d ' ') pages)"
}

case "${1:-all}" in
  docs)     build_docs ;;
  website)  build_website ;;
  assemble) assemble ;;
  all)      build_docs; build_website; assemble ;;
  *)        die "unknown step '$1' (expected: docs, website, assemble, all)" ;;
esac
