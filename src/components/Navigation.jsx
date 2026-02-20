import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../styles/Navigation.css'

export default function Navigation(){
  const cartCount = useSelector(s => s.cart.items.reduce((sum, i) => sum + i.quantity, 0))

  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-brand">My App</div>
        <div className="nav-links">
          <NavLink to="/" className={({isActive}) => isActive ? 'active' : ''}>
            Counter
          </NavLink>
          <NavLink to="/ecommerce" className={({isActive}) => isActive ? 'active' : ''}>
            E-commerce
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
