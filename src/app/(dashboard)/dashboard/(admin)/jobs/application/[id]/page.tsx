"use client";
import { useEffect, useState } from "react";
import { fetchApplicationsForJob } from "@/@core/services/jobVanciesService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Link,
  CircularProgress,
  Alert,
  IconButton,

} from "@mui/material";
import { Search, Filter, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import CustomChip from "@/@core/component/mui/chip";

interface JobApplication {
  id: number;
  job_id: number;
  user_id: number;
  status: string;
  created_at: string;
  updated_at: string;
  job: {
    id: number;
    title: string;
    job_type: string;
    description: string;
    requirements: string;
    skill: string;
    currency: string;
    minimum_salary: string;
    maximum_salary: string;
    location: string;
    application_deadline: string;
    additional_info: string;
    status: string;
  };
  user: {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    profile_image: string;
    cv_upload: string;
    cover_letter_upload: string;
    video_url: string;
    project_screenshots: string[];
    portfolio_link: string;
  };
}

const JobApplicationsTable = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<JobApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobId = parseInt(params.id, 10);
        if (isNaN(jobId)) {
          throw new Error("Invalid job ID");
        }

        const response = await fetchApplicationsForJob(jobId);
        console.log("Received response:", response);

        if (response?.status && response?.id && response?.job && response?.user) {
          setData(response);
        } else {
          console.error('Received response:', response);
          throw new Error("Application data not found in response");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Failed to load application data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const getStatusChip = (status: string) => {
    const color = status === "pending" ? "warning" : "success";
    return <CustomChip label={status.charAt(0).toUpperCase() + status.slice(1)} color={color} />;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!data) {
    return (
      <Alert severity="info" sx={{ my: 2 }}>
        No application data available
      </Alert>
    );
  }

  // For the table UI, we'll create an array with just the one application
  const applications = [data];
  const totalItems = applications.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startItem = (page - 1) * rowsPerPage + 1;
  const endItem = Math.min(page * rowsPerPage, totalItems);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5">Applications</Typography>
        
    
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="applications table">
          <TableHead>
            <TableRow sx={{ bgcolor: "#f5f5f5" }}>
              <TableCell>Applicant ID</TableCell>
              <TableCell>Applicant Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.id} hover>
                <TableCell>{application.id}</TableCell>
                <TableCell>{application.user.name}</TableCell>
                <TableCell>{getStatusChip(application.status)}</TableCell>
                <TableCell>{application.job.title}</TableCell>
                <TableCell align="right">
                  <IconButton size="small">
                    <MoreVertical size={20} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {applications.length > 0 ? startItem : 0}-{endItem} of {totalItems} items
        </Typography>
        
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        
          
       
        </Box>
      </Box>
    </Box>
  );
};

export default JobApplicationsTable;