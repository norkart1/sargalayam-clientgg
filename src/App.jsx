import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Header from './layouts/Header'
import { Route, Routes } from 'react-router-dom'
import Details from './pages/DetailPage'

function App() {

  return (
    <>
<Header/>
<br />
<Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/details' element={<Details/>}></Route>

      


    
     
         </Routes>
    </>
  )
}

export default App
