"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Breadcrumbs,
  Link,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem as MenuItemComponent,
} from "@mui/material"
import {
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  MoreHoriz as MoreHorizIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ApplicantViewModal } from "@/@core/component/modals/applicant-view-modal"
import { RecommendationsModal } from "@/@core/component/modals/recommendations-modal"
import { CustomPagination } from "@/@core/component/common/custom-pagination"
import { usePagination } from "@/@core/component/hooks/use-pagination"
import JobDetailsModal from "../JobDetailsModal"
import { fetchJobsById, fetchApplications } from "@/@core/services/jobService"

interface Job {
  id: number
  title: string
  job_type: string
  description: string
  requirements: string
  skill: string | string[] // Handle both string and array
  currency: string
  salary_type: string
  minimum_salary: string
  maximum_salary: string
  location: string
  application_deadline: string
  additional_info: string | null
  created_by: number
  client_id: number
  created_at: string
  updated_at: string
  status: string
  applicant_count: number
  client?: {
    id: number
    name: string
    company_name: string
    company_email_address: string
    industry: string
    number_of_employees: string
    type_of_employer: string
    company_address: string
    company_phone_number: string | null
    country: string
    company_website: string
    position_in_company: string
    phone_number: string
    email: string
    is_verified: number
    created_at: string
    updated_at: string
    status: string
  }
}

interface Application {
  id: number
  job_id: number
  user_id: number
  status: string
  created_at: string
  updated_at: string
  user: {
    name: string
    email: string
    account_type: string
    // Other user fields
  }
}

interface ApplicantData {
  id: string
  name: string
  email: string
  jobTitle: string
  applicationDate: string
  type: string
  status: string
}

export default function JobApplicationDetails() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.jobId as string

  const [activeTab, setActiveTab] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [typeFilter, setTypeFilter] = useState("All")
  const [selectedApplicant, setSelectedApplicant] = useState<ApplicantData | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [recommendationsModalOpen, setRecommendationsModalOpen] = useState(false)
  const [jobDetailsModalOpen, setJobDetailsModalOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedApplicantIndex, setSelectedApplicantIndex] = useState<number | null>(null)
  const [job, setJob] = useState<Job | null>(null)
  const [applicants, setApplicants] = useState<ApplicantData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const tabs = ["All", "Shortlisted", "Hired"]
  const statusFilters = ["All", "Submitted", "Shortlisted", "Interviewed", "Hired", "Rejected"]
  const typeFilters = ["All", "Applied", "Interested", "Recommended"]

  // Fetch job and application data
  useEffect(() => {
    const loadJobAndApplicants = async () => {
      try {
        setLoading(true)
        // Fetch job details
        const jobResponse = await fetchJobsById(jobId)
        console.log("Job Response:", jobResponse)
        if (jobResponse && jobResponse.status && jobResponse.job) {
          const fetchedJob: Job = {
            ...jobResponse.job,
            skill: typeof jobResponse.job.skill === "string" ? JSON.parse(jobResponse.job.skill || "[]") : jobResponse.job.skill,
          }
          setJob(fetchedJob)

          // Fetch applications
          const applicationsResponse = await fetchApplications()
          console.log("Applications Response:", applicationsResponse)
          const applications: Application[] = applicationsResponse.applications || []
          // Filter applications by jobId and map to ApplicantData
          const mappedApplicants: ApplicantData[] = applications
            .filter((app) => app.job_id === parseInt(jobId) && app.user?.name && app.user?.email)
            .map((app) => ({
              id: app.id.toString(),
              name: app.user.name || "Unknown Applicant",
              email: app.user.email || "unknown@example.com",
              jobTitle: fetchedJob.title,
              applicationDate: new Date(app.created_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }),
              type: app.user.account_type === "TALENT" ? "Applied" : "Recommended", // Adjust based on account_type
              status: app.status.toLowerCase() === "hired" ? "Hired" : app.status, // Normalize status
            }))
          setApplicants(mappedApplicants)
          if (mappedApplicants.length === 0) {
            setError("No valid applicants available for this job.")
            toast.info("No valid applicants available for this job.")
          }
        } else {
          setError("Job not found")
          toast.error("Job not found")
        }
      } catch (err: any) {
        console.error("Error fetching data:", err)
        const errorMessage =
          err.message === "User is not authenticated"
            ? "Please log in to view job details."
            : err.message === "Failed to fetch job details" || err.message === "Failed to fetch jobs"
            ? "Job or applications not found. Please try again."
            : "An unexpected error occurred while fetching data. Please try again."
        setError(errorMessage)
        toast.error(errorMessage)
      } finally {
        setLoading(false)
      }
    }
    loadJobAndApplicants()
  }, [jobId])

  // Get recommended applicants
  const recommendedApplicants = useMemo(() => {
    return applicants.filter((applicant) => applicant.type === "Recommended")
  }, [applicants])

  const filteredApplicants = useMemo(() => {
    return applicants.filter((applicant) => {
      let matchesTab = true
      if (activeTab === 1) {
        matchesTab = applicant.status === "Shortlisted"
      } else if (activeTab === 2) {
        matchesTab = applicant.status === "Hired"
      }

      const matchesSearch =
        (applicant.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (applicant.email || "").toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "All" || applicant.status === statusFilter
      const matchesType = typeFilter === "All" || applicant.type === typeFilter

      return matchesTab && matchesSearch && matchesStatus && matchesType
    })
  }, [activeTab, searchQuery, statusFilter, typeFilter, applicants])

  const { currentPage, totalPages, paginatedData, handlePrevious, handleNext } = usePagination({
    data: filteredApplicants,
    itemsPerPage: 10,
  })

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const handleViewApplicant = (applicant: ApplicantData) => {
    setSelectedApplicant(applicant)
    setModalOpen(true)
    handleMenuClose()
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget)
    setSelectedApplicantIndex(index)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedApplicantIndex(null)
  }

  const toggleJobDetailsModal = () => {
    setJobDetailsModalOpen(!jobDetailsModalOpen)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hired":
        return { bgcolor: "#ECFDF5", color: "#065F46" }
      case "Interviewed":
        return { bgcolor: "#F0F9FF", color: "#0C4A6E" }
      case "Shortlisted":
        return { bgcolor: "#FFFBEB", color: "#92400E" }
      case "Rejected":
        return { bgcolor: "#FEF2F2", color: "#991B1B" }
      case "Submitted":
        return { bgcolor: "#F3F4F6", color: "#374151" }
      default:
        return { bgcolor: "#F3F4F6", color: "#374151" }
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Applied":
        return { bgcolor: "#EFF6FF", color: "#1E40AF" }
      case "Interested":
        return { bgcolor: "#ECFDF5", color: "#065F46" }
      case "Recommended":
        return { bgcolor: "#FEF3C7", color: "#92400E" }
      default:
        return { bgcolor: "#F3F4F6", color: "#374151" }
    }
  }

  if (loading) return <Typography>Loading...</Typography>
  if (error) return <Typography>{error}</Typography>

  return (
    <Box sx={{ width: "100%" }}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* Header with Breadcrumbs */}
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link
            component="button"
            variant="body2"
            onClick={() => router.push("/dashboard/jobs")}
            sx={{ textDecoration: "none", color: "text.secondary" }}
          >
            Job Applications
          </Link>
          <Typography variant="body2" color="text.primary">
            {job?.title || "Unknown Job"}
          </Typography>
        </Breadcrumbs>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h5" sx={{ mb: 1 }}>
              {job?.title || "Unknown Job"} Applications
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage applications for this position
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<VisibilityIcon />}
              onClick={toggleJobDetailsModal}
            >
              View Job Details
            </Button>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => router.push("/dashboard/jobs")}
            >
              Back to Jobs
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Recommendations Card */}
      <Card
        sx={{
          mb: 4,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="h3" sx={{ mb: 1, color: "white" }}>
                AI Recommendations
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, color: "rgba(255, 255, 255, 0.9)" }}>
                {recommendedApplicants.length} candidates have been automatically recommended for this position
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
                Our AI has analyzed profiles and matched the best candidates for {job?.title || "this position"}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h2" sx={{ mb: 1, color: "white", fontWeight: "bold" }}>
                {recommendedApplicants.length}
              </Typography>
              <Button
                variant="contained"
                startIcon={<VisibilityIcon />}
                onClick={() => setRecommendationsModalOpen(true)}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(255, 255, 255, 0.3)",
                  },
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
              >
                View Recommendations
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardContent sx={{ p: 3 }}>
          {/* Tab Filters */}
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              {tabs.map((tab, index) => (
                <Tab key={index} label={tab} />
              ))}
            </Tabs>
          </Box>

          {/* Search and Filters */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "stretch", md: "center" },
              gap: 2,
              mb: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="h3">Applicants</Typography>
              <Typography variant="body2" color="text.secondary">
                {filteredApplicants.length}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1, justifyContent: "center" }}>
              <TextField
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                sx={{ width: { xs: "100%", md: 300 } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
                  {statusFilters.map((filter) => (
                    <MenuItem key={filter} value={filter}>
                      {filter}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Type</InputLabel>
                <Select value={typeFilter} label="Type" onChange={(e) => setTypeFilter(e.target.value)}>
                  {typeFilters.map((filter) => (
                    <MenuItem key={filter} value={filter}>
                      {filter}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Table */}
          <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #E5E7EB" }}>
            <Table>
              <TableHead sx={{ bgcolor: "#F9FAFB" }}>
                <TableRow>
                  <TableCell>S/N</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Application Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No applicants available
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedData.map((applicant, index) => (
                    <TableRow key={applicant.id} hover>
                      <TableCell>{(currentPage - 1) * 10 + index + 1}</TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{applicant.name}</TableCell>
                      <TableCell>{applicant.email}</TableCell>
                      <TableCell>{applicant.jobTitle}</TableCell>
                      <TableCell>{applicant.applicationDate}</TableCell>
                      <TableCell>
                        <Chip label={applicant.type} size="small" sx={getTypeColor(applicant.type)} />
                      </TableCell>
                      <TableCell>
                        <Chip label={applicant.status} size="small" sx={getStatusColor(applicant.status)} />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" onClick={(e) => handleMenuClick(e, index)}>
                          <MoreHorizIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredApplicants.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            itemName="applicants"
          />
        </CardContent>
      </Card>

      {/* Action Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItemComponent
          onClick={() => {
            if (selectedApplicantIndex !== null) {
              handleViewApplicant(paginatedData[selectedApplicantIndex])
            }
          }}
        >
          View
        </MenuItemComponent>
        <MenuItemComponent onClick={toggleJobDetailsModal}>
          View Job Details
        </MenuItemComponent>
      </Menu>

      {/* Applicant View Modal */}
      {selectedApplicant && (
        <ApplicantViewModal
          applicant={selectedApplicant}
          open={modalOpen}
          onClose={() => {
            setModalOpen(false)
            setSelectedApplicant(null)
          }}
        />
      )}

      {/* Recommendations Modal */}
      <RecommendationsModal
        open={recommendationsModalOpen}
        onClose={() => setRecommendationsModalOpen(false)}
        recommendedApplicants={recommendedApplicants}
        jobTitle={job?.title || "Unknown Job"}
      />

      {/* Job Details Modal */}
      {job && (
        <JobDetailsModal
          open={jobDetailsModalOpen}
          close={toggleJobDetailsModal}
          job={job}
        />
      )}
    </Box>
  )
}