import axios from "axios";
import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import * as fs from "fs";

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

  fetchEventRobots: publicProcedure.query(async () => {
    const data: [any] = await axios.get(
      "https://www.thebluealliance.com/api/v3/event/2023wasno/teams/simple",
      {
        headers: {
          "X-TBA-Auth-Key": process.env.THE_BLUE_ALLIANCE,
        },
      }
    );
    console.log(data);
    // Remove circular references from data
    const eventRobots = data.map((robot) => {
      return {
        name: robot.nickname,
        city: robot.city,
        number: robot.team_number,
      };
    });

    return eventRobots;
  }),
});
