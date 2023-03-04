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
        robotId: z.number(),
        alliance: z.string(),
        station: z.number(),
        matchId: z.number(),
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

      const result = await prisma.robotMatch.update({
        where: {
          matchId_robotId: { matchId: i.matchId, robotId: i.robotId },
        },
        data: {
          startingLoc: i.startingLocation,
          mobility: i.mobility,
          autoBalance: i.autoBalancing,
          fouls: i.fouls.join(","),
          defense: i.defense.join(","),
          endRobots: i.endRobots,
          endOrder: i.endOrder,
          endResult: i.endResult,
          feedback: i.feedback,
          robotId: i.robotId,
          station: i.station,
          alliance: i.alliance,
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

      return "test";
    }),

  testQuery: publicProcedure.query(async () => {
    const test = await prisma.robotMatch.findFirst({
      where: {
        id: 3722,
      },
      include: {
        scouter: true,
        scoredPieces: true,
        robot: true,
      },
    });
    console.log(test);
  }),
});
