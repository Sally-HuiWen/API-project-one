//src/components/Review
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useState, useEffect } from "react";
import StarRatingInput from "./StarRatingInput";
import {createNewReview} from "../../store/reviews";
import './ReviewFormModal.css'

export default function ReviewFormModal({spot, user}) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(0);
  const [frontendErrors, setFrontendErrors] = useState([]);
  const [backendErrors, setBackendErrors] = useState({})
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(()=> {
    const errorArr = [];
    if (review.length < 10) errorArr.push('comments are fewer than 10 characters')
    if (stars === 0 ) errorArr.push('No stars are selected')
    setFrontendErrors(errorArr)
  },[review, stars])
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const rawReview = {review, stars};
    const newReview = await dispatch(createNewReview(spot.id, rawReview, user))
   
    if (newReview.errors) {
        setBackendErrors(newReview.errors)
    } else {
        closeModal();
    }
  
  }
  return (
    <form onSubmit={handleSubmit} id='leave-a-review-container'>
      <h1>How was your stay?</h1>
      {hasSubmitted && Object.values(backendErrors).length > 0 && (
        <div className="backendErrors-messages">
          {Object.values(backendErrors).map((error, index) => <p key={index}>{error}</p>)}
        </div>
      )}
      <label>
        <textarea
         className='comment-content'
         value={review}
         onChange={(e)=>setReview(e.target.value)}
         placeholder="Leave your review here..."
         />
      </label>
      <div className='starIcon-and-stars'>
         <div>
          <StarRatingInput stars={stars} onChange={setStars} disabled={false} />
         </div>
         
         <p>stars</p>
      </div>
     
      <button id='review-submit' type='submit'>Submit Your Review</button>
    </form>
  );

    
}