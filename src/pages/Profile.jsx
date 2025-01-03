import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to import axios

const Profile = ({user}) => {
  const [userInfo, setUserInfo] = useState(null); 


  // Fetch products from the API
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/auth/profile',{
          headers: {
            Authorization: `Bearer ${token}`,
        },});

        console.log('API Response:', response.data); // Log the response data

        setUserInfo(response.data);

  
    
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo(); // Call the function to fetch products
  }, []);
  

    return user ? (
      <div>
        <div>
        {userInfo?.profileImg ? (
          <img src={userInfo.profileImg } alt="ProfileImg" width="100" />
        ) : (
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="ProfileImg" width="100" />
          ) }
      </div>
      <h1>Welcome, {userInfo?.username || 'User'}!</h1>  {/* Display user info */}
      <p>Email: {userInfo?.email}</p>

      

   
    </div>
      

  ):(<div className="protected">
  <h3>Oops! You must be signed in to do that!</h3>
  <button onClick={() => navigate('/signin')}>Sign In</button>
</div>
  )
}

export default Profile



