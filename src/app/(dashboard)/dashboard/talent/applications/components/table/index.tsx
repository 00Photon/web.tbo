import { TextOnlyPill } from '@/@core/utils/pills';
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

interface JobApplication {
  image: string;
  companyName: string;
  role: string;
  dateOfApplication: string;
  status: 'Awaiting Feedback' | 'Interview In Progress';
}

const JobApplicationsTable: React.FC<{
  setOpenApplicationModal: () => void;
}> = ({ setOpenApplicationModal }) => {
  const headerFields = [
    'Company Name',
    'Role Applied For',
    'Date of Application',
    'Application Status',
    'Action',
  ];

  const companyNameField = (image: string, name: string) => (
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
        <Typography sx={{ fontWeight: '600', color: '#101828', fontSize: '14px' }}>
          {name}
        </Typography>
      </Box>
    </TableCell>
  );

  const textOnlyField = (data: string) => (
    <TableCell>
      <Typography sx={{ fontSize: '14px' }}>{data}</Typography>
    </TableCell>
  );

  const applicationStatusField = (status: JobApplication['status']) => {
    const statusVariant = status === 'Awaiting Feedback' ? 'grey' : 'success';

    return (
      <TableCell>
        <TextOnlyPill variant={statusVariant} text={status} />
      </TableCell>
    );
  };

  const viewButtonField = () => (
    <TableCell>
      <Button
        onClick={setOpenApplicationModal}
        variant="contained"
        sx={{ textTransform: 'none' }}
      >
        View
      </Button>
    </TableCell>
  );

  const rowsData: JobApplication[] = [
    {
      image: '/icons/google.png',
      companyName: 'Google',
      role: 'Software Engineer',
      dateOfApplication: '09-12-2024',
      status: 'Awaiting Feedback',
    },
    {
      image: '/icons/microsoft.png',
      companyName: 'Microsoft',
      role: 'Data Analyst',
      dateOfApplication: '15-03-2025',
      status: 'Interview In Progress',
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
          {rowsData.map((row, index) => (
            <TableRow key={index}>
              {companyNameField(row.image, row.companyName)}
              {textOnlyField(row.role)}
              {textOnlyField(row.dateOfApplication)}
              {applicationStatusField(row.status)}
              {viewButtonField()}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JobApplicationsTable;
