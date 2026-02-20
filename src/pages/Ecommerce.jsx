import React from 'react'
import useProducts from '../hooks/useProducts'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import CartSidebar from '../components/CartSidebar'
import '../styles/Ecommerce.css'

export default function Ecommerce(){
  const { data, isLoading, error } = useProducts()
  const dispatch = useDispatch()

  const products = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data?.products)
    ? data.products
    : []

  return (
    <div className="ecom-layout">
      <section className="product-list container">
        <h2>Products</h2>

        {isLoading && <p className="muted">Loading products…</p>}
        {error && (
          <p className="error-msg">
            ⚠️ Failed to load products: {error.message}
          </p>
        )}

        <div className="grid">
          {products.map(p => (
            <div key={p.id} className="card product-card">
              <img
                src={p.image || p.thumbnail || ''}
                alt={p.title || p.name}
                onError={e => { e.currentTarget.src = 'https://placehold.co/200x140?text=No+Image' }}
              />
              <h4 className="product-title">{p.title || p.name}</h4>
              <p className="product-desc">{p.description ? p.description.slice(0, 60) + '…' : ''}</p>
              <div className="row product-bottom">
                <div className="price">${(p.price || 0).toFixed(2)}</div>
                <button onClick={() => dispatch(addToCart(p))}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <aside className="sidebar">
        <CartSidebar />
      </aside>
    </div>
  )
}
