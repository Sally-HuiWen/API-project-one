import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <div id='login-container'>
      <h1 className='login'>Log In</h1>
      <form id='form' onSubmit={handleSubmit}>
        <label>
          <input className='input'
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder='Username or Email'
          />
        </label>
        <label>
          <input className='input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <button id='login-button'type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
        <button id='demo-user'
          type='submit' 
          onClick={() => { setCredential("demo@user.io"); setPassword("password") }}
        > Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
