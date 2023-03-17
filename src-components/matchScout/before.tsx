import type { Dispatch } from "react";

import type { MatchEventsState, MatchAction } from "@/utils/matchScout/events";

interface BeforeProps {
  matchEvents: MatchEventsState;
  matchDispatch: Dispatch<MatchAction>;
}

export default function BeforeScout(props: BeforeProps) {
  const { matchEvents, matchDispatch } = props;

  return (
    <>
      <div className="flex flex-grow flex-col items-center pt-[10px] ">
        {matchEvents.alliance?.includes("red") ? (
          <div className="relative h-[350px] w-[484px] bg-red-start bg-cover bg-center bg-no-repeat">
            <div
              className={`absolute h-[61px] w-[109px] translate-x-[47px] translate-y-[4px] cursor-pointer border border-black p-2 transition-all duration-300 ease-in  ${
                matchEvents.startingLoc === undefined
                  ? "animate-pulse bg-red-100"
                  : matchEvents.startingLoc === 0
                  ? "bg-red-400"
                  : "opacity-50"
              }`}
              onClick={() => {
                matchDispatch({ type: "SET_STARTING_LOC", location: 0 });
              }}
            >
              {`Loc ${0 + 1}`}
            </div>
            <div
              className={`absolute  h-[170px] w-[109px] translate-x-[46px] translate-y-[74px] cursor-pointer border border-black p-2 transition-all duration-300 ease-in  ${
                matchEvents.startingLoc === undefined
                  ? "animate-pulse bg-red-200"
                  : matchEvents.startingLoc === 1
                  ? "bg-red-400"
                  : "opacity-50"
              }`}
              onClick={() => {
                matchDispatch({ type: "SET_STARTING_LOC", location: 1 });
              }}
            >
              {`Loc ${1 + 1}`}
            </div>
            <div
              className={`absolute h-[102px] w-[173px] translate-x-[156px] translate-y-[142px] cursor-pointer border border-black p-2 transition-all duration-300 ease-in  ${
                matchEvents.startingLoc === undefined
                  ? "animate-pulse bg-red-200"
                  : matchEvents.startingLoc === 2
                  ? "bg-red-400"
                  : "opacity-50"
              }`}
              onClick={() => {
                matchDispatch({ type: "SET_STARTING_LOC", location: 2 });
              }}
            >
              {`Loc ${2 + 1}`}
            </div>
            <div
              className={`absolute h-[129px] w-[92px] translate-x-[331px] translate-y-[114px] cursor-pointer border border-black p-2 transition-all duration-300 ease-in  ${
                matchEvents.startingLoc === undefined
                  ? "animate-pulse bg-red-200"
                  : matchEvents.startingLoc === 3
                  ? "bg-red-400"
                  : "opacity-50"
              }`}
              onClick={() => {
                matchDispatch({ type: "SET_STARTING_LOC", location: 3 });
              }}
            >
              {`Loc ${3 + 1}`}
            </div>
          </div>
        ) : (
          <div className="relative h-[350px] w-[484px] bg-blue-start bg-contain bg-center bg-no-repeat">
            <div
              className={`absolute h-[61px] w-[109px] translate-x-[328px]  translate-y-[4px] cursor-pointer border border-black p-2 transition-all duration-300 ease-in  ${
                matchEvents.startingLoc === undefined
                  ? "animate-pulse bg-blue-200"
                  : matchEvents.startingLoc === 0
                  ? "bg-blue-400"
                  : "opacity-50"
              }`}
              onClick={() => {
                matchDispatch({ type: "SET_STARTING_LOC", location: 0 });
              }}
            >
              {`Loc ${0 + 1}`}
            </div>
            <div
              className={`absolute  h-[170px] w-[109px] translate-x-[328px] translate-y-[74px] cursor-pointer border border-black p-2 transition-all duration-300 ease-in  ${
                matchEvents.startingLoc === undefined
                  ? "animate-pulse bg-blue-100"
                  : matchEvents.startingLoc === 1
                  ? "bg-blue-400"
                  : "opacity-50"
              }`}
              onClick={() => {
                matchDispatch({ type: "SET_STARTING_LOC", location: 1 });
              }}
            >
              {`Loc ${1 + 1}`}
            </div>
            <div
              className={`absolute h-[102px] w-[173px] translate-x-[156px] translate-y-[142px] cursor-pointer border border-black p-2 transition-all duration-300 ease-in  ${
                matchEvents.startingLoc === undefined
                  ? "animate-pulse bg-blue-100"
                  : matchEvents.startingLoc === 2
                  ? "bg-blue-400"
                  : "opacity-50"
              }`}
              onClick={() => {
                matchDispatch({ type: "SET_STARTING_LOC", location: 2 });
              }}
            >
              {`Loc ${2 + 1}`}
            </div>
            <div
              className={`absolute h-[129px] w-[92px] translate-x-[60px] translate-y-[114px] cursor-pointer border border-black p-2 transition-all duration-300 ease-in  ${
                matchEvents.startingLoc === undefined
                  ? "animate-pulse bg-blue-100"
                  : matchEvents.startingLoc === 3
                  ? "bg-blue-400"
                  : "opacity-50"
              }`}
              onClick={() => {
                matchDispatch({ type: "SET_STARTING_LOC", location: 3 });
              }}
            >
              {`Loc ${3 + 1}`}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
