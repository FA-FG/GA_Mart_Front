import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const SignUpForm = () => {
  const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPass: '',
    profileImg: ''  
  };

  const [formState, setFormState] = useState(initialState);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Form validation
    if (!formState.username || !formState.email || !formState.password || !formState.confirmPass) {
      setError('All fields are required!');
      setIsValid(false);
    } else if (formState.password !== formState.confirmPass) {
      setError('Passwords do not match!');
      setIsValid(false);
    } else if (formState.password.length < 7) {
      setError('Password must be at least 7 characters!');
      setIsValid(false);
    } else {
      try {
        // Sending data to backend for registration
        const response = await axios.post('http://localhost:5000/users/register', {
          username: formState.username,
          email: formState.email,
          password: formState.password,
          profileImg: formState.profileImg  
        });

        if (response.status === 200) {
          setError('Account created successfully!');
          setIsValid(true);

          navigate('/login');  
        }
      } catch (error) {
        setError('Something went wrong. Please try again.');
        setIsValid(false);
      }
    }
  };

  const handleCancel = () => {
    setFormState(initialState);
    setError('');
    setIsValid(true);
  };

  return (
    <div className="form">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={formState.username}
          onChange={handleChange}
        />
        <label htmlFor="username">Username</label>

        <input
          type="email"
          placeholder="Email"
          id="email"
          value={formState.email}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>

        <input
          type="password"
          placeholder="Password"
          id="password"
          value={formState.password}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>

        <input
          type="password"
          placeholder="Confirm password"
          id="confirmPass"
          value={formState.confirmPass}
          onChange={handleChange}
        />
        <label htmlFor="confirmPass">Confirm password</label>

        <input
          type="text"
          placeholder="Profile Image URL (Optional)"
          id="profileImg"
          value={formState.profileImg}
          onChange={handleChange}
        />
        <label htmlFor="profileImg">Profile Image URL (Optional)</label>

        <button type="submit">Sign Up</button>
        <button type="button" className="cancel" onClick={handleCancel}>Cancel</button>

        {error && <p className={isValid ? 'valid' : 'invalid'}>{error}</p>}
      </form>
    </div>
  );
};

export default SignUpForm;
