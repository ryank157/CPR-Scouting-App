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
      <div className="flex flex-grow flex-col items-center justify-end ">
        <div className="relative h-[454px] w-[628px] bg-red-start bg-cover bg-center bg-no-repeat">
          <div
            className={`absolute h-[79px] w-[141px] translate-x-[61px] translate-y-[5px] cursor-pointer border border-black p-2 transition-all duration-300 ease-in  ${
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
            className={`absolute  h-[220px] w-[142px] translate-x-[60px] translate-y-[96px] cursor-pointer border border-black p-2 transition-all duration-300 ease-in  ${
              matchEvents.startingLoc === undefined
                ? "animate-pulse bg-red-100"
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
            className={`absolute h-[133px] w-[225px] translate-x-[203px] translate-y-[183px] cursor-pointer border border-black p-2 transition-all duration-300 ease-in  ${
              matchEvents.startingLoc === undefined
                ? "animate-pulse bg-red-100"
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
            className={`absolute h-[167px] w-[120px] translate-x-[430px] translate-y-[148px] cursor-pointer border border-black p-2 transition-all duration-300 ease-in  ${
              matchEvents.startingLoc === undefined
                ? "animate-pulse bg-red-100"
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
      </div>
    </>
  );
}
