// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';  
// import { loginUser } from '../services/Auth'

// const LoginForm = ({setUser}) => {
//   let navigate = useNavigate()
//   let initialState = { email: '', password: '' } 
//   const [formValues, setFormValues] = useState(initialState)

//   const handleChange = (e) => {
//     setFormValues({ ...formValues, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = await loginUser(formValues);
//       setFormValues(initialState); 
//       setUser(payload);  // Assuming payload contains user data, not just the token
//       navigate('/main');
//     } catch (error) {
//       // Handle error (e.g., show an error message to the user)
//       console.error(error);
//       alert("Login failed. Please check your credentials.");
//     }
//   };
  




//   return (
//     <div className="form">
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//         onChange={handleChange}
//           placeholder="Email"
//           id="email"
//           value={formValues.email}
//           name="email"
//           type="email"
//         />
//         <label htmlFor="email">Email</label>

//         <input
//         onChange={handleChange}
//           type="password"
//           name="password"
//           placeholder="Password"
//           id="password"
//           value={formValues.password}
          
//         />
//         <label htmlFor="password">Password</label>

//         <button type="submit">Log In</button>
//         {/* <button disabled={!formValues.email || !formValues.password}>Sign In</button> */}


//       </form>
//     </div>
//   );
// };

// export default LoginForm;





