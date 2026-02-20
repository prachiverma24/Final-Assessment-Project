import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  counters: {}
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    initCounter(state, action){
      const id = action.payload
      if(!id) return
      if(!(id in state.counters)){
        state.counters[id] = 0
      }
    },
    increment(state, action){
      const id = action.payload
      if(id in state.counters){
        state.counters[id] += 1
      }
    },
    decrement(state, action){
      const id = action.payload
      if(id in state.counters){
        state.counters[id] = Math.max(0, state.counters[id] - 1)
      }
    },
    removeCounter(state, action){
      const id = action.payload
      delete state.counters[id]
    },
    resetAll(state){
      state.counters = {}
    }
  }
})

export const { initCounter, increment, decrement, removeCounter, resetAll } = counterSlice.actions
export default counterSlice.reducer
