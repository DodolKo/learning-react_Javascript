import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'

/*import component*/
import  Header from './components/layout/motionHeader.jsx'

const libName = "React"

const App = () => {
  return (
    <div className='app'>
      <Header 
        title='Bienvenu(e) sur mon premier projet react'
        baseline="C'est pas mal react quand même !"
      />
    </div>
  )
}

export default App
