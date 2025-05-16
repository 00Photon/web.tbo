"use client";
import { Badge, Box, Grid, Stack, Typography } from "@mui/material";
import JobCard from "./components/cards/job";
import JobFilter from "./components/filter";
import JobFind from "./components/find";
import { Person } from "@mui/icons-material";
import { useEffect, useState, useMemo } from "react";
import { Job } from "@/@core/services/types/job";
import { getJobs, saveJob } from "@/@core/services/jobVanciesService";
import ApplicationFormModal from "./components/modals/application-form";

export default function TalentJobVacanciesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [openApplicationFormModal, setOpenApplicationFormModal] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    jobType: [] as string[], // e.g., ["FULLTIME", "FREELANCE"]
    experience: [] as string[], // e.g., ["0-1year", "2-5 Years"]
  });

  const hoverTabStyle = {
    backgroundColor: "#F5F0F0",
    color: "#E61C31",
  };

  const handleSaveJob = async (jobId: number) => {
    try {
      await saveJob(jobId);
      alert("Job saved successfully!");
    } catch {
      alert("Failed to save job.");
    }
  };

  const tabs = [
    { icon: <Person />, name: "Job List" },
    { icon: <Badge />, name: "Saved Jobs" },
  ];

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

  const handleFilterChange = (filterType: string, selectedOptions: string[]) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: selectedOptions,
    }));
  };

  // Map display labels to job_type enum values
  const jobTypeMap: { [key: string]: string } = {
    "Full Time": "FULLTIME",
    "Part Time": "PARTTIME",
    "Contract": "CONTRACT",
    "Internship": "INTERNSHIP",
    "Freelance": "FREELANCE",
  };

  // Parse experience from requirements field
  const parseExperience = (requirements: string): string | null => {
    const lowerReq = requirements.toLowerCase();
    if (lowerReq.includes("5+ years") || lowerReq.includes("5 years and above")) {
      return "5years and above";
    } else if (lowerReq.includes("2-5 years") || lowerReq.includes("2 to 5 years")) {
      return "2-5 Years";
    } else if (
      lowerReq.includes("0-1 year") ||
      lowerReq.includes("1 year") ||
      lowerReq.includes("less than 1 year")
    ) {
      return "0-1year";
    }
    return null; // No matching experience range
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Job Type filter
      const matchesJobType =
        filters.jobType.length === 0 ||
        filters.jobType.some((displayLabel) =>
          job.job_type === jobTypeMap[displayLabel]
        );

      // Experience filter
      const jobExperience = parseExperience(job.requirements);
      const matchesExperience =
        filters.experience.length === 0 ||
        (jobExperience && filters.experience.includes(jobExperience));

      return matchesJobType && matchesExperience;
    });
  }, [jobs, filters]);

  if (loading) {
    return <Typography>Loading...</Typography>;
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
                  ...(activeTab === index && hoverTabStyle),
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
            <JobFilter
              title={"Job Type"}
              options={[
                { label: "Full Time", checkState: false },
                { label: "Part Time", checkState: false },
                { label: "Contract", checkState: false },
                { label: "Internship", checkState: false },
                { label: "Freelance", checkState: false },
              ]}
              onFilterChange={(selected) => handleFilterChange("jobType", selected)}
            />
            <JobFilter
              title={"Experience"}
              options={[
                { label: "0-1year", checkState: false },
                { label: "2-5 Years", checkState: false },
                { label: "5years and above", checkState: false },
              ]}
              onFilterChange={(selected) => handleFilterChange("experience", selected)}
            />
          </Box>
        </Grid>
        <Grid sm={8} md={8} lg={9} item>
          <Grid rowSpacing={3} columnSpacing={3} container>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <Grid key={job.id} xs={12} lg={6} item>
                  <JobCard
                    id={job.id}
                    setOpenApplicationFormModal={() => setOpenApplicationFormModal(true)}
                    logo={job.client?.company_logo ?? "/icons/default-logo.png"}
                    name={job.client?.company_name ?? "Unknown Company"}
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
              ))
            ) : (
              <Typography>No jobs match the selected filters.</Typography>
            )}
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