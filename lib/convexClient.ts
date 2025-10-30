// lib/convexClient.ts
"use client";

import { ConvexReactClient } from "convex/react";

// ✅ This must match your Convex deployment (automatically added by convex dev or Vercel build)
export const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!
);
