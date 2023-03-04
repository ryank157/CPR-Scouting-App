import { z } from "zod";
import { router, publicProcedure } from "../trpc";

import prisma from "../../../utils/prisma";

export const matchRouter = router({
  submitMatch: publicProcedure
    .input(
      z.object({
        scouter: z.string().optional(),
        startingLocation: z.number().optional(),
        mobility: z.string().optional(),
        autoBalancing: z.string().optional(),
        endRobots: z.number().optional(),
        endOrder: z.number().optional(),
        endResult: z.string().optional(),
        fouls: z.string().array(),
        defense: z.string().array(),
        feedback: z.string().optional(),
        scoredPieces: z
          .object({
            type: z.string().optional(),
            scoredLocation: z.number().optional(),
            cycleTime: z.number().optional(),
            pickupLocation: z.string().optional(),
            pickupOrientation: z.string().optional(),
            delayed: z.string().optional(),
          })
          .array(),
      })
    )
    .query(async ({ input }) => {
      const i = input;
      console.log(i);

      await prisma.robotMatch
        .create({
          data: {
            matchId: 1,
            startingLoc: i.startingLocation,
            mobility: i.mobility,
            autoBalance: i.autoBalancing,
            fouls: i.fouls.join(","),
            defense: i.defense.join(","),
            endRobots: i.endRobots,
            endOrder: i.endOrder,
            endResult: i.endResult,
            feedback: i.feedback,
            scouter: i.scouter,

            scoredPieces: {
              createMany: {
                data: i.scoredPieces,
              },
            },
          },
        })
        .catch((err) => {
          console.log(err);
        });

      return "test";
    }),
});
