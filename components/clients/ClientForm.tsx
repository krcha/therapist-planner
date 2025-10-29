"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEncrypt } from "@/lib/hooks/useEncrypt";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ClientForm() {
  // ✅ FIXED: correct Convex API path
  const create = useMutation(api.clients.create);

  const encrypt = useEncrypt();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const passphrase = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "tp";
      const notesEnc = await encrypt(notes, passphrase);

      await create({
        name,
        email,
        phone,
        notesEnc, // ✅ matches Convex schema
      });

      setName("");
      setEmail("");
      setPhone("");
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
      <Input
        type="email"
        placeholder="Email (optional)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="tel"
        placeholder="Phone (optional)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
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
