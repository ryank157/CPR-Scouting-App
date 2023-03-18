import { Dispatch, useEffect } from "react";

import type { TimeAction, TimeState } from "@/utils/matchScout/time";
import { useMemo } from "react";

import ScoringGrid from "./scoringGrid";
import type { MatchEventsState, MatchAction } from "@/utils/matchScout/events";
import AutoButton from "src-components/autoButton";
interface AutoProps {
  matchEvents: MatchEventsState;
  matchDispatch: Dispatch<MatchAction>;
  timeState: TimeState;
  timeDispatch: Dispatch<TimeAction>;
}

export default function AutoScout(props: AutoProps) {
  const { matchEvents, matchDispatch, timeState, timeDispatch } = props;
  //Scroll to bottom
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
  }, [matchEvents.scoredObjects]);

  return (
    <div className="flex w-full flex-col justify-center">
      {memoizedScoringGrid}

      <div className="mt-2 flex h-full w-full justify-center gap-[16px] pb-6">
        <div className="flex w-[310px] flex-col gap-2.5 ">
          <div className="-mb-1.25 text-center text-xl font-semibold">
            Mobility
          </div>
          <AutoButton
            icon={["bg-auto-mob-score", "bg-auto-mob-score-s"]}
            variant={matchEvents.mobility === "yes"}
            onClick={() =>
              matchDispatch({ type: "SET_MOBILITY", mobility: "yes" })
            }
          >
            Scored
          </AutoButton>
          <AutoButton
            icon={["bg-auto-mob-no", "bg-auto-mob-no-s"]}
            variant={matchEvents.mobility === "no"}
            onClick={() =>
              matchDispatch({ type: "SET_MOBILITY", mobility: "no" })
            }
          >
            No
          </AutoButton>
          <AutoButton
            icon={["bg-auto-mob-failed", "bg-auto-mob-failed-s"]}
            variant={matchEvents.mobility === "failed"}
            onClick={() =>
              matchDispatch({ type: "SET_MOBILITY", mobility: "failed" })
            }
          >
            Failed
          </AutoButton>
        </div>
        <div className="flex w-[310px] flex-col gap-2.5 ">
          <div className="-mb-1.25 text-center text-xl font-semibold">
            Balancing
          </div>
          <AutoButton
            icon={["bg-auto-engaged", "bg-auto-engaged-s"]}
            variant={matchEvents.autoBalancing === "engaged"}
            onClick={() =>
              matchDispatch({
                type: "SET_AUTO_BALANCING",
                autoBalance: "engaged",
              })
            }
          >
            Engaged
          </AutoButton>
          <AutoButton
            icon={["bg-auto-docked", "bg-auto-docked-s"]}
            variant={matchEvents.autoBalancing === "docked"}
            onClick={() =>
              matchDispatch({
                type: "SET_AUTO_BALANCING",
                autoBalance: "docked",
              })
            }
          >
            Docked
          </AutoButton>
          <AutoButton
            icon={["bg-auto-bal-na", "bg-auto-bal-na-s"]}
            variant={matchEvents.autoBalancing === "failed"}
            onClick={() =>
              matchDispatch({
                type: "SET_AUTO_BALANCING",
                autoBalance: "failed",
              })
            }
          >
            Failed
          </AutoButton>
        </div>

        <div className="flex w-[310px] flex-col gap-2.5 ">
          <div className="-mb-1.25 text-center text-xl font-semibold">
            Fouls
          </div>
          <AutoButton
            icon={["bg-auto-foul-cross", "bg-auto-foul-cross-s"]}
            variant={matchEvents.fouls.includes("crossed half line")}
            onClick={() =>
              matchDispatch({
                type: "FOUL_TOGGLE",
                newFoul: "crossed half line",
              })
            }
          >
            Cross Half Line
          </AutoButton>
          <AutoButton
            icon={["bg-auto-foul-pieces", "bg-auto-foul-pieces-s"]}
            variant={matchEvents.fouls.includes("too many pieces")}
            onClick={() =>
              matchDispatch({ type: "FOUL_TOGGLE", newFoul: "too many pieces" })
            }
          >
            2+ Game Pieces
          </AutoButton>
          <AutoButton
            icon={["bg-auto-foul-other", "bg-auto-foul-other-s"]}
            variant={matchEvents.fouls.includes("other")}
            onClick={() =>
              matchDispatch({ type: "FOUL_TOGGLE", newFoul: "other" })
            }
          >
            Other
          </AutoButton>
        </div>
      </div>
    </div>
  );
}
