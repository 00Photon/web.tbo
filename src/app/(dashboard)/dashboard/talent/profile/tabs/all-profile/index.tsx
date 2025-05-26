import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '@/@core/services/user';
import {
  Avatar,
  Box,
  Grid,
  Typography,
  Link,
  Chip,
  Divider
} from "@mui/material";

const AllProfile = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        if (response?.user) {
          setUserData(response.user);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  if (!userData) {
    return <Typography>Loading user data...</Typography>;
  }

  return (
    <section>
      <Grid rowSpacing={3} columnSpacing={5} container>
        {/* Picture Section */}
        <Grid lg={2.5} item>
          <Box sx={{ width: 'fit-content' }}>
            <Typography sx={{ fontWeight: 600, color: '#39353D', fontSize: '16px' }}>Profile Picture</Typography>
            <Avatar 
              src={userData.profile_image} 
              sx={{ 
                width: '120px', 
                height: '120px', 
                mb: '10px',
                mt: 2,
                border: '1px solid #D0D5DD'
              }} 
            />
          </Box>
        </Grid>

        {/* Personal Info Section */}
        <Grid lg={9.5} item>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#39353D', mb: 2 }}>
              {userData.name}
            </Typography>
{/*             
            <Chip 
              label={userData.account_type} 
              color="primary" 
              size="small" 
              sx={{ mb: 2 }} 
            /> */}
            
            <Divider sx={{ my: 2 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontSize: '14px', fontWeight: 500, mb: '5px' }}>Email Address</Typography>
                <Typography sx={{ fontSize: '14px', color: 'text.secondary' }}>
                  {userData.email}
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontSize: '14px', fontWeight: 500, mb: '5px' }}>Phone Number</Typography>
                <Typography sx={{ fontSize: '14px', color: 'text.secondary' }}>
                  {userData.phone_number || 'Not provided'}
                </Typography>
              </Grid>
              
              {userData.cv_upload && (
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 500, mb: '5px' }}>CV</Typography>
                  <Link href={userData.cv_upload} target="_blank" sx={{ fontSize: '14px' }}>
                    View CV
                  </Link>
                </Grid>
              )}
              
              {userData.cover_letter_upload && (
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 500, mb: '5px' }}>Cover Letter</Typography>
                  <Link href={userData.cover_letter_upload} target="_blank" sx={{ fontSize: '14px' }}>
                    View Cover Letter
                  </Link>
                </Grid>
              )}
              
              {userData.id_upload && (
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 500, mb: '5px' }}>ID Document</Typography>
                  <Link href={userData.id_upload} target="_blank" sx={{ fontSize: '14px' }}>
                    View ID
                  </Link>
                </Grid>
              )}
              
              {userData.video_url && (
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 500, mb: '5px' }}>Introduction Video</Typography>
                  <Link href={userData.video_url} target="_blank" sx={{ fontSize: '14px' }}>
                    Watch Video
                  </Link>
                </Grid>
              )}
              
              {userData.portfolio_link && (
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 500, mb: '5px' }}>Portfolio</Typography>
                  <Link href={userData.portfolio_link} target="_blank" sx={{ fontSize: '14px' }}>
                    {userData.portfolio_link}
                  </Link>
                </Grid>
              )}
              
              {userData.work_sample_upload && (
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 500, mb: '5px' }}>Work Samples</Typography>
                  <Link href={userData.work_sample_upload} target="_blank" sx={{ fontSize: '14px' }}>
                    View Work Samples
                  </Link>
                </Grid>
              )}
              
              {userData.project_screenshots && (
                <Grid item xs={12}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 500, mb: '5px' }}>Project Screenshots</Typography>
                  <Link href={userData.project_screenshots} target="_blank" sx={{ fontSize: '14px' }}>
                    View Project Screenshots
                  </Link>
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </section>
  );
};

export default AllProfile;