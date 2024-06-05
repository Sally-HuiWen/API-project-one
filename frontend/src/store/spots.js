import { csrfFetch } from './csrf.js';

//action type
const GET_SPOTS = 'spots/getSpots';
const GET_ONE_SPOT = 'spots/getOneSpot';
const CREATE_NEW_SPOT = 'spots/new';
const ADD_IMAGE='spots/addImage'
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

export const addImage = (image) => ({
    type: ADD_IMAGE,
    image
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
        const newImage = await res.json()//newImage is an object
        console.log("create newImage res body", newImage)
        dispatch(addImage(newImage))
        return newImage
    } else {
        const error = await res.json()
        console.log("create newImage ERROR", error)
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
            return allSpotsState
        }
        case GET_ONE_SPOT: {
            return {...state,[action.spot.id]: action.spot};
        }
        case CREATE_NEW_SPOT: {
            return {...state,[action.spot.id]: action.spot};
        }
        case ADD_IMAGE: {
            return {...state, ...action.image};
        }
        default:
            return state    
    }
    
}

