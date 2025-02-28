/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "jotai";

interface ProjectState {
  list: any;
  sortField: string;
  sortDirection: boolean;
}

export const projectAtom = atom<ProjectState>({
  list: null,
  sortField: "",
  sortDirection: true,
});
