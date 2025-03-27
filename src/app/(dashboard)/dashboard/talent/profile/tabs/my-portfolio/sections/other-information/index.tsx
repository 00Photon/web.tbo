import { Box, Grid, TextField, Typography } from '@mui/material';
import DocumentUpload from './components/document-upload';

const PortfolioTab = () => {
  return (
    <section>
      <Box sx={{ mt: '30px' }}>
        <Typography sx={{ fontWeight: 600, color: '#39353D', fontSize: '16px' }}>
          Portfolio / Work Done
        </Typography>
        <Typography sx={{ fontSize: '13px', mb: '20px' }}>
          Showcase your past work or projects
        </Typography>
        <Grid columnSpacing={4} rowSpacing={4} container>
          {/* Upload Project Screenshot */}
          <Grid xs={12} lg={4} item>
            <DocumentUpload label="Upload Project Screenshot" />
          </Grid>

          {/* Upload Work Sample Document */}
          <Grid xs={12} lg={4} item>
            <DocumentUpload label="Upload Work Sample Document" />
          </Grid>

          {/* Input for Portfolio Link */}
          <Grid xs={12} lg={4} item>
            <Box>
              <Typography sx={{ color: '#101928', fontSize: '12px', fontWeight: 500, marginBottom: '5px' }}>
                Portfolio Link
              </Typography>
              <TextField 
                placeholder="Enter your portfolio link (e.g., GitHub, Behance, Dribbble)" 
                sx={{ width: '100%' }} 
                inputProps={{ style: { fontSize: '12px' } }} 
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </section>
  );
};

export default PortfolioTab;
