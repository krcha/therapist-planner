// convex/auth.config.ts
import { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      // Your Clerk Issuer URL (Frontend API URL)
      domain: "https://modest-kitten-20.clerk.accounts.dev",
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig;

// ==================================
// IMPORTANT SETUP STEPS:
// ==================================

// 1. In Clerk Dashboard:
//    - Navigate to: Configure → Sessions → JWT Templates
//    - Click "New template" → Select "Convex"
//    - Copy the Issuer URL (should match the domain above)
//    - In the JWT template, add a custom claim:
//      {
//        "aud": "convex"
//      }

// 2. Install required packages:
//    npm install convex @clerk/clerk-react
//    (NOT @convex-dev/auth)

// 3. Environment variables (.env.local):
//    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
//    CLERK_SECRET_KEY=your_secret

// 4. Wrap your app with providers (app/ConvexClientProvider.tsx):
/*
"use client";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
*/

// 5. Use in your layout (app/layout.tsx):
/*
import ConvexClientProvider from "./ConvexClientProvider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
*/

// 6. Access auth in Convex functions:
/*
import { query } from "./_generated/server";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }
    return {
      name: identity.name,
      email: identity.email,
      userId: identity.subject, // Clerk user ID
    };
  },
});
*/