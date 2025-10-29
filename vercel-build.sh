#!/bin/bash
set -e

echo "▶ Running Convex codegen..."
npx convex dev --once

echo "▶ Building Next.js..."
next build

