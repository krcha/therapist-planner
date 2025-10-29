"use client";

import { useParams } from "next/navigation";

export default function ClientPage() {
  const { clientId } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Client {clientId}</h1>
      <p>Here you can view sessions, appointments, and notes for this client.</p>
    </div>
  );
}

