import React, { useEffect, useState, useRef } from 'react';
import { getCurrentUser, updateUser } from '@/@core/services/user';
import {
  Box,
  Typography,
  Grid,
  MenuItem,
  Button,
  Checkbox,
  Divider,
  Snackbar,
  Alert,
  IconButton,
  Avatar,
} from '@mui/material';
import { Edit, Save, Cancel, DeleteOutlineOutlined } from '@mui/icons-material';
import CustomTextField from '@/@core/component/mui/text-field';

interface CompanyFormData {
  company_logo: string;
  company_name: string;
  company_email_address: string;
  industry: string;
  number_of_employees: string;
  type_of_employer: string;
  company_address: string;
  company_website: string;
  country: string;
  contact_person: string;
  work_email: string;
  position_in_company: string;
  company_phone_number: string;
}

const ClientProfile = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSavingImage, setIsSavingImage] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isTermsAgreed, setIsTermsAgreed] = useState<boolean>(false);
  const [formData, setFormData] = useState<CompanyFormData>({
    company_logo: '',
    company_name: '',
    company_email_address: '',
    company_phone_number: '',
    industry: '',
    number_of_employees: '',
    type_of_employer: '',
    company_address: '',
    company_website: '',
    country: '',
    contact_person: '',
    work_email: '',
    position_in_company: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        const user = response?.user;
        if (user) {
          setUserId(user.id);
          setFormData({
            company_logo: user.company_logo || '',
            company_name: user.company_name || '',
            company_email_address: user.company_email_address || '',
            company_phone_number: user.company_phone_number || '',
            industry: user.industry || '',
            number_of_employees: user.number_of_employees || '',
            type_of_employer: user.type_of_employer || '',
            company_address: user.company_address || '',
            company_website: user.company_website || '',
            country: user.country || '',
            contact_person: user.name || user.contact_person || '',
            work_email: user.email || user.work_email || '',
            position_in_company: user.position_in_company || '',
          });
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setError('Failed to load profile. Please try again.');
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
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
      const imageUrl = await uploadImageToServer(imageFile);
      const payload = { company_logo: imageUrl };
      await updateUser(userId, payload);
      setFormData((prev) => ({ ...prev, company_logo: imageUrl }));
      setTempImageUrl(null);
      setImageFile(null);
      setSuccess('Company logo updated successfully!');
    } catch (error) {
      console.error('Failed to save image:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsSavingImage(false);
    }
  };

  const saveCompanyInfo = async () => {
    if (!userId) {
      setError('User ID is missing.');
      return;
    }
    if (!isTermsAgreed) {
      setError('You must agree to the terms and conditions.');
      return;
    }
    try {
      const { company_logo, ...companyInfo } = formData;
      await updateUser(userId, companyInfo);
      setIsEditing(false);
      setIsTermsAgreed(false);
      setSuccess('Company information updated successfully!');
    } catch (error) {
      console.error('Failed to update company info:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setTempImageUrl(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setIsTermsAgreed(false);
    setTempImageUrl(null);
    setImageFile(null);
  };

  const handleCloseError = () => {
    setError(null);
  };

  const handleCloseSuccess = () => {
    setSuccess(null);
  };

  return (
    <Box sx={{ mb: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={2.5}>
          <Typography sx={{ fontWeight: 600, color: '#39353D', fontSize: '16px' }}>
            Company Logo
          </Typography>
          <Typography sx={{ fontSize: '13px', mb: 2 }}>
            This is displayed on your profile
          </Typography>
          <Box sx={{
            border: '1px dashed #D0D5DD',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 4,
            p: 4,
          }}>
            <Avatar
              src={tempImageUrl || formData.company_logo}
              sx={{ width: 70, height: 70, mb: 2 }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <input
                type="file"
                ref={fileInputRef}
                hidden
                accept="image/*"
                onChange={handleImageChange}
                disabled={!isEditing}
              />
              <Button
                variant="outlined"
                onClick={() => fileInputRef.current?.click()}
                disabled={isSavingImage || !isEditing}
                sx={{ textTransform: 'none' }}
              >
                Upload
              </Button>
              {imageFile && (
                <Button
                  variant="contained"
                  onClick={saveImage}
                  disabled={isSavingImage || !imageFile}
                  sx={{ textTransform: 'none' }}
                >
                  {isSavingImage ? 'Saving...' : 'Save Logo'}
                </Button>
              )}
              {(imageFile || tempImageUrl) && (
                <IconButton onClick={removeImage} disabled={isSavingImage}>
                  <DeleteOutlineOutlined />
                </IconButton>
              )}
            </Box>
            {imageFile && (
              <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                Selected: {imageFile.name}
              </Typography>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} lg={9.5}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
              <Typography
                sx={{ fontWeight: 600, color: '#39353D', fontSize: { xs: '1rem', sm: '1.2rem' } }}
              >
                Company Information
              </Typography>
              <Typography sx={{ fontSize: '13px' }}>
                Details about the company
              </Typography>
            </Box>
            {!isEditing ? (
              <IconButton onClick={() => setIsEditing(true)} color="primary">
                <Edit />
              </IconButton>
            ) : (
              <Box>
                <IconButton onClick={handleCancelEdit} color="error" sx={{ mr: 1 }}>
                  <Cancel />
                </IconButton>
                <IconButton onClick={saveCompanyInfo} color="primary" disabled={!isTermsAgreed}>
                  <Save />
                </IconButton>
              </Box>
            )}
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 600, fontSize: '14px', mb: 1 }}>
                Company Name
              </Typography>
              <CustomTextField
                fullWidth
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                size="medium"
                placeholder="ABC Holdings..."
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 600, fontSize: '14px', mb: 1 }}>
                Company Email Address
              </Typography>
              <CustomTextField
                fullWidth
                name="company_email_address"
                value={formData.company_email_address}
                onChange={handleChange}
                size="medium"
                placeholder="abc@gmail.com"
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 600, fontSize: '14px', mb: 1 }}>
                Industry
              </Typography>
              <CustomTextField
                fullWidth
                select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                size="medium"
                placeholder="Agriculture, Technology..."
                disabled={!isEditing}
                SelectProps={{
                  MenuProps: {
                    PaperProps: { style: { maxHeight: 200 } },
                    disableScrollLock: true,
                  },
                }}
              >
                <MenuItem value="consultancy">Consultancy</MenuItem>
                <MenuItem value="technology">Technology</MenuItem>
                <MenuItem value="travel">Travel</MenuItem>
                <MenuItem value="logistic">Logistic</MenuItem>
                <MenuItem value="education">Education</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 600, fontSize: '14px', mb: 1 }}>
                Number of employees
              </Typography>
              <CustomTextField
                fullWidth
                select
                name="number_of_employees"
                value={formData.number_of_employees}
                onChange={handleChange}
                size="medium"
                placeholder="10-50, 50-100..."
                disabled={!isEditing}
                SelectProps={{
                  MenuProps: {
                    PaperProps: { style: { maxHeight: 200 } },
                    disableScrollLock: true,
                  },
                }}
              >
                <MenuItem value="10-50">10-50</MenuItem>
                <MenuItem value="50-100">50-100</MenuItem>
                <MenuItem value="100-200">100-200</MenuItem>
                <MenuItem value="200+">200+</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 600, fontSize: '14px', mb: 1 }}>
                Type of employer
              </Typography>
              <CustomTextField
                fullWidth
                select
                name="type_of_employer"
                value={formData.type_of_employer}
                onChange={handleChange}
                size="medium"
                placeholder="Private, Public..."
                disabled={!isEditing}
                SelectProps={{
                  MenuProps: {
                    PaperProps: { style: { maxHeight: 200 } },
                    disableScrollLock: true,
                  },
                }}
              >
                <MenuItem value="private">Private</MenuItem>
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="government">Government</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </CustomTextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 600, fontSize: '14px', mb: 1 }}>
                Company address
              </Typography>
              <CustomTextField
                fullWidth
                name="company_address"
                value={formData.company_address}
                onChange={handleChange}
                size="medium"
                placeholder="124, Houston Street"
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 600, fontSize: '14px', mb: 1 }}>
                Website
              </Typography>
              <CustomTextField
                fullWidth
                name="company_website"
                value={formData.company_website}
                onChange={handleChange}
                size="medium"
                placeholder="www.company.com"
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 600, fontSize: '14px', mb: 1 }}>
                Country
              </Typography>
              <CustomTextField
                fullWidth
                name="country"
                value={formData.country}
                onChange={handleChange}
                size="medium"
                placeholder="USA"
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 600, fontSize: '14px', mb: 1 }}>
                Contact Person
              </Typography>
              <CustomTextField
                fullWidth
                name="contact_person"
                value={formData.contact_person}
                onChange={handleChange}
                size="medium"
                placeholder="Jane Doe"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 600, fontSize: '14px', mb: 1 }}>
                Work Email
              </Typography>
              <CustomTextField
                fullWidth
                name="work_email"
                value={formData.work_email}
                onChange={handleChange}
                size="medium"
                placeholder="jane.doe@company.com"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 600, fontSize: '14px', mb: 1 }}>
                Position
              </Typography>
              <CustomTextField
                fullWidth
                name="position_in_company"
                value={formData.position_in_company}
                onChange={handleChange}
                size="medium"
                placeholder="HR Manager"
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 600, fontSize: '14px', mb: 1 }}>
                Company Phone Number
              </Typography>
              <CustomTextField
                fullWidth
                name="company_phone_number"
                value={formData.company_phone_number}
                onChange={handleChange}
                size="medium"
                placeholder="+1234567890"
                disabled={!isEditing}
              />
            </Grid>
          </Grid>

          {isEditing && (
            <>
              <Divider sx={{ my: 4 }} />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: { xs: 'center', sm: 'flex-start' },
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 3,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Checkbox
                    color="primary"
                    checked={isTermsAgreed}
                    onChange={(e) => setIsTermsAgreed(e.target.checked)}
                  />
                  <Typography sx={{ fontSize: '12px', width: { md: '70%' } }}>
                    Warning: By clicking this box, you agree to our terms and conditions and privacy policy.
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  onClick={saveCompanyInfo}
                  disabled={!isTermsAgreed || isSavingImage}
                  sx={{
                    width: { xs: 'fit-content', md: '30%' },
                    textTransform: 'capitalize',
                  }}
                  startIcon={<Save />}
                >
                  Save Changes
                </Button>
              </Box>
            </>
          )}
        </Grid>
      </Grid>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Snackbar open={!!success} autoHideDuration={6000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity="success">
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ClientProfile;