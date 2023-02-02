import { create } from 'zustand';

interface TabState {
  tab: string;
  setTab: (by: string) => void;
}

interface GenState {
  currentGen: string;
  setCurrentGen: (by: string) => void;
}

export const useMainTab = create<TabState>()((set) => ({
  tab: 'general',
  setTab: (by) => set(() => ({ tab: by })),
}));

export const useCurrentGen = create<GenState>()((set) => ({
  currentGen: 'generation-viii',
  setCurrentGen: (by) => set(() => ({ currentGen: by })),
}));
