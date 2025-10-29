function b64enc(a: Uint8Array) {
  return Buffer.from(a).toString("base64");
}
function b64dec(s: string) {
  return new Uint8Array(Buffer.from(s, "base64"));
}

export async function deriveKey(passphrase: string, salt: string) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(passphrase), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: enc.encode(salt), iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encryptString(plaintext: string, key: CryptoKey) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(plaintext));
  return `${b64enc(iv)}:${b64enc(new Uint8Array(ct))}`;
}

export async function decryptString(payload: string, key: CryptoKey) {
  const [ivB64, ctB64] = payload.split(":");
  const iv = b64dec(ivB64);
  const ct = b64dec(ctB64);
  const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ct);
  return new TextDecoder().decode(pt);
}

