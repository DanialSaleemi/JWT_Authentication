"use client";

import { RegisterUserInput } from "../validations/user.schema";
import { create } from "zustand";

type Store = {
  authUser: RegisterUserInput | null;
  requestLoading: boolean;
  setAuthUser: (user: RegisterUserInput | null) => void;
  setRequestLoading: (isLoading: boolean) => void;
  reset: () => void;
};

const useStore = create<Store>((set) => ({
  authUser: null,
  requestLoading: false,
  setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
  setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, requestLoading: isLoading })),
  reset: () => set({ authUser: null, requestLoading: false }),
}));

export default useStore;
