import { useState } from 'react'
import { SignInUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const SignIn = ({setUser}) => {
  let navigate = useNavigate()
  let initialState = { email: '', password: '' } 
  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    setFormValues(initialState) 
    setUser(payload)
    navigate('/main')


  }

  return (
    <div className="form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
        onChange={handleChange}
          placeholder="Email"
          id="email"
          value={formValues.email}
          name="email"
          type="email"
        />
        <label htmlFor="email">Email</label>

        <input
        onChange={handleChange}
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          value={formValues.password}
          
        />
        <label htmlFor="password">Password</label>

        {/* <button type="submit">Log In</button> */}
        <button disabled={!formValues.email || !formValues.password}>Sign In</button>


      </form>
        </div>
  );
};

export default SignIn
