import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  

const LoginForm = () => {
  const initialState = {
    email: '',
    password: ''
  };

  const [formState, setFormState] = useState(initialState);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formState.email || !formState.password) {
      setError('Email and password are required!');
      setIsValid(false);
    } else {
      try {
        const response = await axios.post('http://localhost:5000/users/login', {
          email: formState.email,
          password: formState.password
        });

        if (response.status === 200) {
          setError('');
          setIsValid(true);


          navigate('/');
        }
      } catch (error) {
        setError('Invalid credentials. Please try again.');
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Log In</button>

        <button type="button" className="cancel" onClick={handleCancel}>Cancel</button>

        {error && <p className={isValid ? 'valid' : 'invalid'}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
