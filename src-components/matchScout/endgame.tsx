import type { Dispatch } from "react";
import type { TimeState, TimeAction } from "@/utils/matchScout/time";
import type { MatchAction, MatchEventsState } from "@/utils/matchScout/events";
import { useState, useEffect } from "react";

import EndgameButton from "src-components/endgameButton";

interface EndgameProps {
  matchEvents: MatchEventsState;
  matchDispatch: Dispatch<MatchAction>;

  timeState: TimeState;
  timeDispatch: Dispatch<TimeAction>;
}

export const EndgameScout: React.FC<EndgameProps> = (props: EndgameProps) => {
  const { matchEvents, matchDispatch } = props;
  const [feedback, setFeedback] = useState(matchEvents.feedback || "");
  const endLocs = [0, 1, 2, 3, 4, 5];
  const endLocsRed = [3, 4, 5, 0, 1, 2];

  console.log(matchEvents);
  const endGameColors = matchEvents.alliance?.includes("red")
    ? ["bg-red-400", "bg-red-600"]
    : ["bg-blue-400", "bg-blue-600"];

  return (
    <div className="flex w-full justify-center pt-[35px] ">
      <div className="flex w-1/2 flex-col items-center justify-center">
        <div className="flex items-center justify-center pb-[26px] text-xl font-bold">
          Start Position
        </div>
        <div
          className={`relative h-[500px] w-[427px] ${
            matchEvents.alliance?.includes("red")
              ? "bg-endgame-red"
              : "bg-endgame-blue"
          } bg-contain bg-center bg-no-repeat`}
        >
          {!matchEvents.endgameBalancing.endingLoc && (
            <div className="absolute translate-x-4 translate-y-10 text-3xl font-bold">
              {matchEvents.alliance?.includes("red") ? (
                <span>&larr; Community | Middle &rarr; </span>
              ) : (
                <span>&larr; Middle | Community &rarr; </span>
              )}
            </div>
          )}
          {endLocs.map((location, index) => {
            const position =
              index < 3
                ? { top: 105 + 98 * index, left: 55 }
                : { top: 105 + 98 * (index - 3), right: 35 };
            return (
              <div key={index}>
                {matchEvents.alliance?.includes("red") && (
                  <div
                    className={`absolute flex h-[100px] w-[50px] -translate-x-5 cursor-pointer items-center justify-center border-2 border-black p-2 text-xl font-medium transition-all duration-300 ease-in  ${
                      matchEvents.endgameBalancing.endingLoc === undefined
                        ? "animate-pulse " + endGameColors[0]
                        : matchEvents.endgameBalancing.endingLoc ===
                          endLocsRed[index]
                        ? endGameColors[1]
                        : "opacity-50"
                    }`}
                    style={position}
                    onClick={() => {
                      matchDispatch({
                        type: "SET_ENDGAME_BALANCING",
                        endgame: {
                          ...matchEvents.endgameBalancing,
                          endingLoc: endLocsRed[index],
                        },
                      });
                    }}
                  >
                    {endLocsRed[index]}
                  </div>
                )}
                {matchEvents.alliance?.includes("blue") && (
                  <div
                    className={`absolute flex h-[100px] w-[50px] cursor-pointer items-center justify-center border-2 border-black p-2 text-xl font-medium transition-all duration-300 ease-in  ${
                      matchEvents.endgameBalancing.endingLoc === undefined
                        ? "animate-pulse " + endGameColors[0]
                        : matchEvents.endgameBalancing.endingLoc === index
                        ? endGameColors[1]
                        : "opacity-50"
                    }`}
                    style={position}
                    onClick={() => {
                      matchDispatch({
                        type: "SET_ENDGAME_BALANCING",
                        endgame: {
                          ...matchEvents.endgameBalancing,
                          endingLoc: index,
                        },
                      });
                    }}
                  >
                    {index}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex w-1/2 flex-col justify-between">
        <div className="flex flex-col items-center justify-center gap-y-6">
          <div className="flex items-center justify-center pb-0.5 text-xl font-bold">
            Balance
          </div>
          <div className="col-span-4 row-span-1 grid grid-cols-4 gap-6 ">
            <div className="col-span-1 flex w-25 items-center justify-start text-xl font-bold">
              Number
            </div>
            <EndgameButton
              variant={matchEvents.endgameBalancing.numberOfRobots === 1}
              onClick={() =>
                matchDispatch({
                  type: "SET_ENDGAME_BALANCING",
                  endgame: {
                    ...matchEvents.endgameBalancing,
                    numberOfRobots: 1,
                  },
                })
              }
            >
              Solo
            </EndgameButton>
            <EndgameButton
              variant={matchEvents.endgameBalancing.numberOfRobots === 2}
              onClick={() =>
                matchDispatch({
                  type: "SET_ENDGAME_BALANCING",
                  endgame: {
                    ...matchEvents.endgameBalancing,
                    numberOfRobots: 2,
                  },
                })
              }
            >
              Double
            </EndgameButton>
            <EndgameButton
              variant={matchEvents.endgameBalancing.numberOfRobots === 3}
              onClick={() =>
                matchDispatch({
                  type: "SET_ENDGAME_BALANCING",
                  endgame: {
                    ...matchEvents.endgameBalancing,
                    numberOfRobots: 3,
                  },
                })
              }
            >
              Triple
            </EndgameButton>
          </div>
          <div className="col-span-4 row-span-1 grid grid-cols-4 gap-6">
            <div className="col-span-1 flex w-25 items-center justify-start justify-items-center text-xl font-bold">
              Order
            </div>
            <EndgameButton
              variant={matchEvents.endgameBalancing.order === 1}
              onClick={() =>
                matchDispatch({
                  type: "SET_ENDGAME_BALANCING",
                  endgame: { ...matchEvents.endgameBalancing, order: 1 },
                })
              }
            >
              1st
            </EndgameButton>
            <EndgameButton
              variant={matchEvents.endgameBalancing.order === 2}
              onClick={() =>
                matchDispatch({
                  type: "SET_ENDGAME_BALANCING",
                  endgame: { ...matchEvents.endgameBalancing, order: 2 },
                })
              }
            >
              2nd
            </EndgameButton>
            <EndgameButton
              variant={matchEvents.endgameBalancing.order === 3}
              onClick={() =>
                matchDispatch({
                  type: "SET_ENDGAME_BALANCING",
                  endgame: { ...matchEvents.endgameBalancing, order: 3 },
                })
              }
            >
              3rd
            </EndgameButton>
          </div>
          <div className="col-span-4 row-span-1 grid grid-cols-4 gap-6">
            <div className="col-span-1 flex w-25 items-center justify-start justify-items-center text-xl font-bold">
              Result
            </div>
            <EndgameButton
              variant={matchEvents.endgameBalancing.result === "balance"}
              onClick={() =>
                matchDispatch({
                  type: "SET_ENDGAME_BALANCING",
                  endgame: {
                    ...matchEvents.endgameBalancing,
                    result: "balance",
                  },
                })
              }
            >
              Balance
            </EndgameButton>
            <EndgameButton
              variant={matchEvents.endgameBalancing.result === "dock"}
              onClick={() =>
                matchDispatch({
                  type: "SET_ENDGAME_BALANCING",
                  endgame: { ...matchEvents.endgameBalancing, result: "dock" },
                })
              }
            >
              Dock
            </EndgameButton>
            <EndgameButton
              variant={matchEvents.endgameBalancing.result === "fail"}
              onClick={() =>
                matchDispatch({
                  type: "SET_ENDGAME_BALANCING",
                  endgame: { ...matchEvents.endgameBalancing, result: "fail" },
                })
              }
            >
              Fail
            </EndgameButton>
          </div>
          <div className="pt-8">
            <EndgameButton
              className="p-2"
              variant={matchEvents.deadBot ? matchEvents.deadBot : false}
              onClick={() =>
                matchDispatch({
                  type: "SET_DEAD",
                  deadBot: !matchEvents.deadBot,
                })
              }
            >
              Dead Robot
            </EndgameButton>
          </div>
        </div>
        <div className="flex flex-col items-center justify-end">
          <div className="text-xl font-bold">Feedback</div>
          <textarea
            className="h-[178px] w-[450px] bg-inactive-bg"
            placeholder="Your Message"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            onBlur={() =>
              matchDispatch({ type: "SET_FEEDBACK", message: feedback })
            }
          ></textarea>
        </div>
      </div>
    </div>
  );
};
