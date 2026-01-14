import React from 'react'
import { Route, Routes ,BrowserRouter as Router } from 'react-router-dom'

import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  return (
    <>
    <Router>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
    </Router>
    {/* <Welcome name="alawoddin"/> */}
    </>
  )
}

export default App
