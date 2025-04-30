import React, { useEffect, useState, useRef } from 'react';
import { getCurrentUser, updateUser } from "@/@core/services/user";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
  Snackbar,
  Alert
} from "@mui/material";
import { Edit, DeleteOutlineOutlined, Save } from "@mui/icons-material";

const MyProfileTab = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    profile_image: '',
    account_type: 'TALENT' as const
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSavingImage, setIsSavingImage] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        const user = response?.user;
        
        if (user) {
          setUserId(user.id);
          setFormData({
            name: user.name || '',
            email: user.email || '',
            phone_number: user.phone_number || '',
            profile_image: user.profile_image || '',
            account_type: user.account_type || 'TALENT'
          });
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setTempImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToServer = async (file: File): Promise<string> => {
    // Implement your actual image upload logic here
    // This should return the URL of the uploaded image
    // For now, we'll mock this with a placeholder
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`https://example.com/uploads/${file.name}`);
      }, 1000);
    });
  };

  const saveImage = async () => {
    if (!userId || !imageFile) return;
    
    try {
      setIsSavingImage(true);
      // First upload the image to get a URL
      const imageUrl = await uploadImageToServer(imageFile);
      
      // Create payload with only the profile image
      const payload = {
        profile_image: imageUrl
      };
      
      // Save to backend
      await updateUser(userId, formData);
      
      // Update state
      setFormData(prev => ({
        ...prev,
        profile_image: imageUrl
      }));
      setTempImageUrl(null);
      setImageFile(null);
      setSuccess("Profile image updated successfully!");
    } catch (error) {
      console.error("Failed to save image:", error);
      setError("Failed to upload image. Please try again.");
    } finally {
      setIsSavingImage(false);
    }
  };

  const savePersonalInfo = async () => {
    if (!userId) return;
    try {
      // Create payload with only personal info (excluding profile image)
      const { profile_image, ...personalInfo } = formData;
      await updateUser(userId, personalInfo);
      setEditable(false);
      setSuccess("Personal information updated successfully!");
    } catch (error) {
      console.error("Failed to update user:", error);
      setError("Failed to update profile. Please try again.");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setImageFile(null);
    setTempImageUrl(null);
  };

  const handleCloseError = () => {
    setError(null);
  };

  const handleCloseSuccess = () => {
    setSuccess(null);
  };

  // Split name for display purposes
  const nameParts = formData.name.split(' ');
  const firstName = nameParts[0] || '';
  const surname = nameParts.slice(1).join(' ') || '';

  return (
    <section>
      <Grid rowSpacing={3} columnSpacing={5} container>
        {/* Picture Section */}
        <Grid lg={2.5} item>
          <Box sx={{ width: 'fit-content' }}>
            <Typography sx={{ fontWeight: 600, color: '#39353D', fontSize: '16px' }}>Picture</Typography>
            <Typography sx={{ fontSize: '13px', mb: '10px' }}>This is displaying on your profile</Typography>
            <Box sx={{
              border: '1px dashed #D0D5DD',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: '16px',
              padding: '20px'
            }}>
              <Avatar 
                src={tempImageUrl || formData.profile_image} 
                sx={{ width: '70px', height: '70px', mb: '10px' }} 
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', mt: 2 }}>
                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <Button 
                  variant="outlined" 
                  sx={{ textTransform: 'none' }}
                  onClick={triggerFileInput}
                >
                  Upload
                </Button>
                {imageFile && (
                  <Button 
                    variant="contained" 
                    sx={{ 
                      textTransform: 'none',
                      minWidth: '120px',
                      height: '40px',
                      padding: '8px 16px',
                      fontSize: '14px'
                    }}
                    onClick={saveImage}
                    disabled={!imageFile || isSavingImage}
                  >
                    {isSavingImage ? 'Saving...' : 'Save Image'}
                  </Button>
                )}
                <IconButton onClick={removeImage}>
                  <DeleteOutlineOutlined />
                </IconButton>
              </Box>
            </Box>
            {imageFile && (
              <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                Selected: {imageFile.name}
              </Typography>
            )}
          </Box>
        </Grid>

        {/* Personal Info Section */}
        <Grid lg={9.5} item>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography sx={{ fontWeight: 600, color: '#39353D', fontSize: '16px' }}>Personal Information</Typography>
              <Typography sx={{ fontSize: '13px', mb: '10px' }}>Details about yourself</Typography>
            </Box>
            <Box>
              {editable ? (
                <>
                  <IconButton onClick={() => setEditable(false)} sx={{ mr: 1 }}>
                    <DeleteOutlineOutlined />
                  </IconButton>
                  <IconButton onClick={savePersonalInfo}>
                    <Save />
                  </IconButton>
                </>
              ) : (
                <IconButton onClick={() => setEditable(true)}>
                  <Edit />
                </IconButton>
              )}
            </Box>
          </Box>

          <Grid columnSpacing={4} rowSpacing={3} container>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontSize: '12px', fontWeight: 500, mb: '5px' }}>First Name</Typography>
              <TextField
                name="firstName"
                value={firstName}
                onChange={(e) => {
                  const newName = `${e.target.value} ${surname}`.trim();
                  setFormData(prev => ({ ...prev, name: newName }));
                }}
                placeholder="Enter First Name"
                disabled={!editable}
                fullWidth
                inputProps={{ style: { fontSize: '12px' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontSize: '12px', fontWeight: 500, mb: '5px' }}>Surname</Typography>
              <TextField
                name="surname"
                value={surname}
                onChange={(e) => {
                  const newName = `${firstName} ${e.target.value}`.trim();
                  setFormData(prev => ({ ...prev, name: newName }));
                }}
                placeholder="Enter Surname"
                disabled={!editable}
                fullWidth
                inputProps={{ style: { fontSize: '12px' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontSize: '12px', fontWeight: 500, mb: '5px' }}>Email Address</Typography>
              <TextField
                name="email"
                value={formData.email}
                placeholder="Enter Email Address"
                disabled={true}
                fullWidth
                inputProps={{ style: { fontSize: '12px' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontSize: '12px', fontWeight: 500, mb: '5px' }}>Phone Number</Typography>
              <TextField
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                disabled={!editable}
                fullWidth
                inputProps={{ style: { fontSize: '12px' } }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </section>
  );
};

export default MyProfileTab;