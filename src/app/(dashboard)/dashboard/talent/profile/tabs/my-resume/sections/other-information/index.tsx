import { Box, Grid, Typography } from '@mui/material';
import DocumentUpload from './components/document-upload';
import { useEffect, useState } from 'react';
import { getCurrentUser, updateUser, uploadFile } from '@/@core/services/user';

const OtherInformationTab = () => {
  const [filePreviews, setFilePreviews] = useState({
    cv_upload: '',
    cover_letter_upload: '',
    id_upload: '',
  });
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getCurrentUser();
      const user = res.user;

      if (user?.id) {
        setUserId(user.id);
        setFilePreviews({
          cv_upload: user.cv_upload || '',
          cover_letter_upload: user.cover_letter_upload || '',
          id_upload: user.id_upload || '',
        });
      } else {
        console.error('User ID is missing from the response:', res);
      }
    };

    fetchUser();
  }, []);

  const handleRemoveFile = async (field: keyof typeof filePreviews) => {
    if (userId === null) return;

    try {
      // Remove file from preview immediately
      setFilePreviews(prev => ({ ...prev, [field]: '' }));

      // Update user backend with empty string to remove file reference
      await updateUser(userId, { [field]: '' });
    } catch (error) {
      console.error('Failed to remove file:', error);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof filePreviews
  ) => {
    const file = event.target.files?.[0];
    if (!file || userId === null) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const result = await uploadFile(formData);
      setFilePreviews(prev => ({ ...prev, [field]: result.url }));

      // Update user on the server
      await updateUser(userId, { [field]: result.url });
    } catch (error) {
      console.error('Upload or update failed:', error);
    }
  };

  return (
    <section>
      <Box sx={{ mt: '30px' }}>
        <Typography sx={{ fontWeight: 600, color: '#39353D', fontSize: '16px' }}>
          Other Information
        </Typography>
        <Typography sx={{ fontSize: '13px', mb: '20px' }}>
          Details about yourself
        </Typography>
        <Grid container columnSpacing={4} rowSpacing={4}>
          <Grid item xs={12} lg={4}>
            <DocumentUpload
              label="CV/Resume Upload"
              accept="application/pdf"
              onChange={(e) => handleFileUpload(e, 'cv_upload')}
              previewUrl={filePreviews.cv_upload}
              onRemove={() => handleRemoveFile('cv_upload')}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <DocumentUpload
              label="Cover Letter Upload"
              accept="application/pdf"
              onChange={(e) => handleFileUpload(e, 'cover_letter_upload')}
              previewUrl={filePreviews.cover_letter_upload}
              onRemove={() => handleRemoveFile('cover_letter_upload')}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <DocumentUpload
              label="ID Card Upload"
              accept="application/pdf,image/*"
              onChange={(e) => handleFileUpload(e, 'id_upload')}
              previewUrl={filePreviews.id_upload}
              onRemove={() => handleRemoveFile('id_upload')}
            />
          </Grid>
        </Grid>
      </Box>
    </section>
  );
};

export default OtherInformationTab;
