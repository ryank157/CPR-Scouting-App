import type { Dispatch } from "react";
import { useState } from "react";
import { initialMatchState } from "@/utils/matchScout/events";

import type { TimeAction, TimeState } from "@/utils/matchScout/time";
import type { MatchEventsState, MatchAction } from "@/utils/matchScout/events";
import Button from "src-components/button";
import Link from "next/link";
import { trpc } from "@/utils/trpc";
import userStore from "@/utils/stores";

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
  const { name } = userStore();
  const { activeMatch, startTime, matchTime, endTime, adjustment, matchPage } =
    timeState;

  const autoTime = (timeState.endTime - timeState.matchTime - 123000) / 1000;
  const teleTime =
    (timeState.endTime - timeState.matchTime) / 1000 >= 0
      ? (timeState.endTime - timeState.matchTime) / 1000
      : 0;
  const [submitClick, setSubmitClick] = useState(false);

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
    scouter: "Timmy",
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
  };

  const { error } = trpc.match.submitMatch.useQuery(dataSubmission, {
    enabled: Boolean(submitClick),
    onError(err) {
      console.log(err);
    },
    onSuccess(res) {
      setSubmitClick(false);
      matchDispatch({ type: "RESET_MATCH" });
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
                <div className="text-3xl font-bold">Match # - Pos</div>
                <div className="text-3xl">Team #####</div>
              </div>
            </div>
            <div className="flex gap-2.5 font-bold">
              <Link href={"/login"}>
                <Button className="">{name ? name : "Log In"}</Button>
              </Link>
              <Button className="">No Show</Button>
              {!activeMatch && (
                <Button
                  className=""
                  onClick={() => {
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
                <div className="text-3xl">Team #####</div>
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
                <div className="text-3xl">Team #####</div>
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
                <div className="text-3xl">Team #####</div>
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

                  timeDispatch({ type: "END_MATCH" });
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
