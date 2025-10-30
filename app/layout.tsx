// app/layout.tsx
import "../styles/globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ConvexClerkProvider } from "./ConvexClerkProvider";
import { Header } from "./Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Therapist Planner",
  description: "Privacy-first planner for psychotherapists",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClerkProvider>
          <div className="min-h-dvh">
            <Header />
            <main className="p-4">
              {children}
            </main>
          </div>
        </ConvexClerkProvider>
      </body>
    </html>
  );
}