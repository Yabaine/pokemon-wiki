import { create } from 'zustand';

interface TabState {
  tab: string;
  setTab: (by: string) => void;
}

export const useMainTab = create<TabState>()((set) => ({
  tab: 'general',
  setTab: (by) => set(() => ({ tab: by })),
}));
