import axios from "axios";
import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const tbaRouter = router({
  getTBAData: publicProcedure.query(async () => {
    const data = await axios
      .get("https://www.thebluealliance.com/api/v3/status", {
        headers: {
          "X-TBA-Auth-Key": process.env.THE_BLUE_ALLIANCE,
        },
      })
      .then((res) => {
        return res.data;
      });

    return data;
  }),
});
