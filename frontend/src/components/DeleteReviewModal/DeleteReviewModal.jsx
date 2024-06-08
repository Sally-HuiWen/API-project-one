//scr/components/DeleteReviewModal/DeleteReviewModal.jsx
import { useDispatch} from "react-redux";
import { useModal } from "../../context/Modal";
import {deleteMyOwnReview } from "../../store/reviews";


export default function DeleteReviewModal({ reviewId, spot }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const ClickYes = async (e) => {
    e.preventDefault();
    try {
      await dispatch(deleteMyOwnReview(reviewId));
      closeModal();
    } catch (error) {
      console.error('can not delete review:', error);
    }
  };

  const ClickNo = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div id="delete-box">
      <h1>Confirm Delete</h1>
      <h2>Are you sure you want to delete this review?</h2>
      <button id="yes-button" onClick={(e)=>ClickYes(e)}>Yes (Delete Review)</button>
      <button className="no-button" onClick={(e)=>ClickNo(e)}>No (Keep Review)</button>
    </div>
  );
}

