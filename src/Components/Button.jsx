import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Button({ text, type, onClick }) {
  // Default values if props are not provided
  if (!text) text = 'Button';
  if (!type) type = 'btn-info';
  if (!onClick) onClick = () => console.log('Button Clicked');
  
  // Accessing the user and token state from the Redux store
  const user = useSelector((state) => state.auth.user);
  const emailVerified = useSelector((state) => state.auth.emailVerified);
  const token = useSelector((state) => state.auth.token);
  
  const navigate = useNavigate();
  
  const handleClick = () => {
    // You can add additional logic here before calling the onClick function.
    onClick();
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`btn ${type}`}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
