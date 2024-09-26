import React, { useState } from 'react';

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can send the rating to your backend or store it in local storage
    console.log(`User rated the app: ${rating} stars`);
    setSubmitted(true);
  };

  return (
    <div className="rating-container">
      <h2>Rate the App</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${rating >= star ? 'filled' : ''}`}
                onClick={() => handleRatingClick(star)}
              >
                ★
              </span>
            ))}
          </div>
          <button type="submit" disabled={rating === 0}>
            Submit Rating
          </button>
        </form>
      ) : (
        <p>Thank you for your rating!</p>
      )}
    </div>
  );
};

export default Rating;
