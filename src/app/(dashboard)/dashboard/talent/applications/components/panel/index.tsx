import { CalendarMonthOutlined, Search } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@mui/material';

const JobApplicationsPanel: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        padding: '20px',
        gap: 3,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <TextField
          placeholder='Job Title, Company Name, or Anything'
          InputProps={{
            sx: {
              height: '38px',
              borderRadius: '8px',
              width: { xs: '100%', md: '400px' },
              fontSize: '14px',
            },
            startAdornment: <Search sx={{ mr: '10px', fill: '#E9384A' }} />,
          }}
        />
      </Box>
      <Button
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          border: '2px solid #D0D5DD',
          py: '5px',
          px: '10px',
          borderRadius: '8px',
          color: '#344054',
        }}
      >
        <CalendarMonthOutlined />
        <Typography
          sx={{ fontWeight: 500, fontSize: '14px', textTransform: 'none' }}
        >
          Select dates
        </Typography>
      </Button>
    </Box>
  );
};

export default JobApplicationsPanel;
