"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { deriveKey, encryptString } from "@/lib/crypto";
import { getStoredPassphrase, setStoredPassphrase } from "@/lib/encryptionKey";
import { useRouter } from "next/navigation";

export default function NewClientPage() {
  const createClient = useMutation(api.clients.create);
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [passphrase, setPassphrase] = useState("");

  useEffect(() => {
    const saved = getStoredPassphrase();
    if (saved) setPassphrase(saved);
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!passphrase) {
      alert("Set your encryption passphrase first.");
      return;
    }
    const key = await deriveKey(passphrase, process.env.NEXT_PUBLIC_ENCRYPTION_SALT || "tp");
    const notesEnc = await encryptString(key, notes || "");
    await createClient({ name, email, phone, notesEnc });
    router.push("/clients");
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-4">
      <h1 className="text-xl font-semibold">New Client</h1>

      <label className="text-sm">Encryption Passphrase (local only)</label>
      <div className="flex gap-2">
        <Input
          type="password"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          placeholder="Set once, stored locally"
        />
        <Button type="button" onClick={() => { setStoredPassphrase(passphrase); alert("Saved locally"); }}>
          Save
        </Button>
      </div>

      <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <Textarea placeholder="Confidential notes (will be encrypted)" value={notes} onChange={(e) => setNotes(e.target.value)} />
      <Button type="submit">Create</Button>
    </form>
  );
}

