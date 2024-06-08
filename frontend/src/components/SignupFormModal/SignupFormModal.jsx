import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();


  useEffect(() => {
    const errorObj = {};
    if (email.length === 0) errorObj.email = "Email is required";
    if (username.length === 0) errorObj.username = "Username is required";
    if (username.length < 4) {
      errorObj.username = "Username must be more than 4 characters";
    }
    if (firstName.length === 0) errorObj.firstName = "First name is required";
    if (lastName.length === 0) errorObj.lastName = "Last name is required";
    if (password.length === 0) errorObj.password = "Password is required";
    if (password.length < 6 && password.length > 0) {
      errorObj.password = "Password must be more than 6 characters";
    }
    if (password !== confirmPassword) {
      errorObj.confirmPassword =
        "Confirm Password field must be the same as the Password field";
    }
    if (Object.values(errorObj).length > 0) {
      setErrors({ true: true });
    } else {
      setErrors({});
    }
  }, [email, username, firstName, lastName, password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <>
      <h1 id='sign-up-title'>Sign Up</h1>
      <form id='signUp-form' onSubmit={handleSubmit}>
        <label>
          <input
            className='frame'
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First Name'
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label>
          <input
            className='frame'
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last Name'
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          <input
            className='frame'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          <input
            className='frame'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          <input
            className='frame'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          <input
            className='frame'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit" id='signUp-button' disabled={Object.values(errors).length > 0}>Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
