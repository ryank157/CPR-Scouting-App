// store.ts
import type { Scouter } from "@prisma/client";
import { create } from "zustand";
import type { Robot } from "@prisma/client";
import type { MatchEventsState } from "./matchScout/events";
import { persist } from "zustand/middleware";

type User = {
  user: Scouter;
  users: Scouter[];
  setUser: (user: Scouter) => void;
  setUsers: (dbUsers: Scouter[]) => void;
};

export const userStore = create<User>()(
  persist(
    (set) => ({
      user: { id: 0, scouterId: "", name: "" },
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
