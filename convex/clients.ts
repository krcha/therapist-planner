import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) return [];
    return await ctx.db.query("clients").withIndex("by_owner", q => q.eq("ownerId", user.subject)).collect();
  },
});

export const get = query({
  args: { id: v.id("clients") },
  handler: async (ctx, { id }) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) return null;
    const doc = await ctx.db.get(id);
    if (!doc || doc.ownerId !== user.subject) return null;
    return doc;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    notesEnc: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Unauthorized");
    return await ctx.db.insert("clients", {
      ownerId: user.subject,
      createdAt: Date.now(),
      ...args,
    });
  },
});

