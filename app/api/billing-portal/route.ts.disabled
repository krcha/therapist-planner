import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function GET() {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Clerk stores Stripe customer ID automatically in metadata
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: userId, // Clerk maps this to the Stripe customer internally
    return_url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  });

  return NextResponse.json({ url: portalSession.url });
}

