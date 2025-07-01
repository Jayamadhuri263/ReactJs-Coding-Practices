import React,{useState} from 'react'
import './index.css'
import GoogleSearchItem from './Search Item';

const suggestionsList = [
  {id: 1, suggestion: 'Price of Ethereum'},
  {id: 2, suggestion: 'Oculus Quest 2 specs'},
  {id: 3, suggestion: 'Tesla Share Price'},
  {id: 4, suggestion: 'Price of Ethereum today'},
  {id: 5, suggestion: 'Latest trends in AI'},
  {id: 6, suggestion: 'Latest trends in ML'},
]

function GoogleSearchSuggestion() {
    const [searchValue, setSearchValue] = useState("");
    const suggestedList = suggestionsList.filter(item => item.suggestion.toLowerCase().includes(searchValue.toLowerCase()));
    
    const updateSearch = value => {
        setSearchValue(value)
    }

    return (
      <div className="app-container-google">
        <div className="suggestions-container-google">
          <img
            src="https://assets.ccbp.in/frontend/react-js/google-logo.png"
            alt="google logo"
            className="logo-google"
          />
          <div className="input-container-google">
            <div className="search-input-container-google">
              <img
                alt="search icon"
                className="icon-google"
                src="https://assets.ccbp.in/frontend/react-js/google-search-icon.png"
              />
              <input
                type="search"
                className="search-input-google"
                placeholder="Search Google"
                onChange={e => setSearchValue(e.target.value)}
                value={searchValue}
              />
            </div>
            <ul className="suggestions-list-google">
              {suggestedList.map(eachSuggestion => (
                <GoogleSearchItem
                  key={eachSuggestion.id}
                  suggestionDetails={eachSuggestion}
                  updateSearch={updateSearch}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>










    // <div className='google-search-suggestion-container'>
    //       <img src="https://assets.ccbp.in/frontend/react-js/google-logo.png" alt="google logo" className='google-search-suggestion-icon' />
    //       <div className='destination-list-search-bar'>
    //             <input placeholder='Search' type="search" value={searchValue} onChange={e => setSearchValue(e.target.value)} className="destination-list-search" />
    //             <img src="https://assets.ccbp.in/frontend/react-js/destinations-search-icon-img.png" alt="search-icon" className='destination-list-search-icon' />
    //           <div className='suggestions-list'>
    //               {suggestedList.map(SuggestItem => (
    //                 <GoogleSearchItem key={SuggestItem.id} suggestDetails={SuggestItem} updateSearch={updateSearch} />
    //             ))}
    //             </div>
    //       </div>

    // </div>
  )
}

export default GoogleSearchSuggestion
