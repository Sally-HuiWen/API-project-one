import { IoStar } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import './SpotsList.css'


const SpotsList = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const spots = Object.values(useSelector((state) => (state.spot ? state.spot : {})))
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpots()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="get-all-spots">
        {isLoaded && spots && spots.map((spot) => (
          <div className="spot-tile-container" key={spot.id}>
            <Link 
              className="link-all-spots" 
              to={`/spots/${spot.id}`}
            > 
             <div className='container'>
                <img
                 id='spot-image'
                 src={spot.previewImage}
                 alt='preview image'
               />
                <div id='city-state-rating'>
                    <p className="spot-city-state">{spot.city}, {spot.state}</p>
                    <p className="spot-avgRating">
                      <IoStar />
                    {spot.avgRating?spot.avgRating.toFixed(2): "New"}
                    </p> 
                </div>
                <div className="spot-price">${spot.price} / night</div>
             </div> 
            <div className="tooltip">{spot.name}</div>     
            </Link>  
             
        </div> 

        ))}
    </div>
  );
};

export default SpotsList;
