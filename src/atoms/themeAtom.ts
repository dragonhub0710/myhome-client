/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "jotai";

interface DesignThemeState {
  list: any;
  selectedItem: any;
}

export const designThemeAtom = atom<DesignThemeState>({
  list: null,
  selectedItem: null,
});
