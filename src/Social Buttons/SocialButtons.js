import React from 'react'
import './index.css'

function SocialButtons() {
  return (
    <div className='social-buttons-container'>
          <h1 className='social-buttons-heading'>Social Buttons</h1>
          <div className='social-buttons-button-container'>
              <button className='social-buttons-button like'>Like</button>
              <button className='social-buttons-button comment'>Comment</button>
              <button className='social-buttons-button share'>Share</button>
          </div>
    </div>
  )
}

export default SocialButtons
