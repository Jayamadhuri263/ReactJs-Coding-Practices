import React from 'react'
import './index.css'

function Notifications() {
  return (
    <div className='notifications-container'>
          <h1 className='notifications-heading'>Notifications</h1>
          <div className='notifications-bar-container'>
              <div className='notification-container primary'>
                  <img src="https://assets.ccbp.in/frontend/react-js/primary-icon-img.png" alt="info" className='notification-icon' />
                  <p className='notification-message'>Information Message</p>
              </div>
              <div className='notification-container success'>
                  <img src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png" alt="success" className='notification-icon' />
                  <p className='notification-message'>Success Message</p>
              </div>
              <div className='notification-container warning'>
                  <img src="https://assets.ccbp.in/frontend/react-js/warning-icon-img.png" alt="warning" className='notification-icon' />
                  <p className='notification-message'>Warning Message</p>
              </div>
              <div className='notification-container danger'>
                  <img src="https://assets.ccbp.in/frontend/react-js/danger-icon-img.png" alt="error" className='notification-icon' />
                  <p className='notification-message'>Error Message</p>
              </div>
          </div>
    </div>
  )
}

export default Notifications
