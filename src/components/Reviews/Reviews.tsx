import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewData } from '../../state/data/dataSlice';
import './Reviews.scss';
import { AppDispatch, RootState } from '../../state/store';

interface ReviewProps {
  type: string;
  id: string;
}

const Reviews = ({ type, id }: ReviewProps) => {
  const genresLoaded = useSelector(
    (state: RootState) => state.data.genresLoaded
  );
  const reviewData = useSelector((state: RootState) => state.data.reviewData);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (genresLoaded) {
      dispatch(getReviewData({ id: id, type: type }));
    }
  }, [genresLoaded]);

  return (
    <div className="reviews">
      <h1>Reviews</h1>
      <div className="reviews-container">
        {reviewData?.results?.length === 0 ? (
          <p className="reviews-none">No reviews found</p>
        ) : (
          reviewData?.results?.map((review) => {
            return (
              <div key={review.id} className="review-card">
                <div className="review-meta">
                  <div className="review-author">{review.author}</div>
                  <div className="review-created">
                    {review.created_at.split('T')[0]}
                  </div>
                  <div className="review-content">{`"${review.content}"`}</div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Reviews;
