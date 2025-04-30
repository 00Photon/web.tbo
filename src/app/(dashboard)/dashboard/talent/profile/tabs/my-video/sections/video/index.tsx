import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, Typography, IconButton, Snackbar, Alert } from "@mui/material";
import { Edit, Save } from "@mui/icons-material";
import { getCurrentUser, updateUser } from "@/@core/services/user";

interface VideoUploadSectionProps {
  userId?: number;
  initialVideoUrl?: string;
}

const VideoUploadSection: React.FC<VideoUploadSectionProps> = ({ 
  userId: propUserId,
  initialVideoUrl: propVideoUrl 
}) => {
  const [userId, setUserId] = useState<number | null>(propUserId || null);
  const [videoUrl, setVideoUrl] = useState(propVideoUrl || '');
  const [editable, setEditable] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(!propUserId || !propVideoUrl);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
        setError("Failed to load video URL");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [propUserId, propVideoUrl]);

  const handleSave = async () => {
    if (!videoUrl) {
      setError("Please enter a video URL");
      return;
    }
  
    if (!userId) {
      setError("User not loaded");
      return;
    }
  
    try {
      setIsSaving(true);
  
      // Send JSON payload (no FormData needed)
      await updateUser(userId, { video_url: videoUrl });
  
      setEditable(false);
      setSuccess("Video URL saved successfully!");
    } catch (error) {
      console.error("Failed to save video URL:", error);
      setError("Failed to save video URL. Please try again.");
    } finally {
      setIsSaving(false);
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
              Upload Video URL of Yourself
            </Typography>
            <Typography sx={{ fontSize: "13px", mb: "10px" }}>
              Please provide a YouTube or Google Drive link.
            </Typography>
          </Box>
          {!isLoading && (
            editable ? (
              <IconButton onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : <Save />}
              </IconButton>
            ) : (
              <IconButton onClick={() => setEditable(true)}>
                <Edit />
              </IconButton>
            )
          )}
        </Box>
        
        <Grid container columnSpacing={4} rowSpacing={3}>
          <Grid item xs={12}>
            <Box sx={{ color: "#101928", fontSize: "12px", fontWeight: 500, marginBottom: "5px" }}>
              Video URL
            </Box>
            <TextField
              value={isLoading ? "Loading..." : videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder={isLoading ? "" : "Enter YouTube or Google Drive link"}
              sx={{ width: "100%" }}
              inputProps={{ style: { fontSize: "12px" } }}
              disabled={!editable || isLoading}
            />
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