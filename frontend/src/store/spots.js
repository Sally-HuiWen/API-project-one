import { csrfFetch } from './csrf.js';

//action type
const GET_SPOTS = 'spots/getSpots';
const GET_ONE_SPOT = 'spots/getOneSpot';
const CREATE_NEW_SPOT = 'spots/new';
const ADD_IMAGE='spots/addImage';
const CURRENT_SPOTS='spots/currentOwnerSpots'
const UPDATE_SPOT = 'spots/updateSpot';
const DELETE_SPOT = 'spots/deleteSpot'
//action creators
export const getSpots = (spots) => ({
    type: GET_SPOTS,
    spots
});

export const getOneSpot = (spot) => ({
    type: GET_ONE_SPOT,
    spot
});

export const createSpot = (spot) => ({
    type: CREATE_NEW_SPOT,
    spot
})

export const addImage = (spotId, imageObj) => ({
    type: ADD_IMAGE,
    spotId,
    imageObj
})

export const currentOwnerSpots = (spots) => ({
    type: CURRENT_SPOTS,
    spots
})

export const deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
})

export const updateSpot = (spot) => ({
    type: UPDATE_SPOT,
    spot
})


//thunk creators
export const getAllSpots = ()=> async(dispatch)=> {
    const res = await csrfFetch('/api/spots');
    // console.log('res after fetching allSpots', res )
    if (res.ok) {
        const allSpots = await res.json();
        // console.log('allSpots res body only', allSpots)
        dispatch(getSpots(allSpots));
    } 
}

export const getOneSpotDetail = (spotId)=> async(dispatch)=> {
    const res = await csrfFetch(`/api/spots/${spotId}`);
    // console.log('res after fetching one spot', res )
    if (res.ok) {
        const spot = await res.json();
        // console.log('fetching on spot res body only', spot)
        dispatch(getOneSpot(spot));
    } else {
        const errors = await res.json()
        // console.log("fetching one spot detail errors", errors)
        return errors;
    }
}

export const createNewSpot = (spot) => async (dispatch) => {
    const res = await csrfFetch("/api/spots",{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(spot)
    })
    if (res.ok) {
        const newSpot = await res.json()
        // console.log("create newSpot res body", newSpot)
        dispatch(createSpot(newSpot))
        return newSpot
    } else {
        const error = await res.json()
        // console.log("create newSpot ERROR", error)
        return error
    }
}

export const addOneImageToSpot = (spotId, imageObj) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(imageObj)
    })
    if (res.ok) {
        const newImage = await res.json()//newImage is an object with id number
        // console.log("create newImage res body", newImage)
        dispatch(addImage(spotId, newImage))
        return newImage
    } else {
        const error = await res.json()
        // console.log("create newImage ERROR", error)
        return error
    }
}

export const currentUserOwnedSpots = () => async(dispatch)=> {
    const res = await csrfFetch('/api/spots/current');
    if (res.ok) {
        const spots = await res.json()
        dispatch(currentOwnerSpots(spots))
    } else {
        const error = await res.json()
        return error
    }

}

export const deleteOneSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      dispatch(deleteSpot(spotId));
    } else {
      const error = await res.json();
      return error;
    }
  };

export const updateOneSpot = (spot) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
    });
    if (res.ok) {
        const updatedSpot = await res.json();
         console.log("updatedSpot res body", updatedSpot)
        dispatch(updateSpot(updatedSpot))
        return updatedSpot 
    } else {
        const error = await res.json()
         console.log("updatedSpot error", error)
        return error
    }
}

//reducers
export default function spotReducer(state = {}, action) {
    switch (action.type) {
        case GET_SPOTS: {
            const allSpotsState = {};
            action.spots.Spots.forEach(spot=> {
                allSpotsState[spot.id] = spot;   
            })
            return allSpotsState;
        }
        case GET_ONE_SPOT: {
            return {...state,[action.spot.id]: action.spot};
        }
        case CREATE_NEW_SPOT: {
            return {...state,[action.spot.id]: action.spot};
        }
        case ADD_IMAGE: {
            const { spotId, image } = action;
            const spot = state[spotId];
            if (!spot) return state; 
            return {
                ...state,
                [spotId]: {
                  ...spot,
                  images: [...(spot.images || []), image] // add new image to the spotImage arr
                }
         
            }
        }
        case CURRENT_SPOTS: {
            const currentSpotsState = {};
            if (action.spots && action.spots.Spots) {
                action.spots.Spots.forEach(spot => {
                currentSpotsState[spot.id] = spot;
                });
            }
            return currentSpotsState;
        }
        case DELETE_SPOT: {
            const deleteSpotState = { ...state };
            delete deleteSpotState[action.spotId];
            return deleteSpotState;

        }

        case UPDATE_SPOT: {
            return {...state,[action.spot.id]: action.spot};

        }
        default:
            return state    
    }
    
}

