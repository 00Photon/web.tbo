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
  IconButton,
  CircularProgress,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Link,
} from "@mui/material";
import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
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
    phone_number: string | null;
    profile_image: string | null;
    cv_upload: string | null;
    cover_letter_upload: string | null;
    video_url: string | null;
    project_screenshots: string[];
    portfolio_link: string | null;
  };
}

const JobApplicationsTable = ({ params }: { params: { id?: string } }) => {
  const [data, setData] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!params.id || isNaN(parseInt(params.id, 10))) {
          setData([]);
          setLoading(false);
          return;
        }

        const jobId = parseInt(params.id, 10);
        const response = await fetchApplicationsForJob(jobId);
        console.log("Received response:", response);

        // Normalize response to an array
        const applications = Array.isArray(response) ? response : response ? [response] : [];
        setData(applications);
      } catch (err) {
        console.error("Fetch error:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const getStatusChip = (status: string) => {
    const color = status === "PENDING" ? "warning" : "success";
    return <CustomChip label={status.charAt(0).toUpperCase() + status.slice(1)} color={color} />;
  };

  const handleOpenDialog = (application: JobApplication) => {
    setSelectedApplication(application);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedApplication(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (data.length === 0) {
    return (
      <Card sx={{ my: 2, p: 3, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Applications Yet
          </Typography>
          <Typography variant="body1" color="text.secondary">
            It looks like no one has applied for this job yet. Check back later.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = Math.min(page * rowsPerPage, totalItems);
  const paginatedApplications = data.slice(startIndex, endIndex);

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
            {paginatedApplications.map((application) => (
              <TableRow key={application.id} hover>
                <TableCell>{application.id}</TableCell>
                <TableCell>{application.user.name}</TableCell>
                <TableCell>{getStatusChip(application.status)}</TableCell>
                <TableCell>{application.job.title}</TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(application)}
                    aria-label="view details"
                  >
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
          Showing {data.length > 0 ? startIndex + 1 : 0}-{endIndex} of {totalItems} items
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            aria-label="previous page"
          >
            <ChevronLeft size={20} />
          </IconButton>
          <Typography variant="body2">{page}</Typography>
          <IconButton
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            aria-label="next page"
          >
            <ChevronRight size={20} />
          </IconButton>
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Candidate Details</DialogTitle>
        <DialogContent>
          {selectedApplication && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h6">Applicant Information</Typography>
              <Typography><strong>Name:</strong> {selectedApplication.user.name}</Typography>
              <Typography><strong>Email:</strong> {selectedApplication.user.email}</Typography>
              <Typography><strong>Phone Number:</strong> {selectedApplication.user.phone_number || "Not provided"}</Typography>
              <Typography>
                <strong>CV:</strong>{" "}
                {selectedApplication.user.cv_upload ? (
                  <Link href={selectedApplication.user.cv_upload} target="_blank" rel="noopener">
                    View CV
                  </Link>
                ) : (
                  "Not provided"
                )}
              </Typography>
              <Typography>
                <strong>Cover Letter:</strong>{" "}
                {selectedApplication.user.cover_letter_upload ? (
                  <Link href={selectedApplication.user.cover_letter_upload} target="_blank" rel="noopener">
                    View Cover Letter
                  </Link>
                ) : (
                  "Not provided"
                )}
              </Typography>
              <Typography>
                <strong>Portfolio Link:</strong>{" "}
                {selectedApplication.user.portfolio_link ? (
                  <Link href={selectedApplication.user.portfolio_link} target="_blank" rel="noopener">
                    View Portfolio
                  </Link>
                ) : (
                  "Not provided"
                )}
              </Typography>
              <Typography>
                <strong>Project Screenshots:</strong>
                {selectedApplication.user.project_screenshots.length > 0 ? (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                    {selectedApplication.user.project_screenshots.map((screenshot, index) => (
                      <Link key={index} href={screenshot} target="_blank" rel="noopener">
                        <img
                          src={screenshot}
                          alt={`Screenshot ${index + 1}`}
                          style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        />
                      </Link>
                    ))}
                  </Box>
                ) : (
                  " None"
                )}
              </Typography>
              <Typography>
                <strong>Video:</strong>{" "}
                {selectedApplication.user.video_url ? (
                  <Link href={selectedApplication.user.video_url} target="_blank" rel="noopener">
                    View Video
                  </Link>
                ) : (
                  "Not provided"
                )}
              </Typography>

              <Typography variant="h6" sx={{ mt: 2 }}>Job Information</Typography>
              <Typography><strong>Job Title:</strong> {selectedApplication.job.title}</Typography>
              <Typography><strong>Job Type:</strong> {selectedApplication.job.job_type}</Typography>
              <Typography><strong>Description:</strong> {selectedApplication.job.description}</Typography>
              <Typography><strong>Requirements:</strong> {selectedApplication.job.requirements}</Typography>
              <Typography><strong>Skill:</strong> {selectedApplication.job.skill}</Typography>
              <Typography>
                <strong>Salary:</strong> {selectedApplication.job.currency} {selectedApplication.job.minimum_salary} - {selectedApplication.job.maximum_salary}
              </Typography>
              <Typography><strong>Location:</strong> {selectedApplication.job.location}</Typography>
              <Typography><strong>Application Deadline:</strong> {selectedApplication.job.application_deadline}</Typography>
              <Typography><strong>Additional Info:</strong> {selectedApplication.job.additional_info}</Typography>
              <Typography><strong>Application Status:</strong> {selectedApplication.status}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JobApplicationsTable;