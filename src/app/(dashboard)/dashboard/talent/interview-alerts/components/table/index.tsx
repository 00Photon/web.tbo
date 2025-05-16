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
  CircularProgress,
} from '@mui/material';
import { useEffect, useState } from 'react';
import InterviewDetailsModal from '@/app/(dashboard)/dashboard/talent/interview-alerts/components/modal/InterviewDetailsModal';
import { getInterviews } from '@/@core/services/jobVanciesService'; // Adjust path as needed

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
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = (interview: Interview) => {
    setSelectedInterview(interview);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedInterview(null);
  };

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const data = await getInterviews();

        const mapped = data.map((item) => ({
         
          name: item.interviewer_name || 'Unknown',
          role: item.interview_location || 'N/A',
          interviewStage:
            item.status === 'scheduled'
              ? 'Upcoming'
              : item.status === 'ongoing'
              ? 'In Progress'
              : 'Completed',
          date: new Date(item.interview_date).toLocaleDateString(),
          time: item.interview_time,
          location: item.interview_location,
        })) as Interview[];

        setInterviews(mapped);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch interviews');
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  const headerFields: string[] = ['Company Name', 'Location', 'Interview Stage', 'Action'];

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

  return (
    <>
      <TableContainer sx={{ backgroundColor: 'white', padding: '20px' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ padding: '20px' }}>
            {error}
          </Typography>
        ) : (
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#F9FAFB' }}>
                {headerFields.map((field, index) => (
                  <TableCell key={index}>{field}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {interviews.map((row, index) => (
                <TableRow key={index}>
                  {companyNameField(row.image, row.name)}
                  {textOnlyField(row.role)}
                  {interviewStageField(row.interviewStage)}
                  {buttonsField(row)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <InterviewDetailsModal open={open} onClose={handleClose} interview={selectedInterview} />
    </>
  );
};

export default InterviewAlertsTable;
