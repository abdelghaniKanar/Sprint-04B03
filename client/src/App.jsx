import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import LoginPage from './components/LoginPage'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-16 pb-20"> {/* Add padding for fixed navbar and footer */}
          <Routes>
            <Route path="/" element={<div className="p-4"></div>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<div className="p-4"></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App