/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from "jotai";

interface ProductState {
  list: any;
}

export const productAtom = atom<ProductState>({
  list: null,
});
