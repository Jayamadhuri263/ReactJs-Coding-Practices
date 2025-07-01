import "../index.css";

function PrimeDealsProductCard(props) {
  const { primeDealsProductCard } = props;
  const {
    // availability,
    brand,
    // description,
    imageUrl,
    price,
    rating,
    // style,
    title,
    // totalReviews,
  } = primeDealsProductCard;

  return (
    <div className="prime-deals-product-card-container">
      <img
        src={imageUrl}
        className="prime-deals-product-card-image"
        alt="product view"
      />
      <h1 className="prime-deals-product-card-title">{title}</h1>
      <p className="prime-deals-product-card-brand">by {brand}</p>
      <div className="prime-deals-product-card-price-rating-container">
        <h1 className="prime-deals-product-card-price">Rs {price}/-</h1>
        <div className="prime-deals-product-card-star-rating-container">
          <p>{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            className="prime-deals-product-card-star"
            alt="star"
          />
        </div>
      </div>
    </div>
  );
}

export default PrimeDealsProductCard;
