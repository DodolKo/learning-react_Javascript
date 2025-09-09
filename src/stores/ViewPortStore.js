import { create } from 'zustand';

export const useViewportStore = create((set) => ({
  // État initial
  width: typeof window !== 'undefined' ? window.innerWidth : 1024,
  height: typeof window !== 'undefined' ? window.innerHeight : 768,
  
  // Actions
  setViewport: (width, height) => set({ width, height })
}));