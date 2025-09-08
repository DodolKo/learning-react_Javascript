import { useState } from 'react'
import PropTypes from 'prop-types'

// ✅ Bonne pratique : Composant réutilisable avec props
const Counter = ({ 
  initialValue = 0, 
  step = 1, 
  label = "Counter",
  onCountChange 
}) => {
  // ✅ Bonne pratique : État local
  const [count, setCount] = useState(initialValue)

  // ✅ Bonne pratique : Fonctions de gestion d'événements
  const handleIncrement = () => {
    const newCount = count + step
    setCount(newCount)
    onCountChange?.(newCount) // ✅ Callback optionnel
  }

  const handleDecrement = () => {
    const newCount = count - step
    setCount(newCount)
    onCountChange?.(newCount)
  }

  const handleReset = () => {
    setCount(initialValue)
    onCountChange?.(initialValue)
  }

  return (
    <div className="counter">
      <h3>{label}</h3>
      <div className="counter-display">
        <span className="count-value">{count}</span>
      </div>
      <div className="counter-controls">
        <button onClick={handleDecrement} aria-label="Decrement">
          -
        </button>
        <button onClick={handleReset} aria-label="Reset">
          Reset
        </button>
        <button onClick={handleIncrement} aria-label="Increment">
          +
        </button>
      </div>
    </div>
  )
}

// ✅ Bonne pratique : PropTypes pour la validation des types
Counter.propTypes = {
  initialValue: PropTypes.number,
  step: PropTypes.number,
  label: PropTypes.string,
  onCountChange: PropTypes.func
}

export default Counter
