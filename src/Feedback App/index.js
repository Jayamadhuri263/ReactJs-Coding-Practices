import React,{useState} from 'react'
import './index.css'

const feedbackData = {
    emojis: [
        { id: 0, name: 'Sad', imageUrl: 'https://assets.ccbp.in/frontend/react-js/sad-emoji-img.png', },
        { id: 1, name: 'None', imageUrl: 'https://assets.ccbp.in/frontend/react-js/none-emoji-img.png', },
        { id: 2, name: 'Happy', imageUrl: 'https://assets.ccbp.in/frontend/react-js/happy-emoji-img.png', },
    ],
    loveEmojiUrl: 'https://assets.ccbp.in/frontend/react-js/love-emoji-img.png',
}

function FeedBackApp() {
    const [isFeedbackVisible, setFeedbackVisible] = useState(true)

  return (
    <div className='feedback-container'>
        <div className=' feedback-emojis-container'>
                  {
                  isFeedbackVisible ? (
                        <div className='feedback-min-container'>
                            <h1 className='feedback-heading'>How satisfied are you with our customer support performance?</h1> 
                          <div className='row-container'>
                              {feedbackData.emojis.map(emoji => (
                                <li key={emoji.id} className="feedback-list-element">
                                    <button type='button' className='feedback-button' onClick={() => setFeedbackVisible(false)}>
                                            <img src={emoji.imageUrl } alt={emoji.name } className="feedback-emojis-image" />
                                    </button>
                                    <p className='feedback-emojis-name'>{emoji.name }</p>
                                </li>
                            ))}
                          </div>
                        </div>
                  ) : (
                          <div className='feedback-min-container'>
                            <li className='after-feedback-container'>
                                <img src={feedbackData.loveEmojiUrl } alt="love" className="feedback-emojis-love-icon" />
                                  <h1 className='feedback-heading'>Thank You!</h1>
                                  <p className='feedback-note'>We will use your feedback to improve our customer support performance.</p>
                              </li>
                          </div>
                      )
                  }
        </div>
    </div>
  )
}

export default FeedBackApp
