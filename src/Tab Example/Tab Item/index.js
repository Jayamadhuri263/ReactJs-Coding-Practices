import React from 'react'

function TabItem(props) {
    const { tabItemDetails, onTabItemClick, isActive } = props
    const { tabId, displayText } = tabItemDetails
    const buttonClickStyle = isActive ? "button-active" : "button-non-active"
    
    const onTabButtonClick = () => {
        onTabItemClick(tabId)
    }
    
  return (
    <li className="tab-item-container ">
      <button
        type="button"
        className={`tab-btn ${buttonClickStyle}`} onClick={onTabButtonClick}>
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
