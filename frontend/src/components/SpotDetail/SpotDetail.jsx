import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState ,useEffect} from "react";
import { getOneSpotDetail } from "../../store/spots";
import "./SpotDetail.css";
import { IoStar } from "react-icons/io5";
import ReviewsForSpot from "./ReviewsForSpot";
import { getReviewsOfOneSpot } from "../../store/reviews";

export default function SpotDetail() {
  const [isLoaded, setIsLoaded] = useState(false);
  const {spotId} = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spot[spotId]);
  
  const reviews = useSelector((state) => state.review.reviews); // it is an array!
  const totalRatingForReviews = reviews.map(review => review.stars).reduce((acc,curr)=> acc + curr, 0);
  const reviewNum = reviews.length;
  const avgRating = reviewNum > 0 ? totalRatingForReviews / reviewNum : 0;

 
  useEffect(() => {
    dispatch(getOneSpotDetail(spotId)).then(() => setIsLoaded(true));
    dispatch(getReviewsOfOneSpot(spotId));
}, [dispatch, spotId]);

  return (
    <div className='big-container'>
      {isLoaded && spot && (
        <>
          <h1>{spot.name}</h1>
          <p>{spot.city}, {spot.state}, {spot.country}</p>
  
          <div className="image-grid">
          {spot.SpotImages && spot.SpotImages.length > 0 && (
            <>
              {spot.SpotImages[0] && (
                <img
                  className="img1"
                  src={spot.SpotImages[0].url}
                  alt="img1"
                />
              )}
              {spot.SpotImages[1] && (
                <img
                  className="img2"
                  src={spot.SpotImages[1].url || '/noImage.jpeg'}
                  alt="img2"
                />
              )}
              {spot.SpotImages[2] && (
                <img
                  className="img3"
                  src={spot.SpotImages[2].url || '/noImage.jpeg'}
                  alt="img3"
                />
              )}
              {spot.SpotImages[3] && (
                <img
                  className="img4"
                  src={spot.SpotImages[3].url || '/noImage.jpeg'}
                  alt="img4"
                />
              )}
              {spot.SpotImages[4] && (
                <img
                  className="img5"
                  src={spot.SpotImages[4].url || '/noImage.jpeg'}
                  alt="img5"
                />
              )}
            </>
          )}
          </div>

          <div className='owner-and-booking-box'>
            <div className='owner-and-description'>
              <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
              <p>{spot.description}</p>
            </div>

            <div className='booking'>
              <div className='price-rating-review'>
                <h2>{spot.price} night</h2>
                <p className="avgRating">
                  <IoStar />
                  {reviewNum > 0 ? avgRating.toFixed(2) : "New"}
                </p>
                {reviews.length > 0 && <p>  . </p>}
                 <p className='numReviews'>{reviews.length} {reviews.length > 1 ? "Reviews" : "Review"}</p>
              </div>
              
              <button
               className='booking-button'
               onClick={()=> alert("Feature coming soon...")}
               >Reserve</button>
            </div>
          </div>
          
          <div>
            <ReviewsForSpot spot={spot}/>
          </div>
        

        </>
      )}
    </div>
  )}

