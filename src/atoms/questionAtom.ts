/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "jotai";

interface QuestionState {
  list: any;
}

export const questionAtom = atom<QuestionState>({
  list: null,
});
