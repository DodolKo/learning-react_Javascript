import { useState } from 'react'

/* Import default */
import './App.css'

/* import component */
import  Header from './components/layout/_header/motionHeader.jsx'
import UserTable from './components/layout/_userTable/UserTable.jsx'

const App = () => {
  return (
    <div className='app'>
      <Header 
        title='React '
        baseline="C'est pas mal quand même !"
      />

      <UserTable />
    </div>
  )
}

export default App
