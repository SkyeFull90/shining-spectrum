import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../lib/supabase'; // adjust the path as needed

type FormData = {
    name: string;
    review: string;
};

type ReviewData = {
    id: string;
    name: string;
    review: string;
};

const Reviews: React.FC = () => {
    const { register, handleSubmit, reset } = useForm<FormData>();
    const [reviews, setReviews] = useState<ReviewData[]>([]);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        const { data, error } = await supabase.from('reviews').select('*');
        if (error) console.error('Error fetching reviews:', error);
        else setReviews(data || []);
    };

    const onSubmit = async (data: FormData) => {
        const { name, review } = data;

        // Send data to your Supabase table
        const { error } = await supabase
            .from('reviews')
            .insert([{ name, review }]);

        if (error) {
            console.error('Error submitting review:', error);
        } else {
            reset(); // Reset form after successful submission
            fetchReviews(); // Fetch the latest reviews
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Name:
                    <input {...register('name', { required: true })} />
                </label>
                <label>
                    Review:
                    <textarea {...register('review', { required: true })} />
                </label>
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