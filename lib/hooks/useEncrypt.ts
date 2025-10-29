// lib/hooks/useEncrypt.ts
import { useCallback } from "react";
import { deriveKey, encryptString } from "@/lib/crypto";

export function useEncrypt() {
  return useCallback(async (plaintext: string, passphrase: string) => {
    const salt = process.env.NEXT_PUBLIC_ENCRYPTION_SALT || "tp";
    const key = await deriveKey(passphrase, salt);
    return await encryptString(key, plaintext);
  }, []);
}

