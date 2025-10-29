"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { deriveKey, encryptString } from "@/lib/crypto";
import { getStoredPassphrase } from "@/lib/encryptionKey";

export default function NewSessionPage() {
  const { clientId } = useParams<{ clientId: string }>();
  const createSession = useMutation(api.sessions.create);
  const router = useRouter();

  const [dateISO, setDateISO] = useState<string>(
    new Date().toISOString().slice(0, 16)
  );
  const [summary, setSummary] = useState("");
  const [passphrase, setPassphrase] = useState("");

  useEffect(() => {
    const saved = getStoredPassphrase();
    if (saved) setPassphrase(saved);
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!passphrase) {
      alert("Set local encryption passphrase first.");
      return;
    }

    const salt = process.env.NEXT_PUBLIC_ENCRYPTION_SALT || "tp";
    const key = await deriveKey(passphrase, salt);
    const summaryEnc = await encryptString(key, summary);


    // HTML datetime-local doesn’t include seconds; convert to full ISO
    const iso = new Date(dateISO).toISOString();

    await createSession({
      clientId: clientId as any,
      dateISO: iso,
      summaryEnc,
    });

    router.push(`/clients/${clientId}/sessions`);
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-4">
      <h1 className="text-xl font-semibold">New Session</h1>

      <label className="text-sm">Date & time</label>
      <Input
        type="datetime-local"
        value={dateISO}
        onChange={(e) => setDateISO(e.target.value)}
        required
      />

      <Textarea
        placeholder="Confidential session summary (encrypted)"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        rows={6}
      />

      <Button type="submit">Save Session</Button>
    </form>
  );
}

