/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "jotai";

interface RoomUpgradeState {
  list: any;
  selectedItem: any;
}

export const roomUpgradeAtom = atom<RoomUpgradeState>({
  list: null,
  selectedItem: null,
});
