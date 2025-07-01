import React from 'react'
import '../index.css'

function ImageItem(props) {
    const { imageDetails,showSelectedImage } = props 
    const { id,thumbnailUrl, thumbnailAltText } = imageDetails
    
    const onImageClick = () => {
        showSelectedImage(id)
    }
    
  return (
    <div className='image-item-container'>
          <button className='image-item-button' onClick={onImageClick}>
              <img src={thumbnailUrl} alt={thumbnailAltText} className='imgae-item-icon' />
        </button>
    </div>
  )
}

export default ImageItem
