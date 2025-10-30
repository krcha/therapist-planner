#!/bin/bash
set -e

# Debug: Print the Convex URL
echo "DEBUG: NEXT_PUBLIC_CONVEX_URL = '$NEXT_PUBLIC_CONVEX_URL'"

echo "▶ Running Convex codegen..."
npx convex dev --once

# Debug: Check what was written to .env.local
if [ -f .env.local ]; then
  echo "DEBUG: Contents of .env.local after convex dev:"
  cat .env.local | grep CONVEX_URL || echo "No CONVEX_URL found"
fi

echo "▶ Building Next.js..."
next build
