"use client";

import { useRouter } from "next/navigation";
import ClientForm from "@/components/clients/ClientForm";

export default function NewClientPage() {
  const router = useRouter();

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-xl font-semibold mb-4">New Client</h1>
      <ClientForm
        onSuccess={() => {
          router.push("/clients");
        }}
      />
    </div>
  );
}

