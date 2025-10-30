// convex/auth.ts
import { convexAuth } from "@convex-dev/auth/server";
import { clerk } from "@convex-dev/auth/providers/clerk";

// create the auth export used by Convex
export const auth = convexAuth({
  providers: [clerk()],
});
