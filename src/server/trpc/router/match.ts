import { z } from "zod";
import { router, publicProcedure } from "../trpc";

import prisma from "../../../utils/prisma";
import fs from "fs";

export const matchRouter = router({
  submitMatches: publicProcedure
    .input(
      z
        .object({
          scouter: z.string().optional(),
          startingLocation: z.number().optional(),
          mobility: z.string().optional(),
          autoBalancing: z.string().optional(),
          endgameBalancing: z.object({
            endingLoc: z.number().optional(),
            endBalanceTime: z.number().optional(),
            endRobots: z.number().optional(),
            endOrder: z.number().optional(),
            endResult: z.string().optional(),
          }),
          fouls: z.string().array(),
          defense: z.string().array(),
          feedback: z.string().optional(),
          robotId: z.number().optional(),
          alliance: z.string().optional(),
          station: z.number().optional(),
          matchId: z.number().optional(),
          scoredObjects: z
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
        .array()
    )
    .query(async ({ input }) => {
      const results = await Promise.all(
        input.map(async (i) => {
          if (i.matchId && i.robotId) {
            return await prisma.robotMatch.update({
              where: {
                matchId_robotId: { matchId: i.matchId, robotId: i.robotId },
              },
              data: {
                startingLoc: i.startingLocation,
                mobility: i.mobility,
                autoBalance: i.autoBalancing,
                fouls: i.fouls.join(","),
                defense: i.defense.join(","),
                endingLoc: i.endgameBalancing.endingLoc,
                endBalanceTime: i.endgameBalancing.endBalanceTime,
                endRobots: i.endgameBalancing.endRobots,
                endOrder: i.endgameBalancing.endOrder,
                endResult: i.endgameBalancing.endResult,
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
                    data: i.scoredObjects,
                  },
                },
              },
            });
          }
        })
      );

      return "test";
    }),

  exportData: publicProcedure.query(async () => {
    const data = await prisma.robotMatch.findMany({
      where: {
        scouter: {
          some: {},
        },
      },
      include: {
        scouter: true,
        scoredPieces: true,
        robot: true,
        match: true,
      },
    });

    // Create the CSV string with headers
    let csvString = csvHeaders.join(",") + "\n";

    data.map((rm) => {
      const scoredLocs = rm.scoredPieces.map((sp) => {
        return { loc: sp.scoredLocation, type: sp.type };
      });

      const scores = {
        AHcone: 0,
        AHcube: 0,
        AMcone: 0,
        AMcube: 0,
        ALcone: 0,
        ALcube: 0,
        THcone: 0,
        THcube: 0,
        TMcone: 0,
        TMcube: 0,
        TLcone: 0,
        TLcube: 0,
      };
      scoredLocs.map((sl) => {
        if (sl.loc && sl.type) {
          if (sl.loc <= 8) {
            if (sl.type.includes("auto")) {
              if (sl.type.includes("cone")) {
                scores.AHcone += 1;
              } else {
                scores.AHcube += 1;
              }
            } else {
              if (sl.type.includes("cone")) {
                scores.THcone += 1; //Tigh tele cone
              } else {
                scores.THcube += 1; //high tele cube
              }
            }
            //mid stuff
          } else if (sl.loc > 8 && sl.loc <= 17) {
            if (sl.type.includes("auto")) {
              if (sl.type.includes("cone")) {
                scores.AMcone += 1; //mid auto cone
              } else {
                scores.AMcube += 1; //mid auto cube
              }
            } else {
              if (sl.type.includes("cone")) {
                scores.TMcone += 1; //mid tele cone
              } else {
                scores.TMcube += 1; //mid tele cube
              }
            }
          } else if (sl.loc >= 18 && sl.loc <= 35) {
            if (sl.type.includes("auto")) {
              if (sl.type.includes("cone")) {
                scores.ALcone += 1; //low auto cone
              } else {
                scores.ALcube += 1; //low auto cube
              }
            } else {
              if (sl.type.includes("cone")) {
                scores.TLcone += 1; //low tele cone
              } else {
                scores.TLcube += 1; //low tele cube
              }
            }
          }
        }
      });

      //All the column values woohoo
      const csvValues = [
        rm.robot.teamNumber,
        rm.match.matchNumber,
        rm.alliance + " " + rm.station,
        rm.scouter[0]?.id,
        undefined, //start position
        rm.mobility !== undefined ? "1" : "0",
        rm.mobility === "Yes" ? "1" : "0",
        rm.autoBalance !== undefined ? "1" : "0",
        rm.autoBalance === "docked" ? "1" : "0",
        rm.autoBalance === "engaged" ? "1" : "0",
        scores.AHcone,
        scores.AHcube,
        scores.AMcone,
        scores.AMcube,
        scores.ALcone,
        scores.ALcube,
        rm.fouls?.includes("Auto Crossed Line") ? "1" : "0",
        rm.fouls?.includes("2+ Game Elements") ? "1" : "0",
        rm.fouls?.includes("Other Auto Fouls") ? "1" : "0",
        scores.THcone,
        scores.THcube,
        scores.TMcone,
        scores.TMcube,
        scores.TLcone,
        scores.TLcube,
        undefined, //avg Cycle
        "", // csvData.endResult === "Defense Satisfactory" ? "1" : "0",
        "", // csvData.endResult === "Defense Limited" ? "1" : "0",
        rm.fouls?.includes("Damage Opponent") ? "1" : "0",
        rm.fouls?.includes("Tip Opponent") ? "1" : "0",
        rm.fouls?.includes("Excessive Pinning") ? "1" : "0",
        rm.fouls?.includes("Contact in Community Area") ? "1" : "0",
        rm.fouls?.includes("Contact in Substation") ? "1" : "0",
        rm.fouls?.includes("Other Tele Fouls") ? "1" : "0",
        rm.fouls?.includes("Contact in Charge Station") ? "1" : "0",
        undefined, //end position
        rm.endRobots,
        rm.endOrder,
        rm.endResult !== undefined ? "1" : "0",
        rm.endResult === "docked" ? "1" : "0",
        rm.endResult !== undefined ? "1" : "0",
        rm.endResult === "engaged" ? "1" : "0",
        "",
      ];

      // Append the values to the CSV string
      csvString += csvValues.join(",") + "\n";
    });

    // Write the CSV string to a file
    fs.writeFile("data.csv", csvString, (err) => {
      if (err) throw err;
      console.log("CSV file saved");
    });
  }),
});

const csvHeaders = [
  "INFO-TeamNumber",
  "INFO-Match Number",
  "INFO-Alliance",
  "INFO-ScouterID",
  "AUTO-StartPosition",
  "AUTO-MobilityAttempt",
  "AUTO-MobilitySucceed",
  "AUTO-BalanceAttempt",
  "AUTO-DockSucceed",
  "AUTO-EngageSucceed",
  "AUTO-HighCone#",
  "AUTO-HighCube#",
  "AUTO-MidCone#",
  "AUTO-MidCube#",
  "AUTO-LowCone#",
  "AUTO-LowCube#",
  "FOULA-AutoCrossLine",
  "FOUL-A-2+GameElements",
  "FOUL-A-OtherAutoFouls",
  "TELE-HighCone#",
  "TELE-HighCube#",
  "TELE-MidCone#",
  "TELE-MidCube#",
  "TELE-LowCone#",
  "TELE-LowCube#",
  "TELE-AvgCycleTime",
  "TELE-DefenseSatisfactory",
  "TELE-DefenseLimited",
  "FOUL-T-DamageOpp.",
  "FOUL-T-TipOpp.",
  "FOUL-T-ExcessivePinning",
  "FOUL-T-ContInCommunity",
  "FOUL-T-ContInSubstation",
  "FOUL-T-OtherTeleFouls",
  "FOUL-E-ContInChargeSta.",
  "EG-StartPosition",
  "EG-RobotBalanced",
  "EG-BalanceOrder",
  "EG-DockAttempt",
  "EG-DockSucceed",
  "EG-EngageAttempt",
  "EG-EngageSucceed",
  "EG-BalanceTime",
];
