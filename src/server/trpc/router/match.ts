import { z } from "zod";
import { router, publicProcedure } from "../trpc";

import prisma from "../../../utils/prisma";
import { connect } from "http2";

export const matchRouter = router({
  submitMatch: publicProcedure
    .input(
      z.object({
        scouter: z.string(),
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

      const result = await prisma.robotMatch.create({
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
          robotId: 1778,
          station: 2,
          alliance: "red",
          scouter: {
            connect: {
              scouterId: i.scouter,
            },
          },
          scoredPieces: {
            createMany: {
              data: i.scoredPieces,
            },
          },
        },
      });

      const matches = await prisma.robotMatch.findMany();
      console.log(matches);
      console.log(result);

      return "test";
    }),
});
