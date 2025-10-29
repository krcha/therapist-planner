import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  clients: defineTable({
    ownerId: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    notesEnc: v.string(),
    createdAt: v.number(),
  }).index("by_owner", ["ownerId"]),

  sessions: defineTable({
    ownerId: v.string(),
    clientId: v.string(),
    dateISO: v.string(),
    summaryEnc: v.string(),
    createdAt: v.number(),
  }).index("by_owner", ["ownerId"]),
});

