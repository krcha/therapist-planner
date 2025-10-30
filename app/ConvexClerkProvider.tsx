"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

// Get the Convex URL
let convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL environment variable is not set");
}

// Fix the missing 'h' issue if it exists
if (convexUrl.startsWith("ttps://")) {
  console.warn("Fixing malformed Convex URL: adding missing 'h'");
  convexUrl = "h" + convexUrl;
} else if (!convexUrl.startsWith("https://") && !convexUrl.startsWith("http://")) {
  console.warn("Convex URL missing protocol, adding https://");
  convexUrl = "https://" + convexUrl;
}

console.log("Using Convex URL:", convexUrl);

const convex = new ConvexReactClient(convexUrl);

export function ConvexClerkProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
