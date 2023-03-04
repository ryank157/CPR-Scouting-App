import { router, publicProcedure, protectedProcedure } from "../trpc";
import prisma from "@/utils/prisma";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can see this secret message!";
  }),
  uploadScouters: publicProcedure.query(async () => {
    // scouters.forEach(async (scout) => {
    //   const segments = scout.split(",");
    //   if (segments[1] && segments[2]) {
    //     await prisma.scouter.create({
    //       data: {
    //         name: segments[1],
    //         scouterId: segments[2],
    //       },
    //     });
    //   }
    // });
    return "yay";
  }),
  fetchScouters: publicProcedure.query(async () => {
    const data = await prisma.scouter.findMany();
    return data;
  }),
});

// const scouters = [
//   "0, Guest, C4E",
//   "1,Ava Huff,A1A",
//   "2,Kathleen Kelley,A1B",
//   "3,Noah Repp,A1C",
//   "6,Isaac Kim,A2A",
//   "7,Malia Labenia,A2B",
//   "8,Natalie Shaw,A2C",
//   "9,Takeshi Tanaka,A2D",
//   "11,Dima Bondarenko,A3A",
//   "12,Gabe Hargrave,A3B",
//   "13,Julia Schlecht,A3C",
//   "14,Gabe Huff,A3D",
//   "15,,A3E",
//   "16,Chip Tang,A4A",
//   "17,Ryan King,A4B",
//   "18,Dr. Kristi King,A4C",
//   "19,Jon Repp,A4D",
//   "20,Layla Huff,A4E",
//   "21,Erica Christiansen,A5A",
//   "22,Bri Christiansen,A5B",
//   "23,Benjamin Bissell,A5C",
//   "26,Ryan Sitzmann,B1A",
//   "27,Sam Lee,B1B",
//   "28,Vincent Goins,B1C",
//   "29,Gabe Hirata,B1D",
//   "30,Zack Hargrave,B1E",
//   "31,Tiffany Lockwood,B2A",
//   "32,Gabe Martin,B2B",
//   "33,Logan Baever,B2C",
//   "36,Connor Herzog,B3A",
//   "37,Adam Shaffer,B3B",
//   "38,Casey Graves,B3C",
//   "39,Ayden Primc,B3D",
//   "41,Scott Christiansen,B4A",
//   "42,David Boller,B4B",
//   "43,Jean Boller,B4C",
//   "44,Jeff Bissell,B4D",
//   "45,Jesse Hoffman,B4E",
//   "46,Joel Sander,B5A",
//   "47,John Grotte,B5B",
//   "48,Matthew Christiansen,B5C",
//   "49,Ryan Huff,B5D",
//   "51,Will Tomasini,C1A",
//   "52,Timothy So,C1B",
//   "53,Joshua Rus,C1C",
//   "54,Kaitlin Moody,C1D",
//   "61,Isaac Lee,C3A",
//   "62,Liana Mendakoff,C3B",
//   "63,Jesselyn Hong,C3C",
//   "66,Fran Yang,C4A",
//   "67,Richard Elmore,C4B",
//   "68,Jacob Bublitz,C4C",
//   "69,Iris Cai,C4D",
// ];
