import { FaStar } from "react-icons/fa";
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
            <Link 
              className="link-all-spots" 
              key={spot.id} to={`/spots/${spot.id}`}
              title={spot.name}//using the title attribute in the <Link> element will create a simple tooltip that displays the value of spot.name when you hover
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
                        <FaStar />
                    {spot.avgRating?spot.avgRating: "New"}
                    </p> 
                </div>
                <div className="spot-price">{spot.price}night</div>
             </div>        
            </Link>   

        ))}
    </div>
  );
};

export default SpotsList;
