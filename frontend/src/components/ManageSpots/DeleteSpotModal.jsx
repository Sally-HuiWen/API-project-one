import { deleteOneSpot } from "../../store/spots";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './DeleteSpotModal.css';

export default function DeleteSpotModal({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const handleYes = (e) => {
    e.preventDefault();
    return dispatch(deleteOneSpot(spotId))
      .then(() => {
        closeModal();
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
        }
      });
  };

  const handleNo = (e) => {
    e.preventDefault;
    closeModal();
  };

  return (
    <div id="delete-box">
      <h1>Confirm Delete</h1>
      <h2>Are you sure you want to remove this spot from the listing?</h2>
      <button id='yes-button' onClick={(e) => handleYes(e)}>Yes(Delete Spot)</button>
      <button id='no-button' onClick={(e) => handleNo(e)}>No(Delete Spot)</button>
    </div>
  );
}

