import React, { useState } from 'react'
import './index.css'

function LightDarkMode() {
    const [isLightMode, setMode] = useState(true);

    const headingColor = isLightMode ? "light-dark-mode-light" : "light-dark-mode-dark";
    const buttonText = isLightMode ? "Dark Mode" : "Light Mode";
  return (
    <div className='light-dark-mode-container'>
          <div className={`${headingColor}  light-dark-mode-mini-container`}>
              <h1 className={` light-dark-mode-heading`}>Click to Change Mode</h1>
              <button className='light-dark-mode-button' onClick={() => setMode(!isLightMode)}>{ buttonText }</button>
          </div>
    </div>
  )
}

export default LightDarkMode
