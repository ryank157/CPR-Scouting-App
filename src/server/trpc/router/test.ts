import { router, publicProcedure, protectedProcedure } from "../trpc";
import prisma from "@/utils/prisma";

export const testRouter = router({
  fetchMatchData: publicProcedure.query(async () => {
    const data = await prisma.robotMatch.findFirst({
      where: {
        id: 3593,
      },
      include: {
        scoredPieces: true,
      },
    });
    return data;
  }),
});
