import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Counter from './pages/Counter'
import Ecommerce from './pages/Ecommerce'
import Navigation from './components/Navigation'

export default function App(){
  return (
    <div className="app-root">
      <Navigation />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Counter />} />
          <Route path="/ecommerce" element={<Ecommerce />} />
        </Routes>
      </main>
    </div>
  )
}
