import React,{useState} from 'react'
import './index.css'

function ShowHideApp() {
    const [joeStatus, setJoeStatus] = useState(false)
    const [jonusStatus, setJonusStatus] = useState(false)

    const jeoStatusValue = joeStatus ? "show-name" : 'hide-name';
    const jonusStatusValue = jonusStatus ? "show-name" : 'hide-name';

  return (
    <div className='show-hide-app-container'>
          <h1 className='show-hide-app-heading'>Show/Hide Application</h1>
          <div className='show-hide-app-mini-containers'>
              <div className='show-hide-app-mini-container'>
                  <button className='show-hide-app-name-container' onClick={() => setJoeStatus(!joeStatus)}>Show/Hide First name</button>
                  <div className={` ${jeoStatusValue} show-hide-app-firstname-container`}>Joe</div>
              </div>
              <div className='show-hide-app-mini-container'>
                  <button className='show-hide-app-name-container' onClick={() => setJonusStatus(!jonusStatus)}>Show/Hide Last name</button>
                  <div className={` ${jonusStatusValue} show-hide-app-firstname-container`}>Jonus</div>
              </div>
          </div>
    </div>
  )
}

export default ShowHideApp
