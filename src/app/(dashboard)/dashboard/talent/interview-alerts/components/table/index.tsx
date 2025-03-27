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
import { useState } from 'react';
import InterviewDetailsModal from '@/app/(dashboard)/dashboard/talent/interview-alerts/components/modal/InterviewDetailsModal';

interface Interview {
  image: string;
  name: string;
  role: string;
  interviewStage: 'Upcoming' | 'In Progress' | 'Completed';
  date: string;
  time: string;
  location: string;
}

const InterviewAlertsTable: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);

  const handleOpen = (interview: Interview) => {
    setSelectedInterview(interview);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedInterview(null);
  };

  const headerFields: string[] = ['Company Name', 'Role Applied', 'Interview Stage', 'Action'];

  const companyNameField = (image: string, name: string) => (
    <TableCell>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ marginRight: '12px' }}>
          <Box
            sx={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
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

  const interviewStageField = (stage: 'Upcoming' | 'In Progress' | 'Completed') => (
    <TableCell>
      <Typography
        sx={{
          fontSize: '14px',
          fontWeight: 'bold',
          color:
            stage === 'Upcoming'
              ? 'blue'
              : stage === 'In Progress'
              ? 'orange'
              : 'green',
        }}
      >
        {stage}
      </Typography>
    </TableCell>
  );

  const buttonsField = (row: Interview) => (
    <TableCell>
      <Button
        variant="contained"
        sx={{ textTransform: 'none' }}
        onClick={() => handleOpen(row)}
      >
        View
      </Button>
    </TableCell>
  );

  const rowsData: Interview[] = [
    {
      image: '/icons/google.png',
      name: 'Google',
      role: 'Software Engineer',
      interviewStage: 'Upcoming',
      date: 'March 30, 2025',
      time: '10:00 AM',
      location: 'Google HQ, California',
    },
    {
      image: '/icons/microsoft.png',
      name: 'Microsoft',
      role: 'Backend Developer',
      interviewStage: 'In Progress',
      date: 'April 2, 2025',
      time: '3:00 PM',
      location: 'Microsoft Teams (Online)',
    },
    {
      image: '/icons/amazon.png',
      name: 'Amazon',
      role: 'Frontend Developer',
      interviewStage: 'Completed',
      date: 'March 15, 2025',
      time: '1:30 PM',
      location: 'Amazon Office, Seattle',
    },
  ];

  return (
    <>
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
                {companyNameField(row.image, row.name)}
                {textOnlyField(row.role)}
                {interviewStageField(row.interviewStage)}
                {buttonsField(row)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Use the new InterviewDetailsModal component */}
      <InterviewDetailsModal open={open} onClose={handleClose} interview={selectedInterview} />
    </>
  );
};

export default InterviewAlertsTable;
