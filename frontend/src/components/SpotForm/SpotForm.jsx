import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addOneImageToSpot, createNewSpot } from '../../store/spots';
import './SpotForm.css';

const SpotForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [lat, setLat] = useState(1);
  const [lng, setLng] = useState(1);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState();
  const [previewImage, setPreviewImage] = useState('');
  const [imageOne, setImageOne] = useState('');
  const [imageTwo, setImageTwo] = useState('');
  const [imageThree, setImageThree] = useState('');
  const [imageFour, setImageFour] = useState('');
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const validImgUrl = (imageUrl)=> ['.png', '.jpg', '.jpeg'].some(extension => imageUrl.toLowerCase().endsWith(extension))

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
    if (!previewImage) errorArr.push('Preview image is required')
    if (!validImgUrl(previewImage)) errorArr.push('Image URL must end in .png, .jpg, or .jpeg');
    if (imageOne && !validImgUrl(imageOne)) errorArr.push('Image URL must end in .png, .jpg, or .jpeg');
    if (imageTwo && !validImgUrl(imageTwo)) errorArr.push('Image URL must end in .png, .jpg, or .jpeg');
    if (imageThree && !validImgUrl(imageThree)) errorArr.push('Image URL must end in .png, .jpg, or .jpeg');
    if (imageFour && !validImgUrl(imageFour)) errorArr.push('Image URL must end in .png, .jpg, or .jpeg');
    setErrors(errorArr)
  },[country, address, city, state, lat, lng, description, name, price, previewImage, imageOne, imageTwo, imageThree, imageFour])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (errors.length > 0) return; // Prevent submission if frontend errors exist

    const spot = { address, city, state, country, lat, lng, name, description, price, previewImage, imageOne, imageTwo, imageThree, imageFour }
    // console.log('spot before fetching from backend', spot)
    const newSpot = await dispatch(createNewSpot(spot));
    // console.log('spot after fetching from backend', newSpot)
    if (newSpot.errors) {
        // console.log('what are backend errors', newSpot.errors)
        setErrors(newSpot.errors);
    } else {
        const spotId = newSpot.id;

        const previewImgObj = { url: previewImage, preview: true };
        const newPreviewImgObj = await dispatch(addOneImageToSpot(spotId, previewImgObj));

        const imageOneObj = { url: imageOne, preview: false };
        const newImageOneObj = await dispatch(addOneImageToSpot(spotId, imageOneObj));

        const imageTwoObj = { url: imageTwo, preview: false };
        const newImageTwoObj = await dispatch(addOneImageToSpot(spotId, imageTwoObj));

        const imageThreeObj = { url: imageThree, preview: false };
        const newImageThreeObj = await dispatch(addOneImageToSpot(spotId, imageThreeObj));

        const imageFourObj = { url: imageFour, preview: false };
        const newImageFourObj = await dispatch(addOneImageToSpot(spotId, imageFourObj));

        const spotImages = [newPreviewImgObj, newImageOneObj, newImageTwoObj, newImageThreeObj, newImageFourObj];
        newSpot.SpotImages = spotImages;

        navigate(`/spots/${spotId}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-header'>
        <h1>Create a new Spot</h1>
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

      <div className='upload-images'>
        <h2>Liven up your spot with photos</h2>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <div className='image'>
            <label>
                <input 
                type="text"
                value={previewImage}
                onChange={(e) => setPreviewImage(e.target.value)}
                placeholder='Preview Image URL'
                />
            </label>
            {hasSubmitted && errors.includes('Preview image is required') && (
                <p className='errors'>Preview image is required</p>
            )}
             {hasSubmitted && errors.includes('Image URL must end in .png, .jpg, or .jpeg') && (
                <p className='errors'>Image URL must end in .png, .jpg, or .jpeg</p>
            )}
            
        </div>
        <div className='image'>
            <label>
                <input 
                type="text"
                value={imageOne}
                onChange={(e) => setImageOne(e.target.value)}
                placeholder='Image URL'
                />
            </label>
            {hasSubmitted && errors.includes('Image URL must end in .png, .jpg, or .jpeg') && (
                <p className='errors'>Image URL must end in .png, .jpg, or .jpeg</p>
            )}
            
        </div>
        <div className='image'>
            <label>
                <input 
                type="text"
                value={imageTwo}
                onChange={(e) => setImageTwo(e.target.value)}
                placeholder='Image URL'
                />
            </label>
            {hasSubmitted && errors.includes('Image URL must end in .png, .jpg, or .jpeg') && (
                <p className='errors'>Image URL must end in .png, .jpg, or .jpeg</p>
            )}
        </div>
        <div className='image'>
            <label>
                <input 
                type="text"
                value={imageThree}
                onChange={(e) => setImageThree(e.target.value)}
                placeholder='Image URL'
                />
            </label>
            {hasSubmitted && errors.includes('Image URL must end in .png, .jpg, or .jpeg') && (
                <p className='errors'>Image URL must end in .png, .jpg, or .jpeg</p>
            )}
        </div>
        <div className='image'>
            <label>
                <input 
                type="text"
                value={imageFour}
                onChange={(e) => setImageFour(e.target.value)}
                placeholder='Image URL'
                />
            </label>
            {hasSubmitted && errors.includes('Image URL must end in .png, .jpg, or .jpeg') && (
                <p className='errors'>Image URL must end in .png, .jpg, or .jpeg</p>
            )}
        
        </div>
      </div>

      <button id='submit-button' type="submit">Create Spot</button>
    </form>
  );
};

export default SpotForm;
