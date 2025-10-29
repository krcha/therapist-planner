"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function BillingPage() {
  const { user } = useUser();

  async function openPortal() {
    const res = await fetch("/api/clerk-billing");
    const data = await res.json();
    if (data?.url) window.location.href = data.url;
  }

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-semibold">Billing & Subscription</h1>
      <p className="text-sm text-muted-foreground">
        Signed in as <strong>{user?.primaryEmailAddress?.emailAddress}</strong>
      </p>
      <Button onClick={openPortal}>Manage Subscription</Button>
    </div>
  );
}

