import { csrfFetch } from './csrf.js';

//action type
const GET_SPOTS = 'spots/getSpots'
const GET_ONE_SPOT = 'spots/getOneSpot'

//action creators
export const getSpots = (spots) => ({
    type: GET_SPOTS,
    spots
});

export const getOneSpot = (spot) => ({
    type: GET_ONE_SPOT,
    spot
});


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

// export const getOneSpotDetail = (spotId)=> async(dispatch)=> {
//     const res = await csrfFetch(`/api/spots/${spotId}`);
//     console.log('res after fetching one spot', res )
//     if (res.ok) {
//         const spot = await res.json();
//         console.log('fetching on spot res body only', spot)
//         dispatch(getOneSpot(spot));
//     } else {
//         const errors = await res.json()
//         console.log("fetching one spot detail errors", errors)
//         return errors

//     }
// }

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
        default:
            return state    
    }
    
}

