import { csrfFetch } from './csrf.js';

//types
const GET_REVIEWS = 'reviews/getReviews'
const DELETE_REVIEW = 'reviews/deleteReview'
const CREATE_REVIEW = 'reviews/createReview'

//action creators
export const getReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews
})

export const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})

export const createReview = (spotId, review, user) => ({
    type: CREATE_REVIEW,
    spotId,
    review,
    user
})

//thunk creators
export const getReviewsOfOneSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (res.ok) {
        const resBody = await res.json();
        // console.log('fetching reviews of one spot res body only', resBody)
        dispatch(getReviews(resBody.Reviews));//resBody.Reviews is an array
    } else {
        const error = await res.json()
        // console.log("fetching review of one spot errors", error)
        return error;
    }
}

export const deleteMyOwnReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      dispatch(deleteReview(reviewId));
    } else {
      const error = await res.json();
      return error;
    }
  };

export const createNewReview = (spotId, reviewObj, user) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(reviewObj)
    })
    if (res.ok) {
        const newReviewObj= await res.json();
        dispatch(createReview(spotId, newReviewObj, user))
        return newReviewObj
    } else {
        const error = await res.json()
        return error
    }
}



//reducer
const initialState = {reviews: []}
export default function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case GET_REVIEWS: {
            return {...state, reviews: action.reviews}
        }
        case DELETE_REVIEW: {
            return {
                ...state,
                reviews: state.reviews.filter(review => review.id !== action.reviewId)
              };
        }
        case CREATE_REVIEW: {
            const newReview = { ...action.review, User: action.user };
            return {
                ...state,
                reviews: [...state.reviews, newReview]
            };
        }
        default: 
            return state
    }
}  