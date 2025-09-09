import './App.css'

import MotionHeader from '@/components/layout/_header/motionHeader.jsx'
import WeatherWidget from '@/components/layout/_weatherWidget/WeatherWidget.jsx'
import { useAppInitialization } from '@/hooks/useAppInitialization'

const App = () => {
  const { isUserLoaded } = useAppInitialization();
  
  return (
    <div className='app'>
      <MotionHeader title='null' />
      {isUserLoaded && (
        <div className="dashboard-grid">
          <WeatherWidget place="Bruxelles" intervalMs={15000} />
          {/* Vous pouvez ajouter d'autres widgets ici */}
        </div>
      )}
    </div>
  )
}

export default App
