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

  const handleInputChange = (event) => {
    setNewReview(event.target.value);
  };

  const handleSubmit = (event) => {
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
      {reviews.map((review, index) => (
        <p key={index}>{review}</p>
      ))}
      <form onSubmit={handleSubmit}>
        <input type="text" value={newReview} onChange={handleInputChange} />
        <button type="submit">Post review</button>
      </form>
    </div>
  );
}

export default Reviews;