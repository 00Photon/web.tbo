import { Restore, Search } from '@mui/icons-material';
import { Box, Button, Grid, SxProps, TextField } from '@mui/material';

const JobFind: React.FC<{ sx?: SxProps }> = ({ sx }) => {
  return (
    <Box
      sx={{
        ...sx,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        backgroundColor: 'white',
        padding: '20px',
      }}
    >
      <Box>Find Your Dream Job</Box>
      <Box
        sx={{
          display: 'flex',
          gap: { xs: 4, md: 5 },
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Grid flexGrow={1} columnSpacing={3} rowSpacing={3} container>
          {[
            {
              placeholder: 'Job Title, Company name or Anything',
              xs: 12,
              lg: 6,
            },
            { placeholder: 'Location', xs: 12, sm: 6, lg: 3 },
            { placeholder: 'Salary Range', xs: 12, sm: 6, lg: 3 },
          ].map((item, index) => (
            <Grid key={index} xs={item.xs} sm={item.sm} lg={item.lg} item>
              <TextField
                placeholder={item.placeholder}
                InputProps={{
                  startAdornment: <Search />,
                  sx: { height: '36px' },
                }}
                fullWidth
              />
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          {[
            {
              icon: <Restore sx={{ marginRight: '5px' }} />,
              label: 'Reset',
              variant: 'outlined',
            },
            { icon: null, label: 'Search', variant: 'contained' },
          ].map((button, index) => (
            <Button
              key={index}
              variant={button.variant as 'outlined' | 'contained'}
              sx={{ textTransform: 'none' }}
            >
              {button.icon}
              {button.label}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default JobFind;
