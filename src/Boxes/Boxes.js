import React from 'react'
import './index.css'

function Boxes() {
  return (
    <div className='boxes-container'>
          <h1 className='boxes-heading'>Boxes</h1>
          <div className='boxes-mini-container'>
              <div className='box-container small'>
                  <p className='box-message'>Small</p>
              </div>
              <div className='box-container medium'>
                  <p className='box-message'>Medium</p>
              </div>
              <div className='box-container large'>
                  <p className='box-message'>Large</p>
              </div>
          </div>
    </div>
  )
}

export default Boxes
