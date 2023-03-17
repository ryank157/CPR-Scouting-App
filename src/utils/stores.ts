// store.ts
import type { Scouter } from "@prisma/client";
import { create } from "zustand";
import type { Robot } from "@prisma/client";
import type { MatchEventsState } from "./matchScout/events";

type User = {
  user: Scouter;
  setUser: (user: Scouter) => void;
};

export const userStore = create<User>()((set) => ({
  user: { id: 0, scouterId: "", name: "" },
  setUser: (newUser) =>
    set((state) => ({
      user: {
        id: newUser.id,
        scouterId: newUser.scouterId,
        name: newUser.name,
      },
    })),
}));

type Schedule = {
  schedule: Match[];
  setSchedule: (schedule: Match[]) => void;
};

export const scheduleStore = create<Schedule>()((set) => ({
  schedule: [],
  setSchedule: (newSchedule) =>
    set((state) => ({
      schedule: newSchedule,
    })),
}));

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

export const useLocalMatchesStore = create<LocalMatchesStore>((set) => ({
  localMatches: [],
  addMatch: (match) =>
    set((state) => ({
      localMatches: [...state.localMatches, match],
    })),
  deleteLocalMatches: () => set(() => ({ localMatches: [] })),
}));
