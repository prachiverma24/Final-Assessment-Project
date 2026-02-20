import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice'
import '../styles/CartSidebar.css'

export default function CartSidebar(){
  const items = useSelector(s => s.cart.items)
  const dispatch = useDispatch()

  const total = items.reduce((sum, it) => sum + (it.price * it.quantity), 0)
  const totalItems = items.reduce((sum, it) => sum + it.quantity, 0)

  if(items.length === 0) return (
    <aside className="cart-sidebar container">
      <h3 className="cart-title">Cart</h3>
      <p className="muted">Your cart is empty.</p>
    </aside>
  )

  return (
    <aside className="cart-sidebar container">
      <div className="row cart-header">
        <h3 className="cart-title">Cart <span className="cart-count">({totalItems} item{totalItems !== 1 ? 's' : ''})</span></h3>
        <button className="btn-muted" onClick={() => dispatch(clearCart())}>Clear All</button>
      </div>

      <ul className="cart-list">
        {items.map(item => (
          <li key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="cart-item-body">
              <div className="cart-item-title">{item.name}</div>
              <div className="muted">${item.price.toFixed(2)}</div>
              <div className="row qty-row">
                <button className="qty-btn" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button>
                <div className="qty">{item.quantity}</div>
                <button className="qty-btn" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
                <button className="btn-link" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-total row">
        <strong>Total</strong>
        <div>${total.toFixed(2)}</div>
      </div>
    </aside>
  )
}
