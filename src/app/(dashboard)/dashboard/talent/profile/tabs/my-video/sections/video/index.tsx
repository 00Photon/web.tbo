import React, { useState, useEffect, useRef } from 'react';
import { Box, Grid, Typography, IconButton, Button, Snackbar, Alert } from "@mui/material";
import { Edit, DeleteOutlineOutlined } from "@mui/icons-material";
import { getCurrentUser, updateUser, uploadFile } from "@/@core/services/user";

interface VideoUploadSectionProps {
  userId?: number;
  initialVideoUrl?: string;
}

const VideoUploadSection: React.FC<VideoUploadSectionProps> = ({
  userId: propUserId,
  initialVideoUrl: propVideoUrl
}) => {
  const [userId, setUserId] = useState<number | null>(propUserId || null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [tempVideoUrl, setTempVideoUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState(propVideoUrl || '');
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(!propUserId || !propVideoUrl);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (propUserId && propVideoUrl) return;

      try {
        setIsLoading(true);
        const response = await getCurrentUser();
        if (response?.user) {
          setUserId(response.user.id);
          setVideoUrl(response.user.video_url || '');
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setError("Failed to load video data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [propUserId, propVideoUrl]);

  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideoFile(file);

      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setTempVideoUrl(previewUrl);

      const formData = new FormData();
      formData.append('file', file);

      try {
        setIsUploading(true);
        const uploaded = await uploadFile(formData);
        if (uploaded?.url) {
          setVideoUrl(uploaded.url);
          setVideoFile(null);
          setTempVideoUrl(null);
          setSuccess('Video uploaded successfully!');

          // Update the user with the new video URL
          if (userId) {
            await updateUser(userId, { video_url: uploaded.url });
          }
        } else {
          throw new Error('Invalid upload response');
        }
      } catch (err) {
        console.error('Video upload failed:', err);
        setError('Failed to upload video.');
      } finally {
        setIsUploading(false);
        // Clean up preview URL
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeVideo = async () => {
    try {
      setVideoFile(null);
      setTempVideoUrl(null);
      setVideoUrl('');
      if (userId) {
        await updateUser(userId, { video_url: '' });
      }
      setSuccess('Video removed successfully!');
    } catch (error) {
      console.error("Failed to remove video:", error);
      setError("Failed to remove video.");
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  const handleCloseSuccess = () => {
    setSuccess(null);
  };

  return (
    <section>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography sx={{ fontWeight: 600, color: "#39353D", fontSize: "16px" }}>
              Upload Video of Yourself
            </Typography>
            <Typography sx={{ fontSize: "13px", mb: "10px" }}>
              Upload a video file (MP4, WebM, etc.).
            </Typography>
          </Box>
          {!isLoading && (
            <IconButton onClick={removeVideo} disabled={isUploading || !videoUrl}>
              <DeleteOutlineOutlined />
            </IconButton>
          )}
        </Box>

        <Grid container columnSpacing={4} rowSpacing={3}>
          <Grid item xs={12}>
            <Box sx={{
              border: '1px dashed #D0D5DD',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: '16px',
              padding: '20px'
            }}>
              {(tempVideoUrl || videoUrl) && !isLoading ? (
                <video
                  src={tempVideoUrl || videoUrl}
                  controls
                  style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '10px' }}
                />
              ) : (
                <Typography sx={{ color: '#666', mb: '10px' }}>
                  No video selected
                </Typography>
              )}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  accept="video/*"
                  onChange={handleVideoChange}
                />
                <Button
                  variant="outlined"
                  sx={{ textTransform: 'none' }}
                  onClick={triggerFileInput}
                  disabled={isUploading || isLoading}
                >
                  {isUploading ? 'Uploading...' : 'Upload Video'}
                </Button>
              </Box>
              {videoFile && (
                <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                  Selected: {videoFile.name}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>

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

export default VideoUploadSection;