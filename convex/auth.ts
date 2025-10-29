import { clerkAuth } from "convex-clerk";

export const authConfig = {
  getUserIdentity: clerkAuth(),
};
