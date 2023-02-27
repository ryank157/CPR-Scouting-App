import { router } from "../trpc";
import { authRouter } from "./auth";
import { tbaRouter } from "./tba";
import { matchRouter } from "./match";

export const appRouter = router({
  tba: tbaRouter,
  auth: authRouter,
  match: matchRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
