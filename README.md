# Therapist Planner

A **privacy-first practice management app** for psychotherapists. Securely manage client records, encrypted session notes, and appointments with modern tools and a friendly UI.

---

## Features

- 🛡️ **Fully Encrypted Session Notes**: Client session summaries are encrypted in the browser. Only you hold the passphrase.
- 👩‍⚕️ **Client & Session Management**: Add clients, track history, store sensitive information securely.
- 🔒 **Authentication**: Secure user authentication and multi-device access with Clerk.
- 💳 **Subscription Management**: Self-serve billing for premium features.
- 🎨 **Modern UI**: Built with Next.js, React, and shadcn/ui (Radix + Tailwind).

---

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open** [http://localhost:3000](http://localhost:3000) in your browser.

---

## Security & Encryption

- **Local Encryption:**
  - Client session notes are AES-GCM encrypted *before* leaving the browser.
  - Key is derived from your local passphrase (PBKDF2, 100k iterations).
  - Passphrase never leaves your device—lose it, and your notes are unrecoverable.
- **Convex Database:**
  - Only encrypted blobs are stored—no plaintext sensitive data on the backend.

---

## Tech Stack
- **Framework**: Next.js 16, React 19
- **Database**: [Convex](https://convex.dev/)
- **Auth/Billing**: [Clerk.dev](https://clerk.dev/)
- **UI**: Radix UI, shadcn/ui, Tailwind CSS
- **Validation**: Zod, React Hook Form

---

## Dev Scripts
- `npm run dev` — Start dev server
- `npm run build` — Production build (uses custom Vercel script)
- `npm run lint` — Lint code

---

## License
MIT. For private/professional adaptation only.
