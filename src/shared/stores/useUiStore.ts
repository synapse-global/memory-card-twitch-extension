import { createWithEqualityFn } from "zustand/traditional";
import { persist } from "zustand/middleware";
import { UiStore } from "../model/types/stores/ui";
import { Tabs } from "../model/types/ui";

export const useUiStore = createWithEqualityFn<UiStore>()(
  persist(
    (set) => ({
      isMobile: false,
      soundVolume: 0,
      activeTab: Tabs.ABOUT,
      broadcasterLanguage: "en",
      setIsMobile: (isMobile) => set(() => ({ isMobile })),
      setSoundVolume: (volume) =>
        set(() => ({
          soundVolume: Math.min(1, Math.max(0, volume)),
        })),
      setActiveTab: (tab) => set(() => ({ activeTab: tab })),
      setBroadcasterLanguage: (language) =>
        set(() => ({ broadcasterLanguage: language })),
    }),
    {
      name: "ui-store",
      partialize: (state) => ({
        broadcasterLanguage: state.broadcasterLanguage,
      }),
    }
  )
);
