#!/usr/bin/env bash
# Post-create hook for the user-research devcontainer.
#
# The repository ships a project-level .claude/settings.json that registers the
# League marketplace and force-enables the ua-framework plugin. When a student
# first runs `claude` and trusts this folder, Claude Code installs the plugin
# from the marketplace automatically.
#
# We pre-fetch the marketplace here so the first `claude` invocation does not
# block on a git clone over the codespace network. Failures are non-fatal —
# Claude Code will fetch on demand.

set -euo pipefail

echo "=== User Research devcontainer post-create ==="

# Make sure the per-user claude config dir exists (the volume mount may create
# it owned by root on first boot).
mkdir -p "$HOME/.claude"

# Pre-clone the marketplace into Claude's plugin cache. This is best-effort.
MARKET_CACHE="$HOME/.claude/plugins/marketplaces/league-infrastructure/claude-plugin-marketplace"
if [ ! -d "$MARKET_CACHE/.git" ]; then
  mkdir -p "$(dirname "$MARKET_CACHE")"
  git clone --depth 1 https://github.com/league-infrastructure/claude-plugin-marketplace.git \
    "$MARKET_CACHE" || echo "(marketplace pre-fetch skipped — Claude Code will fetch on first run)"
fi

cat <<'EOF'

Setup complete.

Next steps:
  1. Open a terminal and run:  claude
  2. Sign in when prompted (browser auth).
  3. When asked to trust this folder, answer yes — Claude Code will install
     the ua-framework plugin automatically.
  4. Start your project:       /ua-framework:start

EOF
