import "../styles/globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { convex } from "@/lib/convexClient";
import { Providers } from "./providers/providers.js";

const inter = Inter({ subsets: ["latin"] });

const ConvexProviderWithClerk = dynamic(
  () => import("convex/react-clerk").then((mod) => mod.ConvexProviderWithClerk),
  { ssr: false }
);

export const metadata = {
  title: "Therapist Planner",
  description: "Privacy-first planner for psychotherapists",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            <Providers>
              <div className="min-h-dvh">
                <header className="border-b px-4 py-2 flex items-center justify-between">
                  <div className="font-semibold">Therapist Planner</div>
                  <div className="flex items-center gap-3">
                    <a href="/billing" className="text-sm hover:underline">
                      Billing
                    </a>
                    <SignedIn>
                      <UserButton afterSignOutUrl="/sign-in" />
                    </SignedIn>
                    <SignedOut>
                      <SignInButton mode="modal" />
                      <SignUpButton mode="modal" />
                    </SignedOut>
                  </div>
                </header>

                <main className="p-4">
                  <SignedIn>{children}</SignedIn>
                  <SignedOut>
                    <p className="text-center text-sm text-muted-foreground mt-4">
                      Please sign in to continue.
                    </p>
                  </SignedOut>
                </main>
              </div>
            </Providers>
          </ConvexProviderWithClerk>
        </body>
      </html>
    </ClerkProvider>
  );
}
