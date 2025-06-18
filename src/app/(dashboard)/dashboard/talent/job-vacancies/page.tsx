"use client";
import {
  Badge,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Restore, Search, Person } from "@mui/icons-material";
import JobCard from "./components/cards/job";
import JobFilter from "./components/filter";
import { useEffect, useState, useMemo } from "react";
import { Job } from "@/@core/services/types/job";
import { getJobs, saveJob } from "@/@core/services/jobVanciesService";
import ApplicationFormModal from "./components/modals/application-form";
import SavedJobsTab from "./components/saved-jobs";

// Define JobFilterOption type if not imported from elsewhere
type JobFilterOption = {
  label: string;
  checkState: boolean;
};

export default function TalentJobVacanciesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [openApplicationFormModal, setOpenApplicationFormModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    jobType: [] as string[],
    experience: [] as string[],
    location: [] as string[],
  });
  const [searchParams, setSearchParams] = useState({
    titleOrCompany: "",
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

  const handleSearch = (params: { titleOrCompany: string }) => {
    setSearchParams(params);
  };

  const handleReset = () => {
    // Reset all filters and search parameters to their initial state
    setFilters({
      jobType: [],
      experience: [],
      location: [],
    });
    setSearchParams({ titleOrCompany: "" });
  };

  const jobTypeMap: { [key: string]: string } = {
    "Full Time": "FULLTIME",
    "Part Time": "PARTTIME",
    "Contract": "CONTRACT",
    "Internship": "INTERNSHIP",
    "Freelance": "FREELANCE",
  };

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
    return null;
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesJobType =
        filters.jobType.length === 0 ||
        filters.jobType.some((displayLabel) => job.job_type === jobTypeMap[displayLabel]);

      const jobExperience = parseExperience(job.requirements);
      const matchesExperience =
        filters.experience.length === 0 ||
        (jobExperience && filters.experience.includes(jobExperience));

      const matchesLocation =
        filters.location.length === 0 ||
        filters.location.includes(job.location);

      const matchesTitleOrCompany =
        !searchParams.titleOrCompany ||
        job.title.toLowerCase().includes(searchParams.titleOrCompany.toLowerCase()) ||
        (job.client?.company_name || "").toLowerCase().includes(searchParams.titleOrCompany.toLowerCase());

      return matchesJobType && matchesExperience && matchesLocation && matchesTitleOrCompany;
    });
  }, [jobs, filters, searchParams]);

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

      {activeTab === 0 ? (
        <>
          <Box
            sx={{
              mb: "20px",
              display: "flex",
              flexDirection: "column",
              gap: 3,
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box>
              <Typography
                sx={{ fontWeight: 600, color: "#2D2D2D", fontSize: "18px" }}
              >
                Find Your Dream Job
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: { xs: 4, md: 5 },
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
              }}
            >
              <Grid flexGrow={1} columnSpacing={3} rowSpacing={3} container>
                <Grid xs={12} lg={6} item>
                  <TextField
                    placeholder="Job Title, Company name or Anything"
                    value={searchParams.titleOrCompany}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSearchParams((prev) => ({
                        ...prev,
                        titleOrCompany: e.target.value,
                      }))
                    }
                    InputProps={{
                      startAdornment: <Search sx={{ color: "#6B7280", mr: 1 }} />,
                      sx: {
                        height: "40px",
                        borderRadius: "4px",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#D1D5DB",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#9CA3AF",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#E61C31",
                        },
                        "& input": {
                          padding: "8px 12px",
                        },
                      },
                    }}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    color: "#E61C31",
                    borderColor: "#E61C31",
                    "&:hover": {
                      borderColor: "#C8102E",
                      backgroundColor: "#FFF5F5",
                    },
                  }}
                  onClick={handleReset}
                >
                  <Restore sx={{ marginRight: "5px", color: "#E61C31" }} />
                  Reset
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    backgroundColor: "#E61C31",
                    "&:hover": {
                      backgroundColor: "#C8102E",
                    },
                  }}
                  onClick={() => handleSearch(searchParams)}
                >
                  Search
                </Button>
              </Box>
            </Box>
          </Box>

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
                  ] as JobFilterOption[]}
                  onFilterChange={(selected: string[]) => handleFilterChange("jobType", selected)}
                />
                <JobFilter
                  title={"Experience"}
                  options={[
                    { label: "0-1year", checkState: false },
                    { label: "2-5 Years", checkState: false },
                    { label: "5years and above", checkState: false },
                  ] as JobFilterOption[]}
                  onFilterChange={(selected: string[]) => handleFilterChange("experience", selected)}
                />
                <JobFilter
                  title={"Location"}
                  options={[
                    { label: "Hybrid", checkState: false },
                    { label: "Remote", checkState: false },
                    { label: "Onsite", checkState: false },
                  ] as JobFilterOption[]}
                  onFilterChange={(selected: string[]) => handleFilterChange("location", selected)}
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
                        setOpenApplicationFormModal={(jobId: number) => {
                          setSelectedJobId(jobId);
                          setOpenApplicationFormModal(true);
                        }}
                      />
                    </Grid>
                  ))
                ) : (
                  <Typography>No jobs match the selected filters.</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <SavedJobsTab />
      )}

      <ApplicationFormModal
        open={openApplicationFormModal}
        onClose={() => {
          setOpenApplicationFormModal(false);
          setSelectedJobId(null);
        }}
        newApplication
        jobId={selectedJobId === null ? undefined : selectedJobId}
      />
    </main>
  );
}