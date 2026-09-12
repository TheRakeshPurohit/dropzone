#!/usr/bin/env bash
#
# Builds the deployable site: the website at the root, the documentation
# under /docs, assembled into _site/.
#
# This exists as a script rather than inline workflow steps because the two
# halves need different versions of Node, and that is fiddly enough that it
# should not be duplicated between CI and a developer's machine.
#
#   ./scripts/build-site.sh            build everything and assemble
#   ./scripts/build-site.sh docs       just the documentation
#   ./scripts/build-site.sh website    just the website (needs Node < 18)
#   ./scripts/build-site.sh assemble   just combine what is already built
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$ROOT/_site"
DOMAIN="www.dropzone.dev"

# The Node the website has to run under. SvelteKit 1.0.0-next.286 wraps `url`
# in a proxy, and from Node 18 onwards URL is implemented with real private
# fields, so prerendering dies with "Cannot read private member #context".
# Goes away with the SvelteKit migration; see ROADMAP.md.
WEBSITE_NODE_MAJOR=16

say() { printf '\033[1m==>\033[0m %s\n' "$1"; }
die() { printf '\033[31merror:\033[0m %s\n' "$1" >&2; exit 1; }

node_major() { node -p "process.versions.node.split('.')[0]"; }

build_docs() {
  say "Building the documentation"
  pnpm --filter @dropzone/docs run build
}

# Invoked directly rather than through pnpm, which will not start on Node 16.
run_svelte_kit() {
  ( cd "$ROOT/apps/website" && BRANCH="${BRANCH:-main}" ./node_modules/.bin/svelte-kit build )
}

build_website() {
  say "Building the website"

  if [ "$(node_major)" -lt 18 ]; then
    run_svelte_kit
    return
  fi

  # Too new to build it here, so borrow an older Node if one is available.
  local nvm_sh="${NVM_DIR:-$HOME/.nvm}/nvm.sh"
  [ -s "$nvm_sh" ] || die "the website needs Node $WEBSITE_NODE_MAJOR and this is Node $(node_major).
  Install nvm, or run it yourself:
    nvm use $WEBSITE_NODE_MAJOR
    cd apps/website && ./node_modules/.bin/svelte-kit build"

  # shellcheck disable=SC1090
  . "$nvm_sh"
  nvm which "$WEBSITE_NODE_MAJOR" > /dev/null 2>&1 \
    || die "Node $WEBSITE_NODE_MAJOR is not installed. Run: nvm install $WEBSITE_NODE_MAJOR"

  say "Switching to Node $WEBSITE_NODE_MAJOR for the website"
  ( cd "$ROOT/apps/website" \
    && BRANCH="${BRANCH:-main}" nvm exec --silent "$WEBSITE_NODE_MAJOR" ./node_modules/.bin/svelte-kit build )
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
