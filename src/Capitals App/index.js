import React,{useState} from 'react'
import './index.css'

const countryAndCapitalsList = [
  {
    id: 'NEW_DELHI',
    capitalDisplayText: 'New Delhi',
    country: 'India',
  },
  {
    id: 'LONDON',
    capitalDisplayText: 'London',
    country: 'United Kingdom',
  },
  {
    id: 'PARIS',
    capitalDisplayText: 'Paris',
    country: 'France',
  },
  {
    id: 'KATHMANDU',
    capitalDisplayText: 'Kathmandu',
    country: 'Nepal',
  },
  {
    id: 'HELSINKI',
    capitalDisplayText: 'Helsinki',
    country: 'Finland',
  },
]

const getCountry = selectedValue => {
    const activeCountryAndCapital = countryAndCapitalsList.find(
        eachCapital => eachCapital.id === selectedValue
    )
    return activeCountryAndCapital.country
}

function CapitalsApp() {
    const [selectedValue, setSelectedValue] = useState(countryAndCapitalsList[0].id)
    const country = getCountry(selectedValue)

  return (
    <div className='capitals-app-container'>
        <div className='capitals-app-mini-container'>
              <h1 className='capitals-app-heading'>Countries and Capitals</h1>
              <div className='capitals-app-input-container'>
                  <select className='capitals-app-select' value={selectedValue} onChange={e => setSelectedValue(e.target.value) } >
                      {
                          countryAndCapitalsList.map(eachCountry => (
                              <option className='capitals-app-option' key={eachCountry.id} value={eachCountry.id} >{ eachCountry.capitalDisplayText}</option>
                          ))
                      }
                  </select>
                  <p className='capitals-app-question'>is capital of which country?</p>
              </div>
              <p className='capitals-app-answer'>{ country}</p>
        </div>
    </div>
  )
}

export default CapitalsApp
