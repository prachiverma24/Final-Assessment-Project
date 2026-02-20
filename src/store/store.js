import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import cartReducer from './cartSlice'

const PERSIST_KEY = 'rtk_counters_v1'

function loadCounters(){
  try{
    const raw = localStorage.getItem(PERSIST_KEY)
    if(!raw) return undefined
    return JSON.parse(raw)
  }catch(e){
    console.warn('Failed to load counters from localStorage', e)
    return undefined
  }
}

function saveCounters(counters){
  try{
    localStorage.setItem(PERSIST_KEY, JSON.stringify(counters))
  }catch(e){
    console.warn('Failed to save counters to localStorage', e)
  }
}

const preloadedCounters = loadCounters()

const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer
  },
  preloadedState: preloadedCounters ? { counter: preloadedCounters } : undefined
})

// subscribe to save only the counter slice
store.subscribe(() => {
  const state = store.getState()
  try{
    saveCounters(state.counter)
  }catch(e){
    // ignore
  }
})

export default store
