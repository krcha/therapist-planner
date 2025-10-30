import { auth } from "@convex-dev/auth";
import { clerk } from "@convex-dev/auth/providers/clerk";

export default auth({
  providers: [
    clerk({
      // 👇 your live Clerk instance
      instanceDomain: "wooden-rabbit-395.convex.cloud",
    }),
  ],
});
