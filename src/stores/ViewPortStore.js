import { create } from 'zustand';

export const useViewportStore = create((set) => ({
  // État initial
  width: typeof window !== 'undefined' ? window.innerWidth : 1024,
  height: typeof window !== 'undefined' ? window.innerHeight : 768,
  
  // Actions
  setViewport: (width, height) => set({ width, height }),
  
  // Helpers
  isMobile: () => {
    const state = useViewportStore.getState();
    return state.width < 768;
  },
  isTablet: () => {
    const state = useViewportStore.getState();
    return state.width >= 768 && state.width < 1024;
  },
  isDesktop: () => {
    const state = useViewportStore.getState();
    return state.width >= 1024;
  }
}));

// Hook pour écouter les changements de viewport
export const useViewportListener = () => {
  const setViewport = useViewportStore((state) => state.setViewport);
  
  // Écoute les changements de taille
  if (typeof window !== 'undefined') {
    const handleResize = () => {
      setViewport(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup (optionnel, car c'est global)
    return () => window.removeEventListener('resize', handleResize);
  }
};