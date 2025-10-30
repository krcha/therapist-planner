"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="space-y-6">
      <SignedOut>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Welcome to Therapist Planner</h1>
          <div className="flex gap-2">
            <Button asChild><Link href="/sign-in">Sign in</Link></Button>
            <Button variant="outline" asChild><Link href="/sign-up">Sign up</Link></Button>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <Button asChild><Link href="/clients">Go to Clients</Link></Button>
        </div>
      </SignedIn>
    </div>
  );
}
