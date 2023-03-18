import type { Dispatch } from "react";
import { useEffect, useState, useMemo } from "react";
import type { TimeState, TimeAction } from "@/utils/matchScout/time";
import type { MatchAction, MatchEventsState } from "@/utils/matchScout/events";
import ScoringGrid from "./scoringGrid";
import TeleButton from "src-components/teleButton";

interface TeleProps {
  matchEvents: MatchEventsState;
  matchDispatch: Dispatch<MatchAction>;

  timeState: TimeState;
  timeDispatch: Dispatch<TimeAction>;
}

export const TeleScout: React.FC<TeleProps> = (props: TeleProps) => {
  const { matchEvents, matchDispatch, timeState, timeDispatch } = props;
  const [cSO, setCSO] = useState(
    matchEvents.scoredObjects[matchEvents.scoredObjects.length - 1]
  );

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  const memoizedScoringGrid = useMemo(() => {
    return (
      <ScoringGrid
        timeState={timeState}
        timeDispatch={timeDispatch}
        matchEvents={matchEvents}
        matchDispatch={matchDispatch}
      />
    );
  }, [matchEvents]);

  useEffect(() => {
    setCSO(matchEvents.scoredObjects[matchEvents.scoredObjects.length - 1]);
  }, [matchEvents.scoredObjects]);

  return (
    <div className="flex w-full flex-col justify-center">
      {memoizedScoringGrid}

      <div className="mt-4 flex h-full w-full justify-center gap-[10px] pb-3">
        <div className="flex flex-col">
          <div className="mb-1.25 text-center text-xl font-semibold">
            Current Cycle
          </div>
          <div className="flex">
            <div className="mr-1.5 flex h-full w-15 items-center justify-center border p-2">
              <div className="-rotate-90 transform whitespace-nowrap text-lg">
                Cycle Mode
              </div>
            </div>
            <div className="grid h-[200px] w-[578px] grid-cols-3 grid-rows-4 border-2 border-inactive-border ">
              <div className=" cols-span-1 row-span-4 ">
                <div className="row-span-1 flex h-[40px] w-full items-center justify-center border-b border-inactive-border text-lg">
                  Pickup Loc.
                </div>
                <div className="row-span-3 grid gap-[7px] border-r border-inactive-border py-[6px] px-3">
                  <TeleButton
                    variant={cSO?.pickupLoc === "feeder"}
                    onClick={() =>
                      matchDispatch({
                        type: "ADD_SCORE_DETAILS",
                        newScore: { ...cSO, pickupLoc: "feeder" },
                      })
                    }
                  >
                    Feeder
                  </TeleButton>
                  <TeleButton
                    variant={cSO?.pickupLoc === "middle"}
                    onClick={() =>
                      matchDispatch({
                        type: "ADD_SCORE_DETAILS",
                        newScore: { ...cSO, pickupLoc: "middle" },
                      })
                    }
                  >
                    Middle
                  </TeleButton>
                  <TeleButton
                    variant={cSO?.pickupLoc === "community"}
                    onClick={() =>
                      matchDispatch({
                        type: "ADD_SCORE_DETAILS",
                        newScore: { ...cSO, pickupLoc: "community" },
                      })
                    }
                  >
                    Community
                  </TeleButton>
                </div>
              </div>
              <div className=" cols-span-1 row-span-4">
                <div className="row-span-1 flex h-[40px] w-full items-center justify-center border-b border-inactive-border text-lg">
                  Orientation
                </div>
                <div className="row-span-3 grid gap-[7px] border-r border-inactive-border py-[6px] px-3 ">
                  <TeleButton
                    variant={cSO?.pickupOrient === "upright"}
                    onClick={() =>
                      matchDispatch({
                        type: "ADD_SCORE_DETAILS",
                        newScore: { ...cSO, pickupOrient: "upright" },
                      })
                    }
                  >
                    Upright
                  </TeleButton>
                  <TeleButton
                    variant={cSO?.pickupOrient === "side"}
                    onClick={() =>
                      matchDispatch({
                        type: "ADD_SCORE_DETAILS",
                        newScore: { ...cSO, pickupOrient: "side" },
                      })
                    }
                  >
                    Side
                  </TeleButton>

                  <div className="h-10">&nbsp;</div>
                </div>
              </div>
              <div className=" cols-span-1 row-span-4 ">
                <div className="row-span-1 flex h-[40px] w-full items-center justify-center border-b border-inactive-border text-lg">
                  Delay
                </div>
                <div className="row-span-3 grid gap-[7px] py-[6px] px-3">
                  <TeleButton
                    variant={cSO?.delayed === "obstructed"}
                    onClick={() =>
                      matchDispatch({
                        type: "ADD_SCORE_DETAILS",
                        newScore: { ...cSO, delayed: "obstructed" },
                      })
                    }
                  >
                    Obstructed
                  </TeleButton>
                  <TeleButton
                    variant={cSO?.delayed === "defended"}
                    onClick={() =>
                      matchDispatch({
                        type: "ADD_SCORE_DETAILS",
                        newScore: { ...cSO, delayed: "defended" },
                      })
                    }
                  >
                    Defended
                  </TeleButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-[310px] flex-col">
          <div className="mb-1.25 text-center text-xl font-semibold">
            Cycle History
          </div>
          <div className="h-[200px] overflow-auto  border-2 border-inactive-border">
            <div className="flex h-[48px] items-center justify-center border-b border-inactive-border text-center text-xl">
              <div className="w-1/4">#</div>
              <div className="w-1/4">Time</div>
              <div className="w-1/4">Piece</div>
              <div className="w-1/4">Edit</div>
            </div>
            <div className="flex h-[148px] flex-col text-center ">
              {matchEvents.scoredObjects.map((score, index) => {
                let scoreType = "";
                score.type?.includes("auto") ? (scoreType += "a") : "";
                score.type?.includes("cube")
                  ? (scoreType += "cube")
                  : (scoreType += "cone");
                return (
                  score.scoredLoc !== undefined && (
                    <div key={index} className="flex">
                      <div className="w-1/4">{index + 1}</div>
                      <div className="w-1/4">
                        {score.type?.includes("auto") ? " " : score.cycleTime}
                      </div>
                      <div className="w-1/4">{scoreType}</div>
                      <div className="w-1/4">N/A</div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
