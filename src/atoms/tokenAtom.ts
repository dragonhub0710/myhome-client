import { atomWithStorage } from "jotai/utils";

export const tokenAtom = atomWithStorage<{
  token: string;
} | null>("token", null);
