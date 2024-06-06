import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUserOwnedSpots } from "../../store/spots";
import { Link } from "react-router-dom";
import { IoStar } from "react-icons/io5"; 
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "./DeleteSpotModal";
import './ManageSpots.css';
const ManageSpots = () => {
  const dispatch = useDispatch();
  const spots = Object.values(useSelector((state) => (state.spot ? state.spot : {})));
  const userId = useSelector(state => state.session.user?.id);

  useEffect(() => {
    if (userId)
    dispatch(currentUserOwnedSpots());
  }, [dispatch, userId]);

  if (!spots.length) {
    return <div>Loading...</div>; 
  }

  return (
    <div id='current-owner-spots-container'>
      <h1>Manage Spots</h1>
      {spots.length === 0 && (
        <div>
          <Link to='/spots/new'>Create a New Spot</Link>
        </div>
      )}
      <div className='each-spot'>
        {spots.map((spot) => (
          <div key={spot.id} id='box'>
            <Link 
              className="link-current-spots" 
              to={`/spots/${spot.id}`}
              title={spot.name}
            > 
              <div className='each-spot-box'>
                <img
                  id='spot-image'
                  src={spot.previewImage}
                  alt='preview image'
                />
                <div id='city-state-rating'>
                  <p className="spot-city-state">{spot.city}, {spot.state}</p>
                  <p className="spot-avgRating">
                    <IoStar />
                    {spot.avgRating ? spot.avgRating : "New"}
                  </p> 
                </div>
                <div className="spot-price">{spot.price} night</div>
              </div>
            </Link>
            <div className='two-button'>
              <Link to={`/spots/${spot.id}/update`}>
                <button>Update</button>
              </Link>
              <OpenModalButton
                buttonText='Delete'
                modalComponent={<DeleteSpotModal spotId={spot.id} />}
                />
            </div>
          </div>
        ))}
      </div>    
    </div>
  );
};

export default ManageSpots;