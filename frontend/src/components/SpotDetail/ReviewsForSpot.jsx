import { useDispatch, useSelector } from "react-redux";
import { IoStar } from "react-icons/io5";
import OpenModalButton from "../OpenModalButton";
import ReviewFormModal from "../ReviewFormModal/ReviewFormModal";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";
import { getReviewsOfOneSpot} from "../../store/reviews";
import { useEffect } from "react";
import './ReviewsForSpot.css';


export default function ReviewsForSpot({ spot }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  // console.log('could you see user?', user)
  const reviews = useSelector((state) => state.review.reviews); // it is an array!
  // console.log('do you see reviews', reviews)
  
  useEffect(() => {
    dispatch(getReviewsOfOneSpot(spot.id));
  }, [dispatch, spot.id]);

  let userReview;
  if (user && user.id !== spot.Owner.id && reviews.length > 0) {
   userReview = reviews.find((review) => review.userId === user.id);
  }
  
  reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const changeDateFormat = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };
  // console.log('Reviews is loaded or not', reviews);

  const totalRatingForReviews = reviews.map(review => review.stars).reduce((acc,curr)=> acc + curr, 0);
  const reviewNum = reviews.length;
  const avgRating = reviewNum > 0 ? totalRatingForReviews / reviewNum : 0;

  return (
    <div className="reviews-box">
      <div id="reviews-header">
        <h2 className="avgRating">
          <IoStar />
          {reviewNum > 0 ? avgRating.toFixed(2) : "New"}
        </h2>
        {reviews.length > 0 && <h2>.</h2>}
        <h2 className="numReviews">
          {reviews.length} {reviews.length > 1 ? "Reviews" : "Review"}
        </h2>
      </div>

      {user && user.id !== spot.Owner.id && !userReview && (
        <div>
          <OpenModalButton
            buttonText="Post Your Review"
            modalComponent={<ReviewFormModal spot={spot} user={user}/>}
          />
        </div>
      )}
      {user && user.id !== spot.Owner.id && !userReview && reviews.length === 0 && (
        <p>Be the first to post a review!</p>
      )}
      {reviews.length > 0 && (
        <div id="reviews-container">
          {reviews.map((review) => {
            const monthYear = changeDateFormat(review.createdAt);
            return (
              <div key={review.id} className="one-review-box">
                <h3 className="review-title">{review.User.firstName}</h3>
                <p className="review-date">{monthYear}</p>
                <p className="review-content">{review.review}</p>
                {user && user.id === review.User.id && (
                  <OpenModalButton
                    buttonText="Delete"
                    modalComponent={
                      <DeleteReviewModal reviewId={review.id} spot={spot}/>
                    }
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}