import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Review {
  id: number;
  name: string;
  review: string;
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data, error } = await supabase.from('reviews').select('*');
    if (error) console.error('Error fetching reviews', error);
    else setReviews(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('reviews').insert([{ review: newReview }]);
    if (error) console.error('Error submitting new review', error);
    else {
      setNewReview('');
      fetchReviews();
    }
  };

  return (
    <div>
      <h2>Reviews</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          required
        />
        <button type="submit">Submit Review</button>
      </form>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>{review.name}</p>
            <p>{review.review}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;