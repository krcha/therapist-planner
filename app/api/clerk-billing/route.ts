import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server"; // ✅ Correct import for Clerk v6+

export async function GET() {
  const { userId } = await auth(); // ✅ await is required now

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const portal = await clerkClient.payments.createPortalSession({ userId });
  return NextResponse.json({ url: portal.url });
}
