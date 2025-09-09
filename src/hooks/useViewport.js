// src/hooks/useViewport.js
import { useViewportStore, useViewportListener } from '@/stores/ViewPortStore';
import { useEffect } from 'react';

export const useViewport = () => {
  // Écoute les changements de viewport
  useViewportListener();
  
  // Récupère les valeurs du store
  const width = useViewportStore((state) => state.width);
  const height = useViewportStore((state) => state.height);
  const isMobile = useViewportStore((state) => state.isMobile());
  const isTablet = useViewportStore((state) => state.isTablet());
  const isDesktop = useViewportStore((state) => state.isDesktop());
  
  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop
  };
};
