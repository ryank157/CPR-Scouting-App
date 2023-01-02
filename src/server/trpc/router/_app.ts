import { router } from "../trpc";
import { authRouter } from "./auth";
import { tbaRouter } from "./tba";

export const appRouter = router({
  tba: tbaRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
