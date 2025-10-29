import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const listByClient = query({
  args: { clientId: v.id("clients") },
  handler: async (ctx, { clientId }) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) return [];
    // ensure the client belongs to the user
    const client = await ctx.db.get(clientId);
    if (!client || client.ownerId !== user.subject) return [];
    return await ctx.db
      .query("sessions")
      .withIndex("by_client", q => q.eq("clientId", clientId))
      .collect();
  },
});

export const create = mutation({
  args: {
    clientId: v.id("clients"),
    dateISO: v.string(),
    summaryEnc: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Unauthorized");
    const client = await ctx.db.get(args.clientId);
    if (!client || client.ownerId !== user.subject) throw new Error("Not found");

    return await ctx.db.insert("sessions", {
      ownerId: user.subject,
      clientId: args.clientId,
      dateISO: args.dateISO,
      summaryEnc: args.summaryEnc,
      createdAt: Date.now(),
    });
  },
});


