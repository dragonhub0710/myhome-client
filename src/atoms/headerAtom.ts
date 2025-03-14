/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "jotai";

interface HeaderState {
  list: any;
}

export const headerAtom = atom<HeaderState>({
  list: null,
});
