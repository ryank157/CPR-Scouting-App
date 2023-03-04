// store.ts
import type { Scouter } from "@prisma/client";
import { create } from "zustand";

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
export default userStore;
