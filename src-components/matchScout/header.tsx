import type { Dispatch } from "react";
import { useState, useEffect } from "react";

import type { TimeAction, TimeState } from "@/utils/matchScout/time";
import type { MatchEventsState, MatchAction } from "@/utils/matchScout/events";
import Button from "src-components/button";
import Link from "next/link";
import { trpc } from "@/utils/trpc";
import { userStore, scheduleStore } from "@/utils/stores";
import type { Match } from "@/utils/stores";
import type { Robot } from "@prisma/client";

interface ScoutHeaderProps {
  matchEvents: MatchEventsState;
  matchDispatch: Dispatch<MatchAction>;
  timeState: TimeState;
  timeDispatch: Dispatch<TimeAction>;
}

export default function ScoutHeader({
  matchEvents,
  matchDispatch,
  timeState,
  timeDispatch,
}: ScoutHeaderProps) {
  const { user } = userStore();
  const { schedule } = scheduleStore();
  const { activeMatch, matchPage } = timeState;

  //Robot Position
  const [robotStationIndex, setRobotStationIndex] = useState(0);
  const robotStation = stationOptions[robotStationIndex];
  const handleNextStation = () => {
    setRobotStationIndex(
      (prevIndex) => (prevIndex + 1) % stationOptions.length
    );
  };

  const [match, setMatch] = useState<Match | undefined>(undefined);
  const [matchSelect, isMatchSelect] = useState(false);
  const [thisRobot, setThisRobot] = useState<Robot | undefined>(undefined);
  const [submitClick, setSubmitClick] = useState(false);
  const scoredLocs = matchEvents.scoredObjects.map((score) => score.scoredLoc);

  const autoTime = (timeState.endTime - timeState.matchTime - 138000) / 1000;
  const teleTime =
    (timeState.endTime - timeState.matchTime) / 1000 >= 0
      ? (timeState.endTime - timeState.matchTime) / 1000
      : 0;

  //Robot Match Data
  useEffect(() => {
    const currentAlliance = robotStation?.split(" ")[0];
    const currentStation = Number(robotStation?.split(" ")[1]) - 1;
    if (match && robotStationIndex) {
      const currentMatch = schedule.find(
        (newMatch) => newMatch.id === match.id
      );
      const matchBot = currentMatch?.robotMatchData.find(
        (robot) =>
          robot.alliance === currentAlliance && robot.station === currentStation
      );
      if (matchBot) {
        matchDispatch({
          type: "SET_ROBOT",
          robotInfo: {
            robotId: matchBot.robot.teamNumber,
            alliance: matchBot.alliance,
            station: matchBot.station,
            matchId: currentMatch?.id as number,
          },
        });
        setThisRobot(matchBot.robot);
      }
    } else {
      setThisRobot(undefined);
    }
  }, [match, robotStationIndex]);

  //Scouter
  useEffect(() => {
    matchDispatch({ type: "SET_SCOUTER", scouterId: user.scouterId });
  }, [user]);

  //Create a useEffect that has a dependency array for when a scored piece is submitted.
  useEffect(() => {
    console.log("use effecting");
    const teleObjects = matchEvents.scoredObjects.filter((obj) =>
      obj.type?.includes("tele")
    );

    const newObjectIndex = matchEvents.scoredObjects.findIndex(
      (obj) => obj.cycleTime === undefined && obj.type?.includes("tele")
    );

    const alreadyScoredCycleTime = teleObjects
      .filter((obj) => obj.cycleTime !== undefined)
      .reduce(
        (total, obj) => (obj.cycleTime ? total + obj.cycleTime : total),
        0
      ); // sum the already scored cycle times

    const cycleTime = Math.max(0, 135 - alreadyScoredCycleTime - teleTime); // calculate the cycle time

    if (newObjectIndex !== undefined) {
      matchDispatch({
        type: "SET_CYCLE_TIME",
        payload: {
          newObjectIndex: newObjectIndex,
          cycleTime: cycleTime,
        },
      });
    }

    //Locate the last tele object that has a scored piece without a cycle time.
    //Sum the already scored pieces cycle times together.
    //135 - SUM - remaining match time = cycle time.
    //Set cycle time
  }, [matchEvents.scoredObjects.length]);

  const m = matchEvents;
  const SO = m.scoredObjects.map((score) => {
    return {
      type: score.type as string,
      scoredLocation: score.scoredLoc,
      cycleTime: score.cycleTime,
      pickupLocation: score.pickupLoc as string | undefined,
      pickupOrientation: score.pickupOrient as string | undefined,
      delayed: score.delayed as string | undefined,
    };
  });

  const dataSubmission = {
    scouter: user.scouterId,
    startingLocation: m.startingLoc,
    mobility: m.mobility as unknown as string | undefined,
    autoBalancing: m.autoBalancing as unknown as string | undefined,
    endRobots: m.endgameBalancing.numberOfRobots,
    endOrder: m.endgameBalancing.order,
    endResult: m.endgameBalancing.result,
    fouls: m.fouls as unknown as string[],
    defense: m.defense,
    feedback: m.feedback,
    scoredPieces: SO,
    //Fix this later
    matchId: m.matchId as number,
    robotId: m.robotId as number,
    alliance: m.alliance as string,
    station: m.station as number,
  };

  const { error } = trpc.match.submitMatch.useQuery(dataSubmission, {
    enabled: Boolean(submitClick),
    onError(err) {
      console.log(err);
    },
    onSuccess(res) {
      setSubmitClick(false);
      matchDispatch({ type: "RESET_MATCH" });
      timeDispatch({ type: "END_MATCH" });
    },
  });

  switch (matchPage) {
    case "before":
      return (
        <>
          <div className="flex w-full justify-between p-7.5 ">
            <div className="flex  items-center gap-7.5">
              <Link href={"/"}>
                <Button className="">Home</Button>
              </Link>
              <div className="flex flex-col ">
                <div className=" pb-1 text-3xl font-bold">
                  <span
                    className="relative border border-cpr-blue-dark bg-cpr-blue-light p-2"
                    onClick={() => isMatchSelect(!matchSelect)}
                  >
                    Match {match?.matchNumber ? match.matchNumber : "?"}
                    {matchSelect && (
                      <div className="absolute top-0 z-10 h-60 w-60 overflow-y-auto border border-cpr-blue-dark bg-gray-100 p-2 text-xl">
                        {schedule.map((match, index) => {
                          return (
                            <div
                              key={index}
                              className="cursor-pointer border-t border-gray-500 py-2 text-center"
                              onClick={(e) => {
                                e.stopPropagation();
                                setMatch(match);
                                isMatchSelect(false);
                              }}
                            >
                              Match {match.matchNumber}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </span>{" "}
                  -{" "}
                  <span
                    className="cursor-pointer border border-cpr-blue-dark bg-cpr-blue-light p-2"
                    onClick={() => handleNextStation()}
                  >
                    {robotStation}
                  </span>
                </div>
                <div className="pt-2 text-3xl">
                  Team {thisRobot?.teamNumber ? thisRobot.teamNumber : "?"}
                </div>
              </div>
            </div>
            <div className="flex gap-2.5 font-bold">
              <Link href={"/login"}>
                <Button className="">
                  {user.scouterId ? user.name : "Log In"}
                </Button>
              </Link>
              <Button className="">No Show</Button>
              {!activeMatch && (
                <Button
                  className={`${
                    thisRobot && user.scouterId ? "" : "w-40 bg-gray-100"
                  }`}
                  onClick={() => {
                    // thisRobot && user.scouterId
                    //   ? timeDispatch({ type: "START_MATCH" })
                    //   : undefined;
                    timeDispatch({ type: "START_MATCH" });
                  }}
                >
                  Start
                </Button>
              )}
              {activeMatch && (
                <Button
                  className=""
                  onClick={() => {
                    timeDispatch({ type: "CHANGE_PAGE", page: "auto" });
                  }}
                >
                  Continue
                </Button>
              )}
            </div>
          </div>
        </>
      );
    case "auto":
      return (
        <>
          <div className="flex w-full justify-between p-7.5 ">
            <div className="flex  items-center gap-7.5">
              <Button
                className=""
                onClick={() =>
                  timeDispatch({ type: "CHANGE_PAGE", page: "before" })
                }
              >
                Back
              </Button>
              <div className="flex flex-col ">
                <div className="text-3xl font-bold">Autonomous</div>
                <div className="text-3xl">
                  Team {thisRobot?.teamNumber ? thisRobot.teamNumber : "?"}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2.5 font-bold">
              <Button
                className="w-15 pb-2 text-4xl"
                onClick={() =>
                  timeDispatch({ type: "ADJUST_TIME", increase: -1000 })
                }
              >
                +
              </Button>
              <div className="text-3xl font-bold">
                {autoTime > 0
                  ? autoTime
                  : autoTime > -3
                  ? "Switching"
                  : "Complete"}
              </div>
              <Button
                className="w-15 pb-2 text-4xl"
                onClick={() =>
                  timeDispatch({ type: "ADJUST_TIME", increase: 1000 })
                }
              >
                -
              </Button>

              <Button
                className=""
                onClick={() =>
                  timeDispatch({ type: "CHANGE_PAGE", page: "tele" })
                }
              >
                Tele Op
              </Button>
            </div>
          </div>
        </>
      );
    case "tele":
      return (
        <>
          <div className="flex w-full justify-between p-7.5 ">
            <div className="flex  items-center gap-7.5">
              <Button
                className=""
                onClick={() =>
                  timeDispatch({ type: "CHANGE_PAGE", page: "auto" })
                }
              >
                Back
              </Button>
              <div className="flex flex-col ">
                <div className="text-3xl font-bold">Tele-Op</div>
                <div className="text-3xl">
                  Team {thisRobot?.teamNumber ? thisRobot.teamNumber : "?"}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2.5 font-bold">
              <Button
                className="w-15 pb-2 text-4xl"
                onClick={() =>
                  timeDispatch({ type: "ADJUST_TIME", increase: -1000 })
                }
              >
                +
              </Button>
              <div className="text-3xl font-bold">
                {teleTime > 135 ? "In Auto" : teleTime}
              </div>
              <Button
                className="w-15 pb-2 text-4xl"
                onClick={() =>
                  timeDispatch({ type: "ADJUST_TIME", increase: 1000 })
                }
              >
                -
              </Button>

              <Button
                className=""
                onClick={() =>
                  timeDispatch({ type: "CHANGE_PAGE", page: "endgame" })
                }
              >
                End Game
              </Button>
            </div>
          </div>
        </>
      );
    case "endgame":
      return (
        <>
          <div className="flex w-full justify-between p-7.5 ">
            <div className="flex  items-center gap-7.5">
              <Button
                className=""
                onClick={() =>
                  timeDispatch({ type: "CHANGE_PAGE", page: "tele" })
                }
              >
                Back
              </Button>
              <div className="flex flex-col ">
                <div className="text-3xl font-bold">Endgame</div>
                <div className="text-3xl">
                  Team {thisRobot?.teamNumber ? thisRobot.teamNumber : "?"}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2.5 font-bold">
              <Button
                className="w-15 pb-2 text-4xl"
                onClick={() =>
                  timeDispatch({ type: "ADJUST_TIME", increase: -1000 })
                }
              >
                +
              </Button>
              <div className="text-3xl font-bold">
                {teleTime > 120 ? "In Auto" : teleTime}
              </div>
              <Button
                className="w-15 pb-2 text-4xl"
                onClick={() =>
                  timeDispatch({ type: "ADJUST_TIME", increase: 1000 })
                }
              >
                -
              </Button>

              <Button
                className=""
                onClick={() => {
                  setSubmitClick(true);
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </>
      );
    case "review":
      return (
        <>
          {/* <div className='w-full flex justify-between p-7.5 '>
                    <div className='flex  items-center gap-7.5'>
                        <Button className='' onClick={() => timeDispatch({type: 'CHANGE_PAGE', page: 'endgame'})}>Back</Button>
                        <div className="flex flex-col ">
                            <div className='font-bold text-3xl'>Review</div>
                            <div className='text-3xl'>Team #####</div>
                        </div>
                    </div>
                    <div className='flex gap-2.5 font-bold justify-center items-center'>



                    <Button className='' onClick={() => {

                        timeDispatch({type: 'CHANGE_PAGE', page: 'before'})
                        
                        }}>Submit</Button>
                    </div>
                </div> */}
        </>
      );
  }
}

type options =
  | "?"
  | "red 1"
  | "red 2"
  | "red 3"
  | "blue 1"
  | "blue 2"
  | "blue 3";
const stationOptions: options[] = [
  "?",
  "red 1",
  "red 2",
  "red 3",
  "blue 1",
  "blue 2",
  "blue 3",
];
