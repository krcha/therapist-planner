"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b px-4 py-2 flex items-center justify-between">
      <Link href="/" className="font-semibold hover:opacity-80">
        Therapist Planner
      </Link>
      <div className="flex items-center gap-3">
        <Link href="/billing" className="text-sm hover:underline">
          Billing
        </Link>
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>
        <SignedOut>
          <Button size="sm" variant="ghost" asChild>
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </SignedOut>
      </div>
    </header>
  );
}
