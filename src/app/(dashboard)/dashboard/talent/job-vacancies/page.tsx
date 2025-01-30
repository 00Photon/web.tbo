"use client";
import { Badge, Box, Grid, Stack, Typography } from "@mui/material";
import JobCard from "./components/cards/job";
import JobFilter from "./components/filter";
import JobFind from "./components/find";
import { Person } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getJobs, Job } from "@/@core/services/jobVanciesService";
import ApplicationFormModal from "./components/modals/application-form";

export default function TalentJobVacanciesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [openApplicationFormModal, setOpenApplicationFormModal] =
    useState(false);
  const [jobs, setJobs] = useState<Job[]>([]); // State to store jobs
  const [loading, setLoading] = useState(true); // State to handle loading

  const hoverTabStyle = {
    backgroundColor: "#F5F0F0",
    color: "#E61C31",
  };

  const tabs = [
    {
      icon: <Person />,
      name: "Job List",
    },
    {
      icon: <Badge />,
      name: "Saved Jobs",
    },
  ];

  // Fetch jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>; // Display loading state
  }

  return (
    <main>
      <Box>
        <Box
          sx={{
            display: "flex",
            mb: "20px",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Stack flexGrow={1} gap={1}>
            <Typography
              sx={{ fontWeight: 600, color: "#39353D", fontSize: "20px" }}
            >
              Job Vacancies
            </Typography>
            <Typography sx={{ fontSize: "13px", mb: "14px" }}>
              See jobs posted by people around the world
            </Typography>
          </Stack>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {tabs.map((tab, index) => (
              <Box
                onClick={() => setActiveTab(index)}
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#98A2B3",
                  border: "1px solid #EEEEEE",
                  px: "10px",
                  py: "5px",
                  cursor: "pointer",
                  "&:hover": hoverTabStyle,
                  ...(activeTab == index && hoverTabStyle),
                }}
              >
                {tab.icon}
                <Typography sx={{ fontSize: "14px", ml: "5px" }}>
                  {tab.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <JobFind sx={{ mb: "20px" }} />
      <Grid columnSpacing={3} container>
        <Grid
          sm={4}
          md={4}
          lg={3}
          item
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <JobFilter title={"Job Filter"} />
            <JobFilter
              title={"Job Type"}
              options={[
                { label: "Full Time", checkState: false },
                { label: "Freelance", checkState: false },
                { label: "Part Time", checkState: false },
              ]}
            />
            <JobFilter
              title={"Experience"}
              options={[
                { label: "Full Time", checkState: false },
                { label: "Freelance", checkState: false },
                { label: "Part Time", checkState: false },
              ]}
            />
          </Box>
        </Grid>
        <Grid sm={8} md={8} lg={9} item>
          <Grid rowSpacing={3} columnSpacing={3} container>
            {jobs.map((job) => (
              <Grid key={job.id} xs={12} lg={6} item>
                <JobCard
                  setOpenApplicationFormModal={() =>
                    setOpenApplicationFormModal(true)
                  }
                  logo={"/icons/google.png"}
                  name={job.title}
                  location={job.location}
                  title={job.title}
                  commitment={job.job_type}
                  salary={`${job.currency} ${job.minimum_salary} - ${job.maximum_salary}`}
                  description={job.description}
                  noOfApplied={"45"} // To be replaced when available
                  postedAt={new Date(job.created_at).toLocaleDateString()} // Format the date
                  daysLeft={Math.ceil(
                    (new Date(job.application_deadline).getTime() -
                      new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  ).toString()} // Calculate days left
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <ApplicationFormModal
        open={openApplicationFormModal}
        onClose={() => setOpenApplicationFormModal(false)}
        newApplication
      />
    </main>
  );
}
