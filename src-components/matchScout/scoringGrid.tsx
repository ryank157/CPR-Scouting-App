import type { ScoringGrid } from "@/pages/matchScout";
import type { Dispatch } from "react";
import { useState, useEffect } from "react";
import type { MatchPage, TimeAction, TimeState } from "@/utils/matchScout/time";

import type {
  MatchEventsState,
  MatchAction,
  ScoredObject,
  ScoringTypes,
} from "@/utils/matchScout/events";

interface ScoringGridProps {
  timeState: TimeState;
  timeDispatch: Dispatch<TimeAction>;
  matchEvents: MatchEventsState;
  matchDispatch: Dispatch<MatchAction>;

  cSO?: ScoredObject;
}

export default function ScoringGrid({
  matchEvents,
  matchDispatch,
  timeState,

  cSO,
}: ScoringGridProps) {
  const grid: string[][] = Array(3).fill(Array(9).fill(""));

  const { scoredObjects } = matchEvents;
  const { matchPage } = timeState;

  return (
    <div className="flex flex-col">
      <div className="relative flex flex-wrap justify-center">
        <div className="flex w-15 items-center justify-center">
          <div className="-rotate-90 transform whitespace-nowrap text-3xl">
            Feeder Station
          </div>
        </div>
        <div className="flex flex-col">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex + 100} className="flex gap-[2px] pb-[2px]">
              {row.map((cell, cellIndex) => {
                if (rowIndex === 0 || rowIndex === 1) {
                  const gridLoc = rowIndex * 9 + cellIndex;
                  return (
                    <div
                      key={gridLoc}
                      className={cellClasses(gridLoc, scoredObjects, matchPage)}
                      onClick={() => {
                        matchDispatch({
                          type: "ADD_SCORE_DETAILS",
                          newScore: {
                            ...cSO,
                            type: scoredType(gridLoc, matchPage),
                            scoredLoc: gridLoc,
                          },
                        });
                      }}
                    ></div>
                  );
                } else {
                  const gridLoc = rowIndex * 9 + cellIndex * 2;
                  const diagSlots = [gridLoc, gridLoc + 1];
                  return (
                    <div
                      key={gridLoc + 1000}
                      className={`${cellClasses(
                        gridLoc,
                        scoredObjects,
                        matchPage
                      )} relative overflow-hidden `}
                    >
                      <div className="absolute top-1/2 left-1/2 grid h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rotate-45 transform grid-cols-2 grid-rows-1">
                        {diagSlots.map((slotLoc) => {
                          return (
                            <div
                              key={slotLoc}
                              className=""
                              onClick={
                                () => {
                                  matchDispatch({
                                    type: "ADD_SCORE_DETAILS",
                                    newScore: {
                                      ...cSO,
                                      type: scoredType(slotLoc, matchPage),
                                      scoredLoc: slotLoc,
                                    },
                                  });
                                }
                                //If not scored already do add score details
                              }
                            ></div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          ))}
        </div>
        <div className="flex w-15 items-center justify-center">
          <div className="rotate-90 transform whitespace-nowrap text-3xl">
            Void
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4 pt-2">
        <div
          className="z-10 cursor-pointer rounded-xl border border-inactive-border bg-inactive-bg px-4 py-1  active:bg-cpr-blue-light"
          onClick={() => {
            const droppedCount = matchEvents.scoredObjects.filter((score) =>
              score.type?.includes("dropped")
            ).length;
            matchDispatch({
              type: "ADD_SCORE_DETAILS",
              newScore: {
                ...cSO,
                type: matchPage === "auto" ? "auto-dropped" : "dropped",
                scoredLoc: 50 + droppedCount,
              },
            });
          }}
        >
          Dropped
        </div>
        <div
          className="z-10 cursor-pointer rounded-xl border border-inactive-border bg-inactive-bg px-4 py-1  active:bg-cpr-blue-light"
          onClick={() => {
            const launchedCount = matchEvents.scoredObjects.filter((score) =>
              score.type?.includes("launched")
            ).length;
            matchDispatch({
              type: "ADD_SCORE_DETAILS",
              newScore: {
                ...cSO,
                type: matchPage === "auto" ? "auto-launched" : "launched",
                scoredLoc: 100 + launchedCount,
              },
            });
          }}
        >
          Launched
        </div>
      </div>
    </div>
  );
}

const cellClasses = (
  gridLoc: number,
  scoredObjects: ScoredObject[],
  matchPage: MatchPage
) => {
  //Need to cut the renders WAY down somehow
  const cones = [0, 2, 3, 5, 6, 8, 9, 11, 12, 14, 15, 17];
  const cubes = [1, 4, 7, 10, 13, 16];
  const groundCones = [18, 20, 22, 24, 26, 28, 30, 32, 34];
  const groundCubes = [19, 21, 23, 25, 27, 29, 31, 33, 35];

  let bgImage = "";
  const scoredLocsSet = new Set<number>();
  scoredObjects.forEach((score) => {
    if (typeof score.scoredLoc !== "undefined") {
      scoredLocsSet.add(score.scoredLoc);
    }
  });

  const thisScore = scoredObjects.find((score) => score.scoredLoc === gridLoc);
  let groundCubeScore = undefined;
  if (gridLoc > 17) {
    groundCubeScore = scoredObjects.find(
      (score) => score.scoredLoc === gridLoc + 1
    );
  }
  //if scored
  // if((scoredLocsSet.has(gridLoc))) {
  if (thisScore || groundCubeScore) {
    //If scoredType auto
    //If top 2 rows
    if (gridLoc <= 17 && thisScore?.scoredLoc === gridLoc) {
      //Auto
      if (thisScore?.type === "auto-cone") {
        bgImage = "bg-inactive-border";
      }
      if (thisScore?.type === "auto-cube") {
        bgImage = "bg-inactive-border";
      }
      //Tele
      if (thisScore?.type === "tele-cone") {
        bgImage = "bg-cone-filled border border-orange-400";
      }
      if (thisScore?.type === "tele-cube") {
        bgImage = "bg-cube-filled border border-blue-700";
      }
      //If bottom row cone
    } else if (gridLoc > 17 && thisScore?.scoredLoc === gridLoc) {
      //Auto
      if (thisScore?.type === "auto-cone") {
        bgImage = "bg-inactive-border";
        //Tele
      } else if (thisScore?.type === "tele-cone") {
        bgImage = "bg-bottom-cone border border-orange-400";
      }
      //If bottom row cube
    } else if (gridLoc > 17 && groundCubeScore?.scoredLoc === gridLoc + 1) {
      //Auto
      if (groundCubeScore?.type === "auto-cube") {
        bgImage = "bg-inactive-border";
        //Tele
      } else if (groundCubeScore?.type === "tele-cube") {
        bgImage = "bg-bottom-cube border border-blue-700";
      }
    }
    //if not scored
  } else {
    if (cones.includes(gridLoc)) {
      bgImage = "bg-cone-empty";
    } else if (cubes.includes(gridLoc)) {
      bgImage = "bg-cube-empty";
    } else if (groundCones.includes(gridLoc)) {
      bgImage = "bg-bottom-empty";
    } else if (groundCubes.includes(gridLoc)) {
      bgImage = "bg-bottom-empty";
    }
  }
  //default cell

  let styling = `w-[88px] h-[88px] flex justify-center items-center border bg-cover bg-center ${bgImage}`;

  if ([2, 5, 11, 14, 22, 28].includes(gridLoc)) {
    styling += " mr-2";
  }

  return styling;
};

function scoredType(gridLoc: number, matchPage: MatchPage): ScoringTypes {
  const cones = [0, 2, 3, 5, 6, 8, 9, 11, 12, 14, 15, 17];
  const cubes = [1, 4, 7, 10, 13, 16];
  const groundCones = [18, 20, 22, 24, 26, 28, 30, 32, 34];
  const groundCubes = [19, 21, 23, 25, 27, 29, 31, 33, 35];

  let scoredType: ScoringTypes = undefined;

  if (cones.includes(gridLoc) || groundCones.includes(gridLoc)) {
    if (matchPage === "auto") {
      scoredType = "auto-cone";
    } else if (matchPage === "tele") {
      scoredType = "tele-cone";
    } else {
      scoredType = undefined;
    }
  } else if (cubes.includes(gridLoc) || groundCubes.includes(gridLoc)) {
    if (matchPage === "auto") {
      scoredType = "auto-cube";
    } else if (matchPage === "tele") {
      scoredType = "tele-cube";
    } else {
      scoredType = undefined;
    }
  }
  return scoredType;
}
