"use client";

import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-2 md:px-6 space-y-8">
      {/* SIGNED OUT HERO */}
      <SignedOut>
        <div className="bg-white/80 rounded-xl p-8 shadow-md flex flex-col items-center gap-4 border border-neutral-200">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">Welcome to Therapist Planner</h1>
          <p className="text-neutral-500 max-w-xl mb-4 text-center">
            Privacy-first, calm workspace for managing your practice. Organize tasks, clients, appointments, notes, and resources.
          </p>
          <div className="flex gap-4">
            <Button asChild><Link href="/sign-in">Sign in</Link></Button>
            <Button variant="outline" asChild><Link href="/sign-up">Sign up</Link></Button>
          </div>
        </div>
      </SignedOut>

      {/* SIGNED IN DASHBOARD */}
      <SignedIn>
        <div className="flex flex-col gap-6 md:gap-8">
          {/* DASHBOARD CARDS */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl bg-neutral-50 border border-neutral-200 shadow-sm p-6 flex flex-col gap-2 min-h-[120px]">
              <span className="text-sm text-neutral-500">Active Tasks</span>
              <span className="text-2xl font-semibold text-neutral-700">–</span>
              <Link href="/tasks" className="text-xs text-blue-700 hover:underline">View Tasks</Link>
            </div>
            <div className="rounded-xl bg-neutral-50 border border-neutral-200 shadow-sm p-6 flex flex-col gap-2 min-h-[120px]">
              <span className="text-sm text-neutral-500">Upcoming Appointments</span>
              <span className="text-2xl font-semibold text-neutral-700">–</span>
              <Link href="/appointments" className="text-xs text-blue-700 hover:underline">View Appointments</Link>
            </div>
            <div className="rounded-xl bg-neutral-50 border border-neutral-200 shadow-sm p-6 flex flex-col gap-2 min-h-[120px]">
              <span className="text-sm text-neutral-500">Clients</span>
              <span className="text-2xl font-semibold text-neutral-700">–</span>
              <Link href="/clients" className="text-xs text-blue-700 hover:underline">View Clients</Link>
            </div>
          </section>
          {/* UPCOMING & QUICK ACTIONS */}
          <section className="flex flex-col md:flex-row gap-4 w-full">
            {/* Upcoming List (Placeholder) */}
            <div className="flex-1 bg-white/80 rounded-xl border border-neutral-100 shadow-md p-5 min-h-[140px]">
              <div className="font-medium text-neutral-700 mb-2">Upcoming</div>
              <div className="text-neutral-500 text-sm">No upcoming tasks or appointments.</div>
            </div>
            {/* Quick Add Actions */}
            <div className="flex-1 flex flex-col items-stretch gap-2 bg-white/80 rounded-xl border border-neutral-100 shadow-md p-5 min-h-[140px]">
              <div className="font-medium text-neutral-700 mb-2">Quick Add</div>
              <Button asChild variant="outline"><Link href="/tasks/new">Add Task</Link></Button>
              <Button asChild variant="outline"><Link href="/clients/new">Add Client</Link></Button>
              <Button asChild variant="outline"><Link href="/appointments/new">Add Appointment</Link></Button>
            </div>
          </section>
        </div>
      </SignedIn>
    </div>
  );
}
