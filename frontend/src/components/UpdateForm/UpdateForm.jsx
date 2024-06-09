import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateOneSpot } from '../../store/spots';
import './UpdateForm.css';

const UpdateForm = () => {
  const {spotId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const spot = useSelector(state=> state.spot[spotId]);

  const [country, setCountry] = useState(spot.country);
  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [lat, setLat] = useState(spot.lat);
  const [lng, setLng] = useState(spot.lng);
  const [description, setDescription] = useState(spot.description);
  const [name, setName] = useState(spot.name);
  const [price, setPrice] = useState(spot.price);
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(()=> {
    const errorArr = [];
    if (!country) errorArr.push('Country is required')
    if (!address) errorArr.push('Address is required')
    if (!city) errorArr.push('City is required')
    if (!state) errorArr.push('State is required')
    if (!lat || isNaN(lat)) errorArr.push('Latitude is required')
    if (!lng || isNaN(lng)) errorArr.push('Longitude is required')
    if (description.length < 30) errorArr.push('Description needs a minimum of 30 characters')
    if (!name) errorArr.push('Name is required')
    if (!price || isNaN(price)) errorArr.push('Price is required')
    
    setErrors(errorArr)
  },[country, address, city, state, lat, lng, description, name, price])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    // console.log('Form submitted');

    const updatedSpot = { ...spot, address, city, state, country, lat, lng, name, description, price}
    const updated = await dispatch(updateOneSpot(updatedSpot));
    if (updated.errors) {
        // console.log('Errors:', updated.errors);
        setErrors(updated.errors);
    } else {
        // console.log('Navigation to', `/spots/${spotId}`);
        navigate(`/spots/${spotId}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-header'>
        <h1>Update your Spot</h1>
        <h2>Where is your place located?</h2>
        <p>Guests will only get your exact address once they booked a reservation.</p>
      </div>

      <div className='country-div'>
        <label htmlFor='country'>Country
        {hasSubmitted && errors.includes('Country is required') && <span className='errors'>Country is required</span>}
        </label>
        <input
          id='country'
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder='Country'
          />
      </div>

      <div className='address-div'>
        <label htmlFor='address'>Street Address
        {hasSubmitted && errors.includes('Address is required') && <span className='errors'>Address is required</span>}
          </label>
        <input
          id='address'
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder='Address'
          />
      </div>

      <div className='city-and-state'>
        <div className='city-div'>
          <label htmlFor='city'>City
          {hasSubmitted && errors.includes('City is required') && <span className='errors'>City is required</span>}
          </label>
          <input
            id='city'
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder='City'
          />
        </div>
        
        <div className='state-div'>
          <label htmlFor='state'>State
          {hasSubmitted && errors.includes('State is required') && <span className='errors'>State is required</span>}
          </label>
          <input
            id='state'
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder='State'
          />
        </div>
      </div>

      <div className='lat-and-lng'>
        <div className='lat-div'>
          <label htmlFor='lat'>Latitude
          {hasSubmitted && errors.includes('Latitude is required') && <span className='errors'>Latitude is required</span>}
          </label>
          <input
            id='lat'
            type="number"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder='Latitude'
          />
        </div>
        
        <div className='lng-div'>
          <label htmlFor='lng'>Longitude
          {hasSubmitted && errors.includes('Longitude is required') && (<span className='errors'>Longitude is required</span>)}
          </label>
          <input
            id='lng'
            type="number"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            placeholder='Longitude'
          />
        </div> 
      </div>

      <div className='description-div'>
        <h2>Describe your place to guests</h2>
        <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood</p>
        <label>
            <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Description'
            />
        </label>
        {hasSubmitted && errors.includes('Description needs a minimum of 30 characters') && (
            <p className='errors'>Description needs a minimum of 30 characters</p>
            )}
      </div>

      <div className='name-div'>
        <h2>Create a title for your spot</h2>
        <p> Catch guests attention with a spot title that highlights what makes your place special.</p>
        <label>
            <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name of your spot'
            />
        </label>
        {hasSubmitted && errors.includes('Name is required') && (
        <p className='errors'>Name is required</p>
        )}
      </div>

      <div className='price-div'>
        <h2>Set a base price for your spot</h2>
        <p> Competitive pricing can help your listing stand out and rank higher in search results.</p>
        <div id='dollar-and-price-div'>
            <div>$</div>
            <label>
              <input 
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder='Price per night (USD)'
            />
            </label>
        {hasSubmitted && errors.includes('Price is required') && (
        <p className='errors'>Price is required</p>
        )}
        </div> 
      </div>

      <button id='submit-button' type="submit">Update Your Spot</button>
    </form>
  );
};

export default UpdateForm;
