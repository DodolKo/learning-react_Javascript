import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'

/*import component*/
import MotionHeader from '@/components/layout/_header/motionHeader.jsx'
import UserTable from '@/components/layout/_userTable/UserTable.jsx'

// Import du store viewport
import { useViewportStore } from '@/stores/ViewPortStore'

const libName = "React"

const App = () => {
  // Initialise l'écoute du viewport
  useEffect(() => {
    const handleResize = () => {
      useViewportStore.getState().setViewport(window.innerWidth, window.innerHeight);
    };
    
    // Écoute initiale
    handleResize();
    
    // Écoute les changements
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className='app'>
      <MotionHeader 
        title='K3M0N0'
      />

      <UserTable />
    </div>
  )
}

export default App
