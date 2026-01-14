import React from 'react'
import Welcome from './components/Welcome'
import { Route, Routes ,BrowserRouter as Router,  Link } from 'react-router-dom'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'

const App = () => {
  return (
    <>
    <Router>
        <nav>
          <Link to="/">Home</Link> | {" "}
          <Link to="/About">About</Link> | {" "}
          <Link to="/Contact">Contact</Link> 
        </nav>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/About' element={<About />} />
          <Route path='/Contact' element={<Contact />} />
        </Routes>
    </Router>
    {/* <Welcome name="alawoddin"/> */}
    </>
  )
}

export default App
