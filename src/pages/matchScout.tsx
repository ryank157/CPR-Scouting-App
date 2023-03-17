import { type NextPage } from "next";
import { useEffect, useReducer, useMemo, useState } from "react";

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
import { scheduleStore } from "@/utils/stores";
import { trpc } from "@/utils/trpc";
import useIsOnline from "@/utils/useIsOnline";

export type ScoringGrid =
  | "nothing"
  | "auto-cone"
  | "auto-cube"
  | "tele-cone"
  | "tele-cube";

const MatchScout: NextPage = () => {
  //Relating to time and page

  const { schedule, setSchedule } = scheduleStore();
  trpc.tba.fetchMatchSchedule.useQuery(undefined, {
    enabled: Boolean(schedule.length === 0),
    onSuccess(res) {
      res.sort((a, b) => a.matchNumber - b.matchNumber);
      //Put in schedule store
      setSchedule(res);
    },
  });
  const [timeState, timeDispatch] = useReducer(TimeReducer, initialTimeState);

  const isOnline = useIsOnline();

  useEffect(() => {
    if (
      timeState.activeMatch &&
      timeState.endTime + 1000 > new Date().getTime()
    ) {
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
        isOnline={isOnline}
      />
      {memoizedScout}
    </div>
  );

  function ScoutingBody() {
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
