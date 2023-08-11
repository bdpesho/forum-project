import React, { useState, useEffect } from 'react';
import styles from "./Profile.module.css";
import { uploadProfilePhoto } from '../../services/storage.service';
import { getUserProfile, updateUserProfile } from '../../services/user.service';
import { 
  Button, 
  TextField, 
  FormControl, 
  Container, 
  Typography,
  Avatar
} from '@mui/material';

export default function Profile({ userId }) {
  const [profile, setProfile] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState(''); // New state variable for the file name

  useEffect(() => {
    async function fetchProfile() {
      const userProfile = await getUserProfile(userId);
      setProfile(userProfile || {}); // Ensure that profile is always an object
    }
    fetchProfile();
  }, [userId]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setFileName(e.target.files[0]?.name || ''); // Update the file name
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedFile) {
      const photoURL = await uploadProfilePhoto(userId, selectedFile);
      setProfile(prevProfile => ({ ...prevProfile, profilePhoto: photoURL }));
    }

    await updateUserProfile(userId, profile);
    alert('Profile updated successfully!');
  };

  // Function to get initials from the user's name
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  return (
    <Container maxWidth="sm" className={styles.Profile}>
      <Typography variant="h4" gutterBottom className={styles.ProfileHeader}>
        Update Profile
      </Typography>
      <Avatar 
        src={profile?.profilePhoto || ''} 
        alt={getInitials(profile?.firstName, profile?.lastName)}
        sx={{ width: 56, height: 56, margin: '0 auto' }}
      >
        {getInitials(profile?.firstName, profile?.lastName)}
      </Avatar>
      <form onSubmit={handleSubmit} className={styles.ProfileForm}>
        <FormControl fullWidth margin="normal">
          <TextField 
            label="First Name" 
            value={profile?.firstName || ''}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            pattern="[A-Za-z\s]+"
            error={!!profile.firstName && !/^[A-Za-z\s]+$/.test(profile.firstName)}
            helperText={!!profile.firstName && !/^[A-Za-z\s]+$/.test(profile.firstName) ? "Invalid First Name" : ""}
          />          
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField 
            label="Last Name" 
            value={profile?.lastName || ''}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            pattern="[A-Za-z\s]+"
            error={!!profile.lastName && !/^[A-Za-z\s]+$/.test(profile.lastName)}
            helperText={!!profile.lastName && !/^[A-Za-z\s]+$/.test(profile.lastName) ? "Invalid Last Name" : ""}
          />          
        </FormControl>
        <div className={styles.ButtonContainer}>
        <Button
          variant="outlined"
          component="label"
          sx={{ marginTop: 2 }}
          className={styles.UploadButton}
        >
          Upload Profile Photo
          <input
            id="profile-photo"
            type="file" 
            hidden 
            accept=".jpg, .jpeg, .png"
            onChange={handleFileChange}
          />
        </Button>
        {fileName && <Typography variant="body2" sx={{ marginTop: 1 }}>{fileName}</Typography>}
        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }} className={styles.SubmitButton}>
          Update Profile
        </Button>
        </div>
      </form>
    </Container>
  );
}
