import { deleteOneSpot } from "../../store/spots";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './DeleteSpotModal.css';

export default function DeleteSpotModal({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const ClickYes = async (e) => {
    e.preventDefault();
    try {
      await dispatch(deleteOneSpot(spotId))
      closeModal();
    } catch(error) {
      console.error('Fail to delete spot:', error);
    }
  };

  const ClickNo = (e) => {
    e.preventDefault;
    closeModal();
  };

  return (
    <div id="delete-box">
      <h1>Confirm Delete</h1>
      <h2>Are you sure you want to remove this spot from the listing?</h2>
      <button id='yes-button' onClick={(e) => ClickYes(e)}>Yes(Delete Spot)</button>
      <button id='no-button' onClick={(e) => ClickNo(e)}>No(Delete Spot)</button>
    </div>
  );
}

