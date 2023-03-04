import axios from "axios";
import { router, publicProcedure } from "../trpc";
import prisma from "@/utils/prisma";

export const tbaRouter = router({
  getTBAData: publicProcedure.query(async () => {
    const data = await axios
      .get(
        "https://www.thebluealliance.com/api/v3/event/2023wasno/teams/simple",
        {
          headers: {
            "X-TBA-Auth-Key": process.env.THE_BLUE_ALLIANCE,
          },
        }
      )
      .then((res) => {
        return res.data;
      });

    return data;
  }),

  populateRobots: publicProcedure.query(async () => {
    const data: any[] = await axios
      .get(
        "https://www.thebluealliance.com/api/v3/event/2023wasno/teams/simple",
        {
          headers: {
            "X-TBA-Auth-Key": process.env.THE_BLUE_ALLIANCE,
          },
        }
      )
      .then((res) => {
        return res.data;
      });

    console.log(data);
    const eventRobots = data.map((robot) => {
      return {
        name: robot.nickname,
        city: robot.city,
        number: robot.team_number,
      };
    });

    eventRobots.forEach(async (robot) => {
      await prisma.robot.create({
        data: {
          name: robot.name,
          teamNumber: robot.number,
          city: robot.city,
          events: {
            connect: {
              id: 1,
            },
          },
        },
      });
    });

    return eventRobots;
    // return data;
  }),
  populateMatchSchedule: publicProcedure.query(async () => {
    const data: MatchType[] = await axios
      .get(
        "https://www.thebluealliance.com/api/v3/event/2023wasno/matches/simple",
        {
          headers: {
            "X-TBA-Auth-Key": process.env.THE_BLUE_ALLIANCE,
          },
        }
      )
      .then((res) => {
        return res.data;
      });

    const matchData: matchData = data.map((match) => {
      return {
        matchNumber: match.match_number,
        blue: match.alliances.blue.team_keys,
        red: match.alliances.red.team_keys,
      };
    });

    // assignRobotsToMatches(matchData);
  }),
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
};

async function assignRobotsToMatches(matchData: matchData) {
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
        matchNumber_eventId_flag: { matchNumber, eventId: 1, flag: "normal" },
      },
      update: {},
      create: {
        eventId: 1, // Glacier Peak
        matchNumber,
        flag: "normal",
      },
    });

    // Connect the blue robots to the match
    let blueIndex = 0;
    for (const blueRobotNumber of blueRobotNumbers) {
      await prisma.robotMatch.create({
        data: {
          match: { connect: { id: dbMatch.id } },
          robot: { connect: { teamNumber: blueRobotNumber } },
          alliance: "blue",
          station: blueIndex,
        },
      });
      blueIndex++;
    }

    // Connect the red robots to the match
    let redIndex = 0;
    for (const redRobotNumber of redRobotNumbers) {
      await prisma.robotMatch.create({
        data: {
          match: { connect: { id: dbMatch.id } },
          robot: { connect: { teamNumber: redRobotNumber } },
          alliance: "red",
          station: redIndex,
        },
      });
      redIndex++;
    }
  }
}

type matchData = { matchNumber: number; blue: string[]; red: string[] }[];
