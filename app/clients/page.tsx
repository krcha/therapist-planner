"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";

export default function ClientsPage() {
  const clients = useQuery(api.clients.list) ?? [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Clients</h1>
        <Button asChild>
          <Link href="/clients/new">New Client</Link>
        </Button>
      </div>

      <div className="grid gap-3">
        {clients.map((c: any) => (
          <Link
            key={c._id}
            href={`/clients/${c._id}`}
            className="border rounded-md p-3 hover:bg-muted"
          >
            <div className="font-medium">{c.name}</div>
            <div className="text-sm text-muted-foreground">
              {c.email} • {c.phone}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

