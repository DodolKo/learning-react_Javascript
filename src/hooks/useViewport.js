// src/hooks/useViewport.js
import { useViewportStore } from '@/stores/ViewPortStore';
import { useEffect } from 'react';

export const useViewport = () => {
  // Récupère les valeurs du store
  const width = useViewportStore((state) => state.width);
  const height = useViewportStore((state) => state.height);
  const setViewport = useViewportStore((state) => state.setViewport);
  
  // Gestion centralisée du viewport dans le hook
  useEffect(() => {
    const handleResize = () => {
      setViewport(window.innerWidth, window.innerHeight);
    };
    
    // Écoute initiale
    handleResize();
    
    // Écoute les changements
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [setViewport]);
  
  // Calculs optimisés (pas de re-calcul à chaque render)
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;
  
  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop
  };
};
