// store.ts

import { create } from "zustand";

type User = {
  name: string;
  setName: (name: string) => void;
};

export const userStore = create<User>()((set) => ({
  name: "",
  setName: (name) => set((state) => ({ ...state, name })),
}));
export default userStore;
