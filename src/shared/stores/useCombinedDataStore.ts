
import { create } from "zustand";
import { CombinedResponse } from "../model/types/api";

type useCombinedDataStoreProperties = {
  isReceived: boolean;
  about: CombinedResponse["about"] | null;
  isOpen: boolean | null;
  setIsReceived: (isReceived: boolean) => void;
  setAbout: (about: CombinedResponse["about"] | null) => void;
  setIsOpen: (isOpen: boolean | null) => void;
};

export const useCombinedDataStore = create<useCombinedDataStoreProperties>(
  (set) => ({
    isReceived: false,
    about: null,
    isOpen: null,
    setIsReceived: (isReceived: boolean) => set({ isReceived }),
    setAbout: (about: CombinedResponse["about"] | null) => set({ about }),
    setIsOpen: (isOpen: boolean | null) => set(() => ({ isOpen }))
  })
);
