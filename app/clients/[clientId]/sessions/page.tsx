"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SessionsListPage() {
  const { clientId } = useParams<{ clientId: string }>();
  const sessions = useQuery(api.sessions.listByClient, { clientId: clientId as any }) ?? [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Sessions</h2>
        <Button asChild><Link href={`/clients/${clientId}/sessions/new`}>New Session</Link></Button>
      </div>
      <div className="grid gap-3">
        {sessions.map(s => (
          <div key={s._id} className="border rounded-md p-3">
            <div className="font-medium">{new Date(s.dateISO).toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Encrypted summary saved</div>
          </div>
        ))}
      </div>
    </div>
  );
}

