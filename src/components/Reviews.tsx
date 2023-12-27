import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import ErrorBoundary from "./ErrorBoundry.ts";

interface Review {
  id: number;
  name: string;
  review: string;
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState('');

useEffect(() => {
  (async () => {
    try {
      await fetchReviews();
    } catch (error) {
      console.error('Error fetching reviews', error);
    }
  })();
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
      try {
        await fetchReviews();
      } catch (error) {
        console.error('Error fetching reviews', error);
      }
    }
  };

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div className="max-w-3xl w-full">
        <h2>Reviews</h2>
        <form onSubmit={handleSubmit} className="block border bg-blue-100 border-blue-300 rounded-md p-6 dark:bg-blue-950 dark:border-blue-800">
          <div>
            <label className="block mb-1 font-medium dark:text-zinc-300 text-zinc-900 text-sm" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Sam"
              required
              name="name"
              className="w-full block rounded-md py-1 px-3 dark:bg-zinc-800 dark:text-zinc-300 border bg-zinc-50 border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:bg-zinc-900 focus:bg-white focus:ring-opacity-60"
            />
          </div>
          <div className="mt-3">
            <label className="block mb-1 font-medium dark:text-zinc-300 text-zinc-900 text-sm" htmlFor="message">Message</label>
            <input
              id="message"
              type="text"
              className="w-full block rounded-md py-1 px-3 dark:bg-zinc-800 dark:text-zinc-300 border bg-zinc-50 border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:bg-zinc-900 focus:bg-white focus:ring-opacity-60"
              placeholder="A friendly message"
              required
              name="message"
            />
          </div>
          <button
            className="w-full dark:bg-zinc-100 bg-zinc-900 border-zinc-900 py-1.5 border dark:border-zinc-100 rounded-md mt-4 dark:text-zinc-900 text-zinc-100 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
          >
            Submit
          </button>
        </form>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {reviews.map((review) => (
            <li key={review.id} className="p-4 border rounded-md bg-white dark:bg-zinc-800 dark:border-zinc-700">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{review.name}</p>
              <p className="mt-1">{review.review}</p>
            </li>
          ))}
        </ul>
      </div>
    </ErrorBoundary>
  );
};

export default Reviews;