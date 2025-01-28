import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const InterviewAlertsTable = () => {
  const headerFields = [
    'Company Name',
    'Salary Range',
    'Role Applied',
    'Interview Date',
    'Interview Time',
    '',
  ];

  const companyNameField = (image: string, name: string) => {
    return (
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ marginRight: '12px' }}>
            <Box
              sx={{
                backgroundImage: `url(${image})`,
                backgroundSize: '100% 100%',
                borderRadius: '20%',
                width: '30px',
                height: '30px',
                backgroundColor: '#E7E7E7',
              }}
            />
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: '600', color: '#101828', fontSize: '14px' }}
            >
              {name}
            </Typography>
          </Box>
        </Box>
      </TableCell>
    );
  };

  const textOnlyField = (data: string) => {
    return (
      <TableCell>
        <Typography sx={{ fontSize: '14px' }}>{data}</Typography>
      </TableCell>
    );
  };

  const buttonsField = () => {
    return (
      <TableCell>
        <Button
          variant='contained'
          sx={{
            textTransform: 'none',
          }}
        >
          Attend Now
        </Button>
      </TableCell>
    );
  };

  const rowsData = [
    {
      image: '/icons/google.png',
      name: 'Google',
      salaryRange: '$20,000 - $25,000',
      noOfApplications: 45,
      datePosted: '09-12-2024',
      status: '09:04 AM',
    },
  ];

  return (
    <TableContainer sx={{ backgroundColor: 'white', padding: '20px' }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#F9FAFB' }}>
            {headerFields.map((field, index) => (
              <TableCell key={index}>{field}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array(10)
            .fill(rowsData[0])
            .map((row, index) => (
              <TableRow key={index}>
                {companyNameField(row.image, row.name)}
                {[
                  row.salaryRange,
                  `${row.noOfApplications} Applications`,
                  row.datePosted,
                  row.status,
                ].map((field) => textOnlyField(field))}
                {buttonsField()}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InterviewAlertsTable;
