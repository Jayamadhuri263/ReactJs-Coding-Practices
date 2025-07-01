import React from 'react'
import '../index.css'

function HistoryItem(props) {
    const { historyDetails,deleteHistory } = props
    const { id, title, timeAccessed, logoUrl, domainUrl } = historyDetails

    const onDeleteHistoryItem = () => {
        deleteHistory(id)
    }
    
    return (
        <div className='history-item-main-container'>
            <p className='history-item-time-accessed'>{timeAccessed}</p>
            <div className='history-item-container'>
                <div className='history-item-image-data-container'>
                    <img src={logoUrl} alt={title} className="history-item-image" />
                    <h1 className='history-item-title'>{title} <br /> <span className='history-item-domain-url'>{ domainUrl}</span></h1>
                </div> 
                <button type="button" className='history-item-delete-button' onClick={onDeleteHistoryItem}>
                    <img src="https://assets.ccbp.in/frontend/react-js/delete-img.png" alt="delete icon" className='history-item-delete-icon' />
                </button>
            </div>
        </div>
    )
}

export default HistoryItem
