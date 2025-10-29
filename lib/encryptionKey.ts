const LS_KEY = "tp_encryption_passphrase_v1";

export function getStoredPassphrase(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(LS_KEY);
}
export function setStoredPassphrase(pass: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LS_KEY, pass);
}


