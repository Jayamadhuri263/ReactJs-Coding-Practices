import React from 'react'
import CardItem from './CardItem'
import './index.css'

const cardsList = [
  {
    id: 1,
    title: 'Data Scientist',
    description:
      'Data scientists gather and analyze large sets of structured and unstructured data',
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/data-scientist-img.png',
    className: 'tech-card-1',
  },
  {
    id: 2,
    title: 'IOT Developer',
    description:
      'IoT Developers are professionals who can develop, manage, and monitor IoT devices.',
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/iot-developer-img.png',
    className: 'tech-card-2',
  },
  {
    id: 3,
    title: 'VR Developer',
    description:
      'A VR developer creates completely new digital environments that people can see.',
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/vr-developer-img.png',
    className: 'tech-card-3',
  },
  {
    id: 4,
    title: 'ML Engineer',
    description:
      'Machine learning engineers feed data into models defined by data scientists.',
    imgUrl: 'https://assets.ccbp.in/frontend/react-js/ml-engineer-img.png',
    className: 'tech-card-4',
  },
]


const TechnologyCards = () => {
    
  return (
    <div className='technology-cards-container'>
          <div className='technology-cards-min-container'>
                <h1 className='technology-cards-heading'>Learn 4.0 Technologies</h1>
                <p className='technology-cards--description'>Get trained by alumni of IITs and top companies like Amazon, Microsoft,
                    Intel, Nvidia, Qualcomm,etc. Learn directly from professionals involved in Product Development.</p>
                <div className={`technology-card-container`}>
                  {cardsList.map(cardItem => {
                      return (
                            <CardItem cardDetails={cardItem} key={cardItem.id} />
                        )
                    })}
                </div>
          </div>
    </div>
  )
}

export default TechnologyCards
