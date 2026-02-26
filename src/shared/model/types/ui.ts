export const Tabs = {
  GAME: 'game',
  ABOUT: 'about',
} as const;

export type ActiveTab = typeof Tabs[keyof typeof Tabs];