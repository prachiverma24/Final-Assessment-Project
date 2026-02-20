import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action){
      const product = action.payload
      const existing = state.items.find(i => i.id === product.id)
      if(existing){
        existing.quantity += 1
      } else {
        state.items.push({
          id: product.id,
          name: product.title || product.name || 'Product',
          price: product.price || 0,
          image: product.image || product.thumbnail || '',
          quantity: 1
        })
      }
    },
    removeFromCart(state, action){
      const id = action.payload
      state.items = state.items.filter(i => i.id !== id)
    },
    updateQuantity(state, action){
      const { id, quantity } = action.payload
      const item = state.items.find(i => i.id === id)
      if(item){
        item.quantity = Math.max(0, quantity)
      }
      // optionally remove if zero
      state.items = state.items.filter(i => i.quantity > 0)
    },
    clearCart(state){
      state.items = []
    }
  }
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
