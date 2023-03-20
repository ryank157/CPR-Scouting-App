import { type NextPage } from "next";
import Link from "next/link";
import Button from "src-components/button";
import userStore, { eventStore } from "@/utils/stores";
import { scheduleStore } from "@/utils/stores";
import { useState, useEffect } from "react";
import type { Match, Event } from "@/utils/stores";
import type { Scouter } from "@prisma/client";
import { trpc } from "@/utils/trpc";

const Schedule: NextPage = () => {
  const [user, setUser] = useState<Scouter>();
  const storeUser = userStore().user;

  const [hyrdatedSchedule, setHydratedSchedule] = useState<Match[]>([]);
  const [hydratedEvents, setHydratedEvents] = useState<Event[]>([]);
  const [hydratedCurrentEvent, setHydratedCurrentEvent] = useState<
    Event | undefined
  >(undefined);
  const { schedule, setSchedule } = scheduleStore();
  const { events, setEvents, currentEvent, setCurrentEvent } = eventStore();
  const [isRefresh, setIsRefresh] = useState(false);
  const [isEventSelect, setIsEventSelect] = useState(false);

  useEffect(() => {
    if (events) {
      setHydratedEvents(events);
    }
    if (currentEvent) {
      setHydratedCurrentEvent(currentEvent);
    }
    // Synchronize the state with the scheduleStore on the client-side
    if (schedule) {
      setHydratedSchedule(schedule);
    }
    if (storeUser) {
      setUser(storeUser);
    }
  }, [schedule, events, currentEvent]);

  trpc.match.fetchEvents.useQuery(undefined, {
    enabled: events.length === 0 || isRefresh,
    onSuccess(res) {
      setEvents(res);
      // if()
    },
  });

  trpc.tba.fetchMatchSchedule.useQuery(
    { eventId: currentEvent?.id as number },
    {
      enabled: isRefresh && Boolean(currentEvent?.id),
      onSuccess(res) {
        setIsRefresh(false);
        setSchedule(res);
      },
    }
  );

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full justify-between p-7.5 ">
        <div className="flex  items-center gap-7.5">
          <Link href={"/"}>
            <Button className="">Back</Button>
          </Link>
        </div>
        <div className="flex cursor-pointer items-center justify-center gap-2.5 rounded-md font-bold">
          <span
            className="relative border border-cpr-blue-dark bg-cpr-blue-light p-2"
            onClick={() => setIsEventSelect(!isEventSelect)}
          >
            Event:{" "}
            {hydratedCurrentEvent
              ? hydratedCurrentEvent.name
              : "select an event"}
            {isEventSelect && (
              <div className="absolute top-0 z-10 h-60 w-60 -translate-x-24 overflow-y-auto border border-cpr-blue-dark bg-gray-100 p-2 text-xl">
                {events.map((event, index) => {
                  return (
                    <div
                      key={index}
                      className="cursor-pointer border-t border-gray-500 py-2 text-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentEvent(event);
                        setIsRefresh(true);
                        setIsEventSelect(false);
                      }}
                    >
                      {event.name}
                    </div>
                  );
                })}
              </div>
            )}
          </span>{" "}
        </div>
      </div>
      <div className="flex w-[90%] flex-col border border-black">
        <div className="flex items-center justify-center  text-center">
          <div className="w-[10%] border-r py-2">#</div>
          <div className="w-[15%] border-r py-2">Red 1</div>
          <div className="w-[15%] border-r py-2">Red 2</div>
          <div className="w-[15%] border-r py-2">Red 3</div>
          <div className="w-[15%] border-r py-2">Blue 1</div>
          <div className="w-[15%] border-r py-2">Blue 2</div>
          <div className="w-[15%]  py-2">Blue 3</div>
        </div>
        {hyrdatedSchedule &&
          hyrdatedSchedule.map((match, index) => {
            const red1 = match.robotMatchData.find(
              (robotMatch) =>
                robotMatch.alliance === "red" && robotMatch.station === 0
            );
            const red2 = match.robotMatchData.find(
              (robotMatch) =>
                robotMatch.alliance === "red" && robotMatch.station === 1
            );
            const red3 = match.robotMatchData.find(
              (robotMatch) =>
                robotMatch.alliance === "red" && robotMatch.station === 2
            );
            const blue1 = match.robotMatchData.find(
              (robotMatch) =>
                robotMatch.alliance === "blue" && robotMatch.station === 0
            );
            const blue2 = match.robotMatchData.find(
              (robotMatch) =>
                robotMatch.alliance === "blue" && robotMatch.station === 1
            );
            const blue3 = match.robotMatchData.find(
              (robotMatch) =>
                robotMatch.alliance === "blue" && robotMatch.station === 2
            );

            // For Red Alliance
            const redAllianceBg = index % 2 === 0 ? "bg-red-200" : "bg-red-100";
            const greenBg = "bg-green-200";

            // For Blue Alliance
            const blueAllianceBg =
              index % 2 === 0 ? "bg-blue-200" : "bg-blue-100";

            return (
              <div
                key={index}
                className="flex w-full border-b border-black text-center"
              >
                <div
                  className={`w-[10%] border-r ${
                    index % 2 === 0 ? "bg-gray-200" : ""
                  }`}
                >
                  {match.matchNumber}
                </div>
                <div
                  className={`w-[15%] border-r ${
                    red1?.robot.teamNumber === 3663 ? greenBg : redAllianceBg
                  }`}
                >
                  {red1?.robot.teamNumber}
                </div>
                <div
                  className={`w-[15%] border-r ${
                    red2?.robot.teamNumber === 3663 ? greenBg : redAllianceBg
                  }`}
                >
                  {red2?.robot.teamNumber}
                </div>
                <div
                  className={`w-[15%] border-r ${
                    red3?.robot.teamNumber === 3663 ? greenBg : redAllianceBg
                  }`}
                >
                  {red3?.robot.teamNumber}
                </div>
                <div
                  className={`w-[15%] border-r ${
                    blue1?.robot.teamNumber === 3663 ? greenBg : blueAllianceBg
                  }`}
                >
                  {blue1?.robot.teamNumber}
                </div>
                <div
                  className={`w-[15%] border-r ${
                    blue2?.robot.teamNumber === 3663 ? greenBg : blueAllianceBg
                  }`}
                >
                  {blue2?.robot.teamNumber}
                </div>
                <div
                  className={`w-[15%] ${
                    blue3?.robot.teamNumber === 3663 ? greenBg : blueAllianceBg
                  }`}
                >
                  {blue3?.robot.teamNumber}
                </div>
              </div>
            );
          })}
      </div>
      <Button
        className="mt-10 w-60"
        onClick={() => {
          setIsRefresh(true);
        }}
      >
        Refresh Schedule
      </Button>
    </div>
  );
};
export default Schedule;
