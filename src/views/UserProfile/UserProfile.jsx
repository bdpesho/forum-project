import React, { useState, useEffect } from 'react';
import { uploadProfilePhoto } from '../../services/storage.service';
import { getUserProfile, updateUserProfile } from '../../services/user.service';
import './UserProfile.module.css';

export default function UserProfile({ userId }) {
  const [profile, setProfile] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      const userProfile = await getUserProfile(userId);
      setProfile(userProfile);
    }
    fetchProfile();
  }, [userId]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedFile) {
      const photoURL = await uploadProfilePhoto(userId, selectedFile);
      profile.profilePhoto = photoURL;
    }

    await updateUserProfile(userId, profile);
    alert('Profile updated successfully!');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            value={profile.firstName}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
          />
        </label>
        <label>
          Last Name:
          <input
            value={profile.lastName}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
          />
        </label>
        <label>
          Profile Photo:
          <input type="file" onChange={handleFileChange} />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}
