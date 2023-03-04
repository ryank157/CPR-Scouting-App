import { type NextPage } from "next";
import { useState, useEffect, useReducer, useRef, useMemo } from "react";

import { TimeReducer, initialTimeState } from "@/utils/matchScout/time";

import BeforeScout from "src-components/matchScout/before";
import AutoScout from "src-components/matchScout/auto";
import { TeleScout } from "src-components/matchScout/tele";
import {
  MatchEventsReducer,
  initialMatchState,
} from "@/utils/matchScout/events";
import ScoutHeader from "src-components/matchScout/header";
import { EndgameScout } from "src-components/matchScout/endgame";
import { ReviewScout } from "src-components/matchScout/review";

export type ScoringGrid =
  | "nothing"
  | "auto-cone"
  | "auto-cube"
  | "tele-cone"
  | "tele-cube";

const MatchScout: NextPage = () => {
  //Relating to time and page
  const [timeState, timeDispatch] = useReducer(TimeReducer, initialTimeState);

  useEffect(() => {
    if (timeState.activeMatch && timeState.endTime > new Date().getTime()) {
      const interval = setInterval(() => {
        timeDispatch({ type: "ADJUST_TIME", increase: 1000 });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timeState.activeMatch, timeState.matchTime]);

  //Relating to match events
  const [matchEvents, matchDispatch] = useReducer(
    MatchEventsReducer,
    initialMatchState
  );

  const memoizedScout = useMemo(() => {
    return <ScoutingBody />;
  }, [matchEvents, timeState.matchPage]);

  return (
    <div className="flex h-screen flex-col">
      <ScoutHeader
        timeState={timeState}
        timeDispatch={timeDispatch}
        matchEvents={matchEvents}
        matchDispatch={matchDispatch}
      />
      {memoizedScout}
    </div>
  );

  function ScoutingBody() {
    console.log("Scouting Body");
    switch (timeState.matchPage) {
      case "before":
        return BeforeScout({
          matchEvents,
          matchDispatch,
        });

      case "auto":
        return AutoScout({
          matchEvents,
          matchDispatch,
          timeState,
          timeDispatch,
        });

      case "tele":
        return TeleScout({
          matchEvents,
          matchDispatch,
          timeState,
          timeDispatch,
        });

      case "endgame":
        return EndgameScout({
          matchEvents,
          matchDispatch,
          timeState,
          timeDispatch,
        });
      case "review":
        return ReviewScout({
          matchEvents,
          matchDispatch,
          timeState,
          timeDispatch,
        });
    }
  }
};

export default MatchScout;
