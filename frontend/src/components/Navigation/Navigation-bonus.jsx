import { NavLink} from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
 
  return (
    <div id="airbnb-header">
      <div className='left-header'>
        <NavLink className='logo-and-name' to='/'>
        <img src='/Wen.ico' alt='BestBnb-logo' className='my-logo' />
          BestBnb</NavLink>
      </div>

      <div className='right-header'>
        <div>
        {sessionUser && (
          <NavLink to='/spots/new'>
            <button 
             className="create-new-spot-link"
            >Create a New Spot</button>
          </NavLink>
          )}
        </div>

        {isLoaded && (
        <div id='profile-button-div'>
          <ProfileButton user={sessionUser} />
        </div>
        )}
    
      </div>   
  </div>
  );
}

export default Navigation;
