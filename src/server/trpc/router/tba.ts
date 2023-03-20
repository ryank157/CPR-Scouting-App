import axios from "axios";
import { router, publicProcedure } from "../trpc";
import prisma from "@/utils/prisma";
import { z } from "zod";

export const tbaRouter = router({
  // getTBAData: publicProcedure.query(async () => {
  //   const data = await axios
  //     .get(
  //       "https://www.thebluealliance.com/api/v3/event/2023wabon/teams/simple",
  //       {
  //         headers: {
  //           "X-TBA-Auth-Key": process.env.THE_BLUE_ALLIANCE,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       return res.data;
  //     });

  //   return data;
  // }),

  populateRobots: publicProcedure
    .input(z.object({ eventKey: z.string(), eventId: z.number() }))
    .query(async ({ input }) => {
      const data: any[] = await axios
        .get(
          `https://www.thebluealliance.com/api/v3/event/${input.eventKey}/teams/simple`,
          {
            headers: {
              "X-TBA-Auth-Key": process.env.THE_BLUE_ALLIANCE,
            },
          }
        )
        .then((res) => {
          return res.data;
        });

      const eventRobots = data.map((robot) => {
        return {
          name: robot.nickname,
          city: robot.city,
          number: robot.team_number,
        };
      });

      eventRobots.forEach(async (robot) => {
        await prisma.robot.upsert({
          where: { teamNumber: robot.number }, // Unique field to match the robot
          create: {
            name: robot.name,
            teamNumber: robot.number,
            city: robot.city,
            events: {
              connect: {
                id: input.eventId, // event id
              },
            },
          },
          update: {
            name: robot.name,
            city: robot.city,
            events: {
              connect: {
                id: input.eventId, // event id
              },
            },
          },
        });
      });

      return eventRobots;
    }),
  populateMatchSchedule: publicProcedure
    .input(z.object({ eventKey: z.string(), eventId: z.number() }))
    .query(async ({ input }) => {
      const data: MatchType[] = await axios
        .get(
          `https://www.thebluealliance.com/api/v3/event/${input.eventKey}/matches/simple`,
          {
            headers: {
              "X-TBA-Auth-Key": process.env.THE_BLUE_ALLIANCE,
            },
          }
        )
        .then((res) => {
          return res.data;
        });

      const matchData: matchData = data
        .reduce((acc: matchData, match) => {
          if (match.comp_level === "qm") {
            acc.push({
              eventId: match.eventId || 0,
              matchNumber: match.match_number,
              blue: match.alliances.blue.team_keys,
              red: match.alliances.red.team_keys,
            });
          }
          return acc;
        }, [])
        .sort((a, b) => a.matchNumber - b.matchNumber);

      assignRobotsToMatches(matchData, input.eventId);
      return matchData;
    }),
  fetchMatchSchedule: publicProcedure
    .input(z.object({ eventId: z.number() }))
    .query(async ({ input }) => {
      const data = await prisma.match.findMany({
        where: {
          eventId: input.eventId,
        },
        select: {
          id: true,
          matchNumber: true,
          robotMatchData: {
            select: {
              robot: true,
              alliance: true,
              station: true,
            },
          },
        },
      });
      return data;
    }),
  // removeAllData: publicProcedure.query(async () => {
  //   await prisma.match.deleteMany();
  //   await prisma.robotMatch.deleteMany();
  //   await prisma.scoredPiece.deleteMany();
  // }),
});

type MatchType = {
  alliances: {
    blue: {
      team_keys: string[];
    };
    red: {
      team_keys: string[];
    };
  };
  match_number: number;
  comp_level: string;
  eventId?: number;
};

async function assignRobotsToMatches(matchData: matchData, eventId: number) {
  for (const match of matchData) {
    const matchNumber = match.matchNumber;
    const blueRobotNumbers = match.blue.map((teamKey) =>
      Number(teamKey.slice(3))
    );
    const redRobotNumbers = match.red.map((teamKey) =>
      Number(teamKey.slice(3))
    );

    // Find or create the match
    const dbMatch = await prisma.match.upsert({
      where: {
        matchNumber_eventId_flag: {
          matchNumber,
          eventId: eventId,
          flag: "normal",
        },
      },
      update: {},
      create: {
        eventId: eventId,
        matchNumber,
        flag: "normal",
      },
    });

    // Construct the data for the blue robots
    const blueRobotMatchData = blueRobotNumbers.map(
      (blueRobotNumber, index) => ({
        eventId: eventId,
        matchId: dbMatch.id,
        teamNumber: blueRobotNumber,
        alliance: "blue",
        station: index,
      })
    );

    // Construct the data for the red robots
    const redRobotMatchData = redRobotNumbers.map((redRobotNumber, index) => ({
      eventId: eventId,
      matchId: dbMatch.id,
      teamNumber: redRobotNumber,
      alliance: "red",
      station: index,
    }));

    // Use createMany to create the blue robot matches, ensuring that only one is created for each unique combination of match and robot
    await prisma.robotMatch.createMany({
      data: blueRobotMatchData,
      skipDuplicates: true,
    });

    // Use createMany to create the red robot matches, ensuring that only one is created for each unique combination of match and robot
    await prisma.robotMatch.createMany({
      data: redRobotMatchData,
      skipDuplicates: true,
    });
  }
}

type matchData = {
  matchNumber: number;
  blue: string[];
  red: string[];
  eventId: number;
}[];
