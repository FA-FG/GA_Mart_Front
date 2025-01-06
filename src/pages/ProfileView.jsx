import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProfile } from '../services/userServices'

const ProfileView = () => {
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    profileImg: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile()
        console.log('Profile Data:', response)
        setProfileData({
          username: response.username || '',
          email: response.email || '',
          profileImg: response.profileImg || ''
        })
      } catch (error) {
        setError('Failed to load profile data.')
      }
    }
    fetchProfile()
  }, [])

  return (
    <div className='profile'>
      <h2>Profile</h2>
      {error && <p>{error}</p>}
      <div>
        <label> </label>
        {profileData.profileImg && (
          <img src={profileData.profileImg} alt="Profile" />
        )}
      <div>
        <label>Username: </label>
        <span>{profileData.username}</span>
      </div>
      <div>
        <label>Email: </label>
        <span>{profileData.email}</span>
      </div>
      </div>
      <button onClick={() => navigate('/profile/update')}>
        Update Profile
      </button>
    </div>
  )
}

export default ProfileView
