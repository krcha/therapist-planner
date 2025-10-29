import "../styles/globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers/providers";
import { UserButton } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Therapist Planner",
  description: "Privacy-first planner for psychotherapists",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-dvh">
            <header className="border-b px-4 py-2 flex items-center justify-between">
              <div className="font-semibold">Therapist Planner</div>
              <UserButton afterSignOutUrl="/sign-in" />
            </header>
            <main className="p-4">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

