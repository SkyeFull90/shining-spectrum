import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    // Fetch reviews from the API when the component mounts
    axios.get('/api/reviews')
      .then(response => setReviews(response.data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewReview(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Post new review to the API
    axios.post('/api/reviews', { review: newReview })
      .then(response => {
        // Add the new review to the state
        setReviews(prevReviews => [...prevReviews, response.data]);
        // Clear the input field
        setNewReview('');
      })
      .catch(error => console.error('Error posting review:', error));
  }; 

  return (
      <div>
          <h1>Reviews</h1>
          <div>
              <h2>Leave a Review</h2>
              <form onSubmit={handleSubmit}>
                  <input type="text" value={newReview} onChange={handleInputChange}/>
                  <button type="submit">Post review</button>
              </form>
          </div>

          {reviews.map((review, index) => (
              <div key={index}>
                  <h3>{review.name}</h3>
                  <p >{review}</p>
              </div>
          ))}
      </div>
  );
}

export default Reviews;