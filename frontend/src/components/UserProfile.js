import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import {
  Container,
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  Grid,
  Paper,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  AddPhotoAlternate as AddPhotoIcon
} from '@mui/icons-material';

function UserProfile() {
  const { user, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    bio: '',
    location: '',
    education: '',
    profileImage: null,
    profileImageUrl: ''
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user && user.id) {
        try {
          const response = await axios.get(`http://localhost:8081/api/users/${user.id}`);
          if (response.data.success) {
            const userData = response.data.user;
            setProfileData({
              username: userData.username || '',
              email: userData.email || '',
              bio: userData.bio || '',
              location: userData.location || '',
              education: userData.education || '',
              profileImageUrl: userData.profileImageUrl || ''
            });
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setSnackbar({
            open: true,
            message: 'Error loading profile data',
            severity: 'error'
          });
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setSnackbar({
          open: true,
          message: 'Image size should be less than 5MB',
          severity: 'error'
        });
        return;
      }
      setProfileData(prev => ({
        ...prev,
        profileImage: file,
        profileImageUrl: URL.createObjectURL(file)
      }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('username', profileData.username);
      formData.append('email', profileData.email);
      formData.append('bio', profileData.bio);
      formData.append('location', profileData.location);
      formData.append('education', profileData.education);
      if (profileData.profileImage) {
        formData.append('profileImage', profileData.profileImage);
      }

      const response = await axios.put(`http://localhost:8081/api/users/${user.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        // Update the auth context with new user data
        login(response.data.user);
        setSnackbar({
          open: true,
          message: 'Profile updated successfully',
          severity: 'success'
        });
        setIsEditing(false);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error updating profile',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setProfileData({
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || '',
        location: user.location || '',
        education: user.education || '',
        profileImageUrl: user.profileImageUrl || ''
      });
    }
    setIsEditing(false);
  };

  if (!user) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h5">Please log in to view your profile</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={3}>
            {/* Profile Image Section */}
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Avatar
                  src={profileData.profileImageUrl}
                  sx={{ width: 150, height: 150, mb: 2 }}
                />
                {isEditing && (
                  <IconButton
                    component="label"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: 'white',
                      '&:hover': { bgcolor: 'grey.100' }
                    }}
                  >
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <AddPhotoIcon />
                  </IconButton>
                )}
              </Box>
            </Grid>

            {/* Profile Information Section */}
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4" component="h1">
                  {isEditing ? 'Edit Profile' : 'Profile'}
                </Typography>
                {!isEditing ? (
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => setIsEditing(true)}
                    variant="outlined"
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Box>
                    <Button
                      startIcon={<SaveIcon />}
                      onClick={handleSave}
                      variant="contained"
                      sx={{ mr: 1 }}
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} /> : 'Save'}
                    </Button>
                    <Button
                      startIcon={<CancelIcon />}
                      onClick={handleCancel}
                      variant="outlined"
                    >
                      Cancel
                    </Button>
                  </Box>
                )}
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Username"
                    value={profileData.username}
                    onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    multiline
                    rows={3}
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    disabled={!isEditing}
                    placeholder="Tell us about yourself..."
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                    disabled={!isEditing}
                    placeholder="Where are you from?"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Education"
                    value={profileData.education}
                    onChange={(e) => setProfileData(prev => ({ ...prev, education: e.target.value }))}
                    disabled={!isEditing}
                    placeholder="Your educational background"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default UserProfile; 