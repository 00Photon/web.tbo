import { Box, Grid, TextField, Typography, Button } from '@mui/material';
import DocumentUpload from './components/document-upload';
import { useEffect, useState } from 'react';
import { getCurrentUser, updateUser, uploadFile } from '@/@core/services/user';

const PortfolioTab = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [projectScreenshots, setProjectScreenshots] = useState<string[]>([]);
  const [workSample, setWorkSample] = useState<string>('');
  const [portfolioLink, setPortfolioLink] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        const user = res.user;
        if (user?.id) {
          setUserId(user.id);
          setProjectScreenshots(user.project_screenshots || []);
          setWorkSample(user.work_sample_upload || '');
          setPortfolioLink(user.portfolio_link || '');
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchUser();
  }, []);

  const handleAddProjectScreenshot = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || userId === null) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const result = await uploadFile(formData);
      const newScreenshots = [...projectScreenshots, result.url];
      setProjectScreenshots(newScreenshots);
      await updateUser(userId, { project_screenshots: newScreenshots });
    } catch (error) {
      console.error('Upload or update failed:', error);
    }
  };

  const handleRemoveProjectScreenshot = async (index: number) => {
    if (userId === null) return;
    const newScreenshots = projectScreenshots.filter((_, i) => i !== index);
    setProjectScreenshots(newScreenshots);
    try {
      await updateUser(userId, { project_screenshots: newScreenshots });
    } catch (error) {
      console.error('Failed to update screenshots:', error);
    }
  };

  const handleWorkSampleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || userId === null) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const result = await uploadFile(formData);
      setWorkSample(result.url);
      await updateUser(userId, { work_sample_upload: result.url });
    } catch (error) {
      console.error('Upload or update failed:', error);
    }
  };

  const handleRemoveWorkSample = async () => {
    if (userId === null) return;
    setWorkSample('');
    try {
      await updateUser(userId, { work_sample_upload: '' });
    } catch (error) {
      console.error('Failed to remove work sample:', error);
    }
  };

  const handleSavePortfolioLink = async () => {
    if (userId === null) return;
    setIsSaving(true);
    try {
      await updateUser(userId, { portfolio_link: portfolioLink });
    } catch (error) {
      console.error('Failed to update portfolio link:', error);
    }
    setIsSaving(false);
  };

  return (
    <section>
      <Box sx={{ mt: '30px' }}>
        <Typography sx={{ fontWeight: 600, color: '#39353D', fontSize: '16px' }}>
          Portfolio / Work Done
        </Typography>
        <Typography sx={{ fontSize: '13px', mb: '20px' }}>
          Showcase your past work or projects
        </Typography>

        <Grid container columnSpacing={4} rowSpacing={4}>
          {/* Project Screenshots */}
          <Grid item xs={12} lg={4}>
            <Typography sx={{ mb: 1, fontWeight: 600 }}>Upload Project Screenshot(s)</Typography>
            {projectScreenshots.map((url, i) => (
              <Box key={i} sx={{ mb: 1 }}>
                <DocumentUpload
                  label={`Screenshot ${i + 1}`}
                  previewUrl={url}
                  onRemove={() => handleRemoveProjectScreenshot(i)}
                  // No onChange here because each item is already uploaded
                />
              </Box>
            ))}
            {/* Add new screenshot */}
            <DocumentUpload
              label="Add Screenshot"
              accept="image/*"
              onChange={handleAddProjectScreenshot}
            />
          </Grid>

          {/* Work Sample Document */}
          <Grid item xs={12} lg={4}>
            <Typography sx={{ mb: 1, fontWeight: 600 }}>Upload Work Sample Document</Typography>
            <DocumentUpload
              label="Upload Work Sample"
              accept="application/pdf"
              previewUrl={workSample}
              onChange={handleWorkSampleUpload}
              onRemove={handleRemoveWorkSample}
            />
          </Grid>

          {/* Portfolio Link */}
          <Grid item xs={12} lg={4}>
            <Box>
              <Typography
                sx={{ color: '#101928', fontSize: '12px', fontWeight: 500, marginBottom: '5px' }}
              >
                Portfolio Link
              </Typography>
              <TextField
                placeholder="Enter your portfolio link (e.g., GitHub, Behance, Dribbble)"
                sx={{ width: '100%' }}
                inputProps={{ style: { fontSize: '12px' } }}
                value={portfolioLink}
                onChange={(e) => setPortfolioLink(e.target.value)}
              />
              <Button sx={{ mt: 1 }} variant="contained" disabled={isSaving} onClick={handleSavePortfolioLink}>
                Save Link
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </section>
  );
};

export default PortfolioTab;
