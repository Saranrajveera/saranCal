import { useState } from 'react'

function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(digit)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '×':
        return firstValue * secondValue
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 'Error'
      case '%':
        return firstValue % secondValue
      default:
        return secondValue
    }
  }

  const handleEqual = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const handleBackspace = () => {
    if (display.length === 1 || (display.length === 2 && display[0] === '-')) {
      setDisplay('0')
    } else {
      setDisplay(display.slice(0, -1))
    }
  }

  const handlePercent = () => {
    const value = parseFloat(display)
    setDisplay(String(value / 100))
  }

  const handleToggleSign = () => {
    const value = parseFloat(display)
    setDisplay(String(value * -1))
  }

  const buttonStyle = {
    padding: '16px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '20px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  }

  const numberButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'rgba(71, 85, 105, 0.5)',
    color: 'white',
    border: '1px solid rgba(100, 116, 139, 0.5)',
  }

  const operatorButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'rgba(168, 85, 247, 0.3)',
    color: '#d8b4fe',
    border: '1px solid rgba(168, 85, 247, 0.5)',
  }

  const equalButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(to right, #a855f7, #ec4899)',
    color: 'white',
    border: '1px solid rgba(168, 85, 247, 0.4)',
  }

  const clearButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    color: '#f87171',
    border: '1px solid rgba(239, 68, 68, 0.3)',
  }

  const functionButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'rgba(51, 65, 85, 0.5)',
    color: 'white',
    border: '1px solid rgba(71, 85, 105, 0.5)',
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '16px',
      background: 'linear-gradient(to bottom right, #0f172a, #581c87, #0f172a)'
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <span style={{ fontSize: '24px' }}>🧮</span>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>Calculator</h1>
          </div>

          <div style={{
            backgroundColor: 'rgba(30, 41, 59, 0.5)',
            borderRadius: '16px',
            padding: '16px',
            marginBottom: '24px',
            border: '1px solid rgba(51, 65, 85, 0.5)'
          }}>
            <div style={{ textAlign: 'right', color: '#94a3b8', fontSize: '14px', height: '24px' }}>
              {previousValue !== null && `${previousValue} ${operation || ''}`}
            </div>
            <div style={{ 
              textAlign: 'right', 
              color: 'white', 
              fontSize: '36px', 
              fontWeight: '300',
              letterSpacing: '2px',
              overflow: 'hidden'
            }}>
              {display}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            <button onClick={clear} style={clearButtonStyle}>C</button>
            <button onClick={handleToggleSign} style={functionButtonStyle}>+/-</button>
            <button onClick={handlePercent} style={functionButtonStyle}>%</button>
            <button onClick={() => performOperation('÷')} style={operatorButtonStyle}>÷</button>

            <button onClick={() => inputDigit('7')} style={numberButtonStyle}>7</button>
            <button onClick={() => inputDigit('8')} style={numberButtonStyle}>8</button>
            <button onClick={() => inputDigit('9')} style={numberButtonStyle}>9</button>
            <button onClick={() => performOperation('×')} style={operatorButtonStyle}>×</button>

            <button onClick={() => inputDigit('4')} style={numberButtonStyle}>4</button>
            <button onClick={() => inputDigit('5')} style={numberButtonStyle}>5</button>
            <button onClick={() => inputDigit('6')} style={numberButtonStyle}>6</button>
            <button onClick={() => performOperation('-')} style={operatorButtonStyle}>−</button>

            <button onClick={() => inputDigit('1')} style={numberButtonStyle}>1</button>
            <button onClick={() => inputDigit('2')} style={numberButtonStyle}>2</button>
            <button onClick={() => inputDigit('3')} style={numberButtonStyle}>3</button>
            <button onClick={() => performOperation('+')} style={operatorButtonStyle}>+</button>

            <button onClick={handleBackspace} style={functionButtonStyle}>⌫</button>
            <button onClick={() => inputDigit('0')} style={numberButtonStyle}>0</button>
            <button onClick={inputDecimal} style={numberButtonStyle}>.</button>
            <button onClick={handleEqual} style={equalButtonStyle}>=</button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px', color: '#94a3b8', fontSize: '14px' }}>
          <p>Click buttons to calculate</p>
        </div>
      </div>
    </div>
  )
}

export default App
