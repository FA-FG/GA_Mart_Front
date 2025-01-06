import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProfile, updateProfile } from '../services/userServices'

const ProfileUpdate = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateProfile(profileData)
      alert('Profile updated successfully!')
      navigate('/profile')
    } catch (error) {
      setError('Failed to update profile.')
    }
  }

  return (
    <div className='update-profile'>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={profileData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Profile Image URL:</label>
          <input
            type="text"
            name="profileImg"
            value={profileData.profileImg}
            onChange={handleChange}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Update Profile</button>
      </form>
    </div>
  )
}

export default ProfileUpdate
