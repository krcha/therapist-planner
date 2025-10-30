// convex/auth.ts
import { convexAuth } from "@convex-dev/auth/server";
import { ConvexCredentials } from "@convex-dev/auth/providers/ConvexCredentials";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [ConvexCredentials],
});