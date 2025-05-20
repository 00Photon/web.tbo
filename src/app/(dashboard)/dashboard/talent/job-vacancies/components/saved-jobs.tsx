import React, { useEffect, useState } from "react";
import { getSavedJobs } from "@/@core/services/jobVanciesService";
import { Grid, Typography, CircularProgress, Box } from "@mui/material";
import JobCard from "./cards/job"; // Adjust the import path as necessary

interface Job {
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
  additional_info: string | null;
  created_by: number;
  client_id: number;
  created_at: string;
  updated_at: string;
  status: string;
  applicant_count: number;
}

interface SavedJob {
  id: number;
  job_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  job: Job;
}

const SavedJobsTab: React.FC = () => {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const savedJobsList = await getSavedJobs();
        setSavedJobs(savedJobsList);
      } catch (err: any) {
        setError(err.message || "Failed to fetch saved jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" mt={2}>
        {error}
      </Typography>
    );

  if (savedJobs.length === 0) {
    return (
      <Typography color="textSecondary" mt={2}>
        You haven't saved any jobs yet.
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>
    {savedJobs.map(({ job }) => (
      <Grid item xs={12} lg={6} key={job.id}>
        <JobCard
          id={job.id}
          logo="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+p6XYAAAAASUVORK5CYII="
          setOpenApplicationFormModal={() => {}}
          name=""
          location={job.location}
          title={job.title}
          commitment={job.job_type}
          salary={`${job.currency} ${job.minimum_salary} - ${job.maximum_salary}`}
          description={job.description}
          noOfApplied={job.applicant_count.toString()}
          postedAt={new Date(job.created_at).toLocaleDateString()}
          daysLeft={Math.ceil(
            (new Date(job.application_deadline).getTime() - new Date().getTime()) /
              (1000 * 60 * 60 * 24)
          ).toString()}
        />

      </Grid>
    ))}
  </Grid>
  );
};

export default SavedJobsTab;
