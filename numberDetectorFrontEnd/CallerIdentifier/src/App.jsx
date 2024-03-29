import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {

  return (<>
    <div className=' bg-gray-400'>
    <div className='w-full block'>
      <Header />
      <main>
  <Outlet />
      </main>
      <Footer />
    </div>
  </div>
  </>)
}

export default App
