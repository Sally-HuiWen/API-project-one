// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useState ,useEffect} from "react";
// import { getOneSpotDetail } from "../../store/spots";
// import "./SpotDetail.css";


// function SpotDetail() {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const {spotId} = useParams();
//   const dispatch = useDispatch();
//   const spot = useSelector((state) => state.spot[spotId]);
 
//   useEffect(() => {
//     dispatch(getOneSpotDetail(spotId)).then(() => setIsLoaded(true));
// }, [dispatch, spotId]);

//   return (
//     <div >
//         <h1>{spot.name}</h1>
//         <p>{spot.city}, {spot.state}, {spot.country}</p>
//         <div className='images for this spot'>
//             <div
//                 className="preview-img-div"
//                 style={{ backgroundImage: `url(${previewImage.url})` }}
//                 alt={`${currentSpot.name} photo`}
//               >
//                 <div className="inside-img-div"></div>
//               </div>
//               <div className="photo-square">
//                 <div
//                   className="other-img-div"
//                   style={{ backgroundImage: `url(${otherImages[0]?.url})` }}
//                   alt={`${currentSpot.name} photo`}
//                 ></div>
//                 <div
//                   className="other-img-div"
//                   style={{ backgroundImage: `url(${otherImages[1]?.url})` }}
//                   alt={`${currentSpot.name} photo`}
//                 ></div>
//                 <div
//                   className="other-img-div"
//                   style={{ backgroundImage: `url(${otherImages[2]?.url})` }}
//                   alt={`${currentSpot.name} photo`}
//                 ></div>
//                 <div
//                   className="other-img-div"
//                   style={{ backgroundImage: `url(${otherImages[3]?.url})` }}
//                   alt={`${currentSpot.name} photo`}
//                 ></div>
//               </div>
//             </div>
//             {/*  MIDDLE SECTION */}
//             <div className="description-and-booking-section">
//               <div className="description-div">
//                 <h3 className="hosted-by">
//                   Hosted by {currentSpot.Owner.firstName}{" "}
//                   {currentSpot.Owner.lastName}
//                 </h3>
//                 <p>{currentSpot.description}</p>
//               </div>
//               {/* bookings section */}
//               <div className="bookings-div">
//                 <div className="top-of-bookings">
//                   <div className="price-div">
//                     <h2>${currentSpot.price} </h2> <span>/night</span>
//                   </div>
//                   <div className="ratingAndStar-bookings">
//                     <FaStar />
//                     <p className="avg-rating"> {currentSpot.avgRating}</p>

//                     {currentSpot.numReviews > 0 && <p> · </p>}
//                     {currentSpot.numReviews > 0 && (
//                       <p className="num-reviews-middle">
//                         {currentSpot.numReviews}{" "}
//                         {currentSpot.numReviews > 1 ? "Reviews" : "Review"}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//                 <button
//                   className="booking-button"
//                   onClick={() => alert("Feature coming soon")}
//                 >
//                   Reserve
//                 </button>
//               </div>
//             </div>
//             {/* REVIEWS SECTION */}
//             <div className="reviews-section-div">
//               <ReviewsSection currentSpot={currentSpot} />
//             </div>
//           </main>
//         ) : null}
//       </div>
//     </div>
//   );
// }

// export default SpotDetails;