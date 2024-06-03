import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import './Navigation.css';
import { TbBrandAirbnb } from "react-icons/tb";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div id="airbnb-header">
      <div className='left-header'><TbBrandAirbnb />airbnb</div>
      <div className='right-header'>
        <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
      </div>
      
    </div>
    
  );
}

export default Navigation;
