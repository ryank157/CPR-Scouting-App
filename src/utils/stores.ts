// store.ts
import type { Scouter } from "@prisma/client";
import { create } from "zustand";
import type { Robot } from "@prisma/client";
import type { MatchEventsState } from "./matchScout/events";
import { persist } from "zustand/middleware";

type User = {
  user: Scouter | undefined;
  users: Scouter[];
  setUser: (user: Scouter) => void;
  setUsers: (dbUsers: Scouter[]) => void;
};

export const userStore = create<User>()(
  persist(
    (set) => ({
      user: undefined,
      users: [],
      setUser: (newUser) =>
        set((state) => ({
          user: {
            id: newUser.id,
            scouterId: newUser.scouterId,
            name: newUser.name,
          },
        })),
      setUsers: (dbUsers) =>
        set(() => ({
          users: dbUsers,
        })),
    }),
    { name: "user-store", getStorage: () => localStorage }
  )
);

type Schedule = {
  schedule: Match[];
  setSchedule: (schedule: Match[]) => void;
};

export const scheduleStore = create<Schedule>()(
  persist(
    (set) => ({
      schedule: [],
      setSchedule: (newSchedule) =>
        set(() => ({
          schedule: newSchedule,
        })),
    }),
    {
      name: "schedule-store",
      getStorage: () => localStorage,
    }
  )
);

export type Match = {
  id: number;
  robotMatchData: {
    robot: Robot;
    station: number;
    alliance: string;
  }[];
  matchNumber: number;
};
export default userStore;

type LocalMatchesStore = {
  localMatches: MatchEventsState[];
  addMatch: (match: MatchEventsState) => void;
  deleteLocalMatches: () => void;
};

export const useLocalMatchesStore = create<LocalMatchesStore>()(
  persist(
    (set) => ({
      localMatches: [],
      addMatch: (match) =>
        set((state) => ({
          localMatches: [...state.localMatches, match],
        })),
      deleteLocalMatches: () => set(() => ({ localMatches: [] })),
    }),
    { name: "localMatch-store", getStorage: () => localStorage }
  )
);

export type Event = {
  id: number;
  name: string;
  key: string;
};

type EventStore = {
  events: Event[];
  setEvents: (events: Event[]) => void;
  currentEvent: Event | undefined;
  setCurrentEvent: (event: Event) => void;
};

export const eventStore = create<EventStore>()(
  persist(
    (set) => ({
      events: [],
      setEvents: (newEvents) =>
        set(() => ({
          events: newEvents,
        })),
      currentEvent: undefined,
      setCurrentEvent: (newEvent) => set(() => ({ currentEvent: newEvent })),
    }),
    {
      name: "events-store",
      getStorage: () => localStorage,
    }
  )
);
