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
  const encrypt = useEncrypt(); // ✅ this is our async encrypt function
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      // optional: derive a simple passphrase for encryption (could be per-user or static env)
      const passphrase = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "tp";
      const blob = await encrypt(JSON.stringify({ name, notes }), passphrase);

      await create({ blob });

      setName("");
      setNotes("");
    } catch (err) {
      console.error("Error creating client:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <Input
        placeholder="Client name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Textarea
        placeholder="Notes (encrypted)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Client"}
      </Button>
    </form>
  );
}
