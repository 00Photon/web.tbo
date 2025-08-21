import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";

interface Job {
  id: number;
  title: string;
  job_type: string;
  description: string;
  requirements: string;
  skills: string[];
  currency: string;
  minimum_salary: string;
  maximum_salary: string;
  salary_type?: string;
  location: string;
  application_deadline: string;
  additional_info?: string;
  created_by: number;
  client_id: number;
  created_at: string;
  updated_at: string;
  status: string;
  applicant_count: number;
}

const JobDetailsModal: React.FC<{
  open: boolean;
  job: Job | null;
  close: () => void;
}> = ({ open, job, close }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (job) {
      setLoading(false);
    }
  }, [job]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!job) {
    return <Typography></Typography>;
  }

  return (
    <Dialog open={open} onClose={close} maxWidth="md" fullWidth>
      <DialogTitle>{job.title}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <Typography variant="h6">Job Details</Typography>
          <Typography><strong>Type:</strong> {job.job_type}</Typography>
          <Typography><strong>Location:</strong> {job.location}</Typography>
          <Typography><strong>Salary:</strong> {job.currency} {job.minimum_salary} - {job.maximum_salary}</Typography>
          <Typography><strong>Deadline:</strong> {new Date(job.application_deadline).toLocaleDateString()}</Typography>
          <Typography><strong>Status:</strong> {job.status}</Typography>
          <Typography><strong>Applicants:</strong> {job.applicant_count}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>Description</Typography>
          <Typography>{job.description}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>Requirements</Typography>
          <Typography>{job.requirements}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>Skills</Typography>
          <Typography>{job.skills.join(", ")}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>Additional Info</Typography>
          <Typography>{job.additional_info}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobDetailsModal;