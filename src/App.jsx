import './App.css'

/*import component*/
import MotionHeader from '@/components/layout/_header/motionHeader.jsx'
import UserTable from '@/components/layout/_userTable/UserTable.jsx'

// Import du hook d'initialisation centralisé
import { useAppInitialization } from '@/hooks/useAppInitialization'

const App = () => {
  // Initialisation centralisée de l'application
  // Ce hook gère l'initialisation des stores (user, datetime, etc.)
  const { isUserLoaded } = useAppInitialization();
  
  // Debug : Log de l'état d'initialisation
  console.log('🔍 App - User loaded:', isUserLoaded);
  
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
