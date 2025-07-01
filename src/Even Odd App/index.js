import React,{useState} from 'react'
import './index.css'

function EvenOddApp() { 
    const number = Math.floor(Math.random() * 100) ;
    const [randomNumber, setRandomNumber] = useState(0)

    const numberType = randomNumber % 2 === 0 ? "Even" : "Odd" 
    
    return (
        <div className='even-odd-app-container'>
            <h1 className='even-odd-app-count-value'>Count {randomNumber}</h1>
            <p className='even-odd-app-count-type'>Count is {numberType}</p>
            <button className='even-odd-app-button' onClick={() => setRandomNumber(number)}>Change Number</button>
            <p className='even-odd-app-note'>*Increase By Random Number Between 0 to 100</p>
        </div>
    )
}

export default EvenOddApp
