"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEncrypt } from "@/lib/hooks/useEncrypt";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ClientForm() {
  const create = useMutation(api.functions.clients.create);
  const encrypt = useEncrypt();
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!keyReady) return;
    const blob = await enc({ name, notes });
    await create({ blob });
    setName(""); setNotes("");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <Input placeholder="Client name" value={name} onChange={e => setName(e.target.value)} required />
      <Textarea placeholder="Notes (encrypted)" value={notes} onChange={e => setNotes(e.target.value)} />
      <Button type="submit" disabled={!keyReady}>Save Client</Button>
    </form>
  );
}

