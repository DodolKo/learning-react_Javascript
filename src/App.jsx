import './App.css'

import MotionHeader from '@/components/layout/_header/motionHeader.jsx'
import WeatherWidget from '@/components/layout/_weatherWidget/WeatherWidget.jsx'
import DisplayCard from './components/layout/_displayCard/MotionDisplayCard'

import Demo from '@/components/layout/_threeFiberDemo/demo2.jsx'


import { useAppInitialization } from '@/hooks/useAppInitialization'

const App = () => {
  const { isUserLoaded } = useAppInitialization();
  
  return (
    <div className='app'>
      {/* Header et Widget avec z-index élevé pour rester au-dessus */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <MotionHeader title='null' />
        {isUserLoaded && (
          <div className="dashboard-grid">
            <WeatherWidget />
            <DisplayCard />
          </div>
        )}
      </div>

      

      {/* Scène 360° en plein écran */}
      <Demo />

      
    </div>
  )
}

export default App
