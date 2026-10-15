"use client";

import { create } from "zustand";
import { AuthUser } from "@/types/authUser";

interface UserState {
  user: AuthUser | null;
  setUser: (user: AuthUser) => void;
  logout: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export { useUserStore };
