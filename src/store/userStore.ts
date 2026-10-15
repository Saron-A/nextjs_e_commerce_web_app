"use client";

import { create } from "zustand";
import { User } from "@/types/user";

const useUserStore = create((set) => ({
  user: null,
  logOut: () => set({ user: null }),
}));

export default useUserStore;
