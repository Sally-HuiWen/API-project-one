import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import './SpotsIndex.css'


const spotsIndex = () => {
  const spots = useSelector((state) => (state.spots))
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpots());
  }, []);

  return (
    <section>
      <ul>
        {spots.map((spot) => (
          <Link className="get-all-spots" key={spot.id} to={`/spots/${spot.id}`}>{spot.name}</Link>
        ))}
      </ul>
    </section>
  );
};

export default spotsIndex;
