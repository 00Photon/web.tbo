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
import { useEffect, useState } from 'react';
import { getAppliedJobs } from "@/@core/services/jobVanciesService";
import { AppliedJob } from "@/@core/services/types/job"; 

const JobApplicationsTable: React.FC<{
  setOpenWithdrawModal: () => void;
}> = ({ setOpenWithdrawModal }) => {
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const jobs = await getAppliedJobs();
        setAppliedJobs(jobs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to load applied jobs.");
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

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

  const applicationStatusField = (status: string) => {
    const statusVariant = status === 'pending' ? 'grey' : 'success';
    const statusText = status === 'pending' ? 'Awaiting Feedback' : 'Interview In Progress';

    return (
      <TableCell>
        <TextOnlyPill variant={statusVariant} text={statusText} />
      </TableCell>
    );
  };

  const viewButtonField = (jobId: number) => (
    <TableCell>
   <Button
    onClick={() => setOpenWithdrawModal()}
        variant="contained"
        sx={{ textTransform: 'none' }}
      >
        Withdraw Application
      </Button>
    </TableCell>
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!appliedJobs.length) return <Typography>No applied jobs found.</Typography>;

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
          {appliedJobs.map((job) => (
            <TableRow key={job.id}>
              {companyNameField('/icons/default-company.png', job.job.location)}
              {textOnlyField(job.job.title)}
              {textOnlyField(formatDate(job.created_at))}
              {applicationStatusField(job.status)}
              {viewButtonField(job.job_id)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JobApplicationsTable;
