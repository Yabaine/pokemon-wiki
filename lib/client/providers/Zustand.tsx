import { create } from 'zustand';
import { GENERATIONS } from '../../../model/generations/enums/Generations';

interface TabState {
  tab: string;
  setTab: (by: string) => void;
}

interface GenState {
  currentGen: GENERATIONS;
  setCurrentGen: (gen: GENERATIONS) => void;
}

export const useMainTab = create<TabState>()((set) => ({
  tab: 'general',
  setTab: (by) => set(() => ({ tab: by })),
}));

export const useCurrentGen = create<GenState>()((set) => ({
  currentGen: GENERATIONS['GENERATION-VIII'],
  setCurrentGen: (gen) => set(() => ({ currentGen: gen })),
}));
