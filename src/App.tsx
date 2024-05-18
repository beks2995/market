import React from 'react'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import UslovieService from './pages/UslovieService/UslovieService'
import Contacts from './pages/Contacts/Contacts'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<UslovieService />}></Route>
        <Route path='/Contacts' element={<Contacts />}></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
