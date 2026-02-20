import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initCounter, increment, decrement, removeCounter, resetAll } from '../store/counterSlice'
import '../styles/Counter.css'

export default function Counter(){
  const counters = useSelector(s => s.counter.counters)
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const onAdd = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    if(!trimmed){
      setError('Please enter a counter name.')
      return
    }
    if(trimmed in counters){
      setError(`"${trimmed}" already exists.`)
      return
    }
    dispatch(initCounter(trimmed))
    setName('')
    setError('')
  }

  const total = Object.values(counters).reduce((s, v) => s + v, 0)
  const count = Object.keys(counters).length

  return (
    <div className="container counter-page">
      <h2>Multi Counters</h2>

      <form className="row add-form" onSubmit={onAdd}>
        <input
          value={name}
          placeholder="Enter counter name…"
          onChange={e => { setName(e.target.value); setError('') }}
        />
        <button type="submit">Add Counter</button>
        <div className="spacer" />
        <button
          type="button"
          className="btn-muted"
          disabled={count === 0}
          onClick={() => { dispatch(resetAll()); setError('') }}
        >
          Reset All
        </button>
      </form>

      {error && <p className="input-error">{error}</p>}

      <div className="counters">
        {count === 0 && <p className="muted">No counters yet. Add one above.</p>}
        {Object.entries(counters).map(([id, value]) => (
          <div key={id} className="counter-item">
            <div className="counter-name">{id}</div>
            <div className="row counter-controls">
              <button onClick={() => dispatch(decrement(id))} title="Decrement">−</button>
              <div className="counter-value">{value}</div>
              <button onClick={() => dispatch(increment(id))} title="Increment">+</button>
              <button className="btn-delete" onClick={() => dispatch(removeCounter(id))} title="Remove counter">✕</button>
            </div>
          </div>
        ))}
      </div>

      {count > 0 && (
        <div className="row totals">
          <strong>Total across {count} counter{count !== 1 ? 's' : ''}:</strong>
          <div className="total-value">{total}</div>
        </div>
      )}
    </div>
  )
}
