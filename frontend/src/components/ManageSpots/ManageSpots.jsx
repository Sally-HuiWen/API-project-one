import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUserOwnedSpots } from "../../store/spots";
import { Link, useNavigate } from "react-router-dom";
import { IoStar } from "react-icons/io5"; 
import { deleteOneSpot } from "../../store/spots";

const ManageSpots = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const spots = Object.values(useSelector((state) => (state.spot ? state.spot : {})));

  useEffect(() => {
    dispatch(currentUserOwnedSpots());
  }, [dispatch]);

  if (!spots.length) {
    return <div>Loading...</div>; 
  }

  const updateSpot = (spotId) => {
    navigate(`/spots/${spotId}/update`);
  };

  const handleDeleteSpot = (spotId) => {
    dispatch(deleteOneSpot(spotId));
  };

  return (
    <div id='current-owner-spots-container'>
      <h1>Manage Spots</h1>
      {spots.length === 0 && (
        <div>
          <Link to='/spots/new'>Create a New Spot</Link>
        </div>
      )}
      <div>
        {spots.map((spot) => (
          <div key={spot.id}>
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
              <button onClick={() => updateSpot(spot.id)}>Update</button>
              <button onClick={() => handleDeleteSpot(spot.id)}>Delete</button>
        
            </div>
          </div>
        ))}
      </div>    
    </div>
  );
};

export default ManageSpots;