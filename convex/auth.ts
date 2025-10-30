// convex/auth.ts
import { convexAuth, clerkProvider } from "@convex-dev/auth";

export const auth = convexAuth({
  providers: [clerkProvider()],
});
