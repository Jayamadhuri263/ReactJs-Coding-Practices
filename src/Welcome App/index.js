import React, { useState } from 'react'
import './index.css'

function WelcomeApp() {
    const [subscribe, setSubscribe] = useState(false)

  return (
    <div className='welcome-app-container'>
          <h1 className='welcome-app-heading'>Welcome</h1>
          <p className='welcome-app-message'>Thank you! Happy Learning</p>
          <button className='welcome-app-button' onClick={() => setSubscribe(!subscribe)}>{ subscribe ? "Subscribed": "Subscribe"}</button>
    </div>
  )
}

export default WelcomeApp
