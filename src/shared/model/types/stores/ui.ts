import { PersistOptions } from "zustand/middleware";
import { ActiveTab } from "../ui";

export type UiState = {
  isMobile: boolean;
  soundVolume: number;
  activeTab: ActiveTab;
  broadcasterLanguage: string;
};

export type UiActions = {
  setIsMobile: (isMobile: boolean) => void;
  setSoundVolume: (volume: number) => void;
  setActiveTab: (tab: ActiveTab) => void;
  setBroadcasterLanguage: (language: string) => void;
};

export type UiStore = UiState & UiActions;

export type UiPersistedState = Pick<UiStore, "broadcasterLanguage" | "soundVolume">;

export type UiStorePersist = PersistOptions<UiStore, UiPersistedState>;

