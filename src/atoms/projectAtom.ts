/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "jotai";
import { CREATED_AT_VALUE } from "../constants/constants";

interface ProjectState {
  list: any;
  selectedItem: any;
  sortField: string;
  sortDirection: boolean;
  filter: boolean | null;
}

export const projectAtom = atom<ProjectState>({
  list: null,
  selectedItem: null,
  sortField: CREATED_AT_VALUE,
  sortDirection: true,
  filter: null,
});
