import { type NextPage } from "next";
import Link from "next/link";
import Button from "src-components/button";
import userStore from "@/utils/stores";
import { scheduleStore } from "@/utils/stores";
import { useState, useEffect } from "react";
import type { Match } from "@/utils/stores";

const Schedule: NextPage = () => {
  const { user } = userStore();
  const [schedule, setSchedule] = useState<Match[]>([]);
  const storeSchedule = scheduleStore().schedule;

  useEffect(() => {
    // Synchronize the state with the scheduleStore on the client-side
    if (storeSchedule) {
      setSchedule(storeSchedule);
    }
  }, []);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full justify-between p-7.5 ">
        <div className="flex  items-center gap-7.5">
          <Link href={"/"}>
            <Button className="">Back</Button>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-2.5 font-bold">
          {user.name ? (
            <>
              <div>Signed in as:</div>
              <Button className="w-60"> {user.name}</Button>
            </>
          ) : (
            <div>Not Signed in</div>
          )}
        </div>
      </div>
      <div className="flex w-[90%] flex-col border border-black">
        <div className="flex items-center justify-center  text-center">
          <div className="w-[10%] border-r py-2">#</div>
          <div className="w-[15%] border-r py-2">Red 1</div>
          <div className="w-[15%] border-r py-2">Red 2</div>
          <div className="w-[15%] border-r py-2">Red 3</div>
          <div className="w-[15%] border-r py-2">Blue 1</div>
          <div className="w-[15%] border-r py-2">Blue 2</div>
          <div className="w-[15%]  py-2">Blue 3</div>
        </div>
        {schedule &&
          schedule.map((match, index) => {
            const red1 = match.robotMatchData.find(
              (robotMatch) =>
                robotMatch.alliance === "red" && robotMatch.station === 0
            );
            const red2 = match.robotMatchData.find(
              (robotMatch) =>
                robotMatch.alliance === "red" && robotMatch.station === 1
            );
            const red3 = match.robotMatchData.find(
              (robotMatch) =>
                robotMatch.alliance === "red" && robotMatch.station === 2
            );
            const blue1 = match.robotMatchData.find(
              (robotMatch) =>
                robotMatch.alliance === "blue" && robotMatch.station === 0
            );
            const blue2 = match.robotMatchData.find(
              (robotMatch) =>
                robotMatch.alliance === "blue" && robotMatch.station === 1
            );
            const blue3 = match.robotMatchData.find(
              (robotMatch) =>
                robotMatch.alliance === "blue" && robotMatch.station === 2
            );

            // For Red Alliance
            const redAllianceBg = index % 2 === 0 ? "bg-red-200" : "bg-red-100";
            const greenBg = "bg-green-200";

            // For Blue Alliance
            const blueAllianceBg =
              index % 2 === 0 ? "bg-blue-200" : "bg-blue-100";

            return (
              <div
                key={index}
                className="flex w-full border-b border-black text-center"
              >
                <div
                  className={`w-[10%] border-r ${
                    index % 2 === 0 ? "bg-gray-200" : ""
                  }`}
                >
                  {match.matchNumber}
                </div>
                <div
                  className={`w-[15%] border-r ${
                    red1?.robot.teamNumber === 3663 ? greenBg : redAllianceBg
                  }`}
                >
                  {red1?.robot.teamNumber}
                </div>
                <div
                  className={`w-[15%] border-r ${
                    red2?.robot.teamNumber === 3663 ? greenBg : redAllianceBg
                  }`}
                >
                  {red2?.robot.teamNumber}
                </div>
                <div
                  className={`w-[15%] border-r ${
                    red3?.robot.teamNumber === 3663 ? greenBg : redAllianceBg
                  }`}
                >
                  {red3?.robot.teamNumber}
                </div>
                <div
                  className={`w-[15%] border-r ${
                    blue1?.robot.teamNumber === 3663 ? greenBg : blueAllianceBg
                  }`}
                >
                  {blue1?.robot.teamNumber}
                </div>
                <div
                  className={`w-[15%] border-r ${
                    blue2?.robot.teamNumber === 3663 ? greenBg : blueAllianceBg
                  }`}
                >
                  {blue2?.robot.teamNumber}
                </div>
                <div
                  className={`w-[15%] ${
                    blue3?.robot.teamNumber === 3663 ? greenBg : blueAllianceBg
                  }`}
                >
                  {blue3?.robot.teamNumber}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Schedule;
