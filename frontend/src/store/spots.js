import { csrfFetch } from './csrf.js';

//action type
const GET_SPOTS = 'spots/getSpots'

//action creators
const getSpots = (spots) => ({
    type: GET_SPOTS,
    spots
});


//thunk creators
export const getAllSpots = ()=> async(dispatch)=> {
    const res = csrfFetch('/api/spots');
    console.log('res after fetching allSpots', res )
    if (res.ok) {
        const allSpots = await res.json();
        console.log('allSpots res body only', allSpots)
        dispatch(getSpots(allSpots));
    } else {
        const errors = await res.json();
        console.log('getAllSpots errors', errors)
    }

}

//reducers
export default function spotReducer(state = {}, action) {
    switch (action.type) {
        case GET_SPOTS:
            const allSpotsState = {};
            action.spots.Spots.forEach(spot=> {
                allSpotsState[spot.id] = spot;   
            })
            return allSpotsState
        default:
            return state    
    }
    
}

