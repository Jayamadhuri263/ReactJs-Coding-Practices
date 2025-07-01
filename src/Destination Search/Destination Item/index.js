import React from 'react'
import '../index.css'

function DestinationItem(props) {
    const { destinationDetails } = props
    const { name, imgUrl } = destinationDetails
    
  return (
    <div className='destinationItem-container'>
          <img src={imgUrl} alt={name} className="destinationItem-image" />
          <h1 className='destinationItem-name'>{ name}</h1>
    </div>
  )
}

export default DestinationItem
