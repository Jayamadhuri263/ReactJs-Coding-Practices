import React from 'react'
import '../index.css'

function GoogleSearchItem(props) {
    const { suggestionDetails,updateSearch } = props
    const { suggestion } = suggestionDetails

    const onClickArrow = () => {
        updateSearch(suggestion)
    }

  return (
    <li className="suggestion-item-google">
      <p className="para-google">{suggestion}</p>
      <button type="button" className="arrow-button-google" onClick={onClickArrow}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/diagonal-arrow-left-up.png"
          alt="arrow"
          className="arrow-google"
        />
      </button>
    </li>
  )
}

export default GoogleSearchItem
