import { NavLink} from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import './Navigation.css';
import { TbBrandAirbnb } from "react-icons/tb";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
 
  return (
    <div id="airbnb-header">
      <div className='left-header'>
        <NavLink className='logo-and-name' to='/'>
          <TbBrandAirbnb/>
          airbnb</NavLink>
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
