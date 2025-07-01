import '../index.css'

const CardItem = props => {
    const { cardDetails } = props
    const { title, description, imgUrl, className } = cardDetails
    
    return (
        <li className={`${className} card-item-container`}>
            <h1 className='card-item-heading'>{title}</h1>
            <p className='card-item-description'>{description}</p>
            <div className='card-item-image-container'>
                <img src={imgUrl} alt={`${title}-img`} className='card-item-image' />
            </div>
        </li>
    )
}

export default CardItem