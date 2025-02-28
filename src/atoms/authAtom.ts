/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "jotai";

interface AuthState {
  isAuthenticated: boolean;
  user: any;
}

export const authAtom = atom<AuthState>({
  isAuthenticated: false,
  user: null,
});
