import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const portal = await clerkClient.payments.createPortalSession({ userId });
  return NextResponse.json({ url: portal.url });
}

