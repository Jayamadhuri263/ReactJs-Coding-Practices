import React,{useState} from 'react'
import './index.css'

function LettersCalculator() {
    const [letterValue, setLetterValue] = useState("")

  return (
      <div className='letters-calculator-container'>
          <div>
            <img src="https://assets.ccbp.in/frontend/react-js/stop-watch-with-calculator-img.png" alt="calculator" className='letters-calculator-image' />
          </div>
          <div className='letters-calculator-mini-container'>
              <h1 className='letters-calculator-heading'>Calculate the Letters you enter</h1>
              <label className='letters-calculator-label' htmlFor='letters-calculator-id'>Enter the phrase</label>
              <input id='letters-calculator-id' type="text" value={letterValue} onChange={e => setLetterValue(e.target.value)} className="letters-calculator-input" />
              <h1 className='letters-calculator-button'>No.of Letters: { letterValue.length}</h1>
          </div>          
      </div>
  )
}

export default LettersCalculator
