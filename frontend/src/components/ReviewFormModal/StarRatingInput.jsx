import { useState, useEffect } from 'react';
import { IoStar } from "react-icons/io5";
import './StarRatingInput.css'

const StarRatingInput = ({ stars, onChange, disabled }) => {
  const [activeStars, setActiveStars] = useState(stars);
  
  useEffect(() => {
    setActiveStars(stars);
  }, [stars]);

  const starsIcon = (num) => {
    const props = {};
    if (!disabled) {
      props.onMouseEnter = () => setActiveStars(num);
      props.onMouseLeave = () => setActiveStars(stars);
      props.onClick = () => onChange(num);
    }
    return (
      <div key={num} className={activeStars >= num ? "filled" : "empty"} {...props}>
         <IoStar />
      </div>
    );
  };

  
  return (
    <div className="stars-input">
      {[1, 2, 3, 4, 5].map(num => starsIcon(num))}
    </div>
  );
};

export default StarRatingInput;
