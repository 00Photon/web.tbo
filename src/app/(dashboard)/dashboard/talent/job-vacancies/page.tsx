"use client"

import { useState, useMemo } from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Chip,
  Avatar,
  Link,
  Pagination,
} from "@mui/material"
import {
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Work as WorkIcon,
  Group as GroupIcon,
  Schedule as ScheduleIcon,
  Bookmark as BookmarkIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material"
import { opportunityData } from "@/@core/component/data/opportunity-data"
import { OpportunityDetailModal } from "@/@core/component/modals/opportunity-detail-modal"
import type { OpportunityData } from "@/@core/component/data/opportunity-data"

export default function OpportunitiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [jobTypeFilters, setJobTypeFilters] = useState<string[]>([])
  const [locationFilters, setLocationFilters] = useState<string[]>([])
  const [selectedOpportunity, setSelectedOpportunity] = useState<OpportunityData | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const jobTypes = ["Full Time", "Part Time", "Contract", "Internship", "Freelance"]
  const locations = ["Hybrid", "Remote", "Onsite"]

  const filteredOpportunities = useMemo(() => {
    return opportunityData.filter((opportunity) => {
      const matchesSearch =
        opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opportunity.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opportunity.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesJobType = jobTypeFilters.length === 0 || jobTypeFilters.includes(opportunity.jobType)
      const matchesLocation = locationFilters.length === 0 || locationFilters.includes(opportunity.location)

      return matchesSearch && matchesJobType && matchesLocation
    })
  }, [searchQuery, jobTypeFilters, locationFilters])

  const pageCount = Math.ceil(filteredOpportunities.length / itemsPerPage)
  const paginatedOpportunities = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredOpportunities.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredOpportunities, currentPage])

  const handleJobTypeChange = (jobType: string, checked: boolean) => {
    if (checked) {
      setJobTypeFilters([...jobTypeFilters, jobType])
    } else {
      setJobTypeFilters(jobTypeFilters.filter((type) => type !== jobType))
    }
    setCurrentPage(1) // Reset to first page on filter change
  }

  const handleLocationChange = (location: string, checked: boolean) => {
    if (checked) {
      setLocationFilters([...locationFilters, location])
    } else {
      setLocationFilters(locationFilters.filter((loc) => loc !== location))
    }
    setCurrentPage(1) // Reset to first page on filter change
  }

  const handleReset = () => {
    setSearchQuery("")
    setJobTypeFilters([])
    setLocationFilters([])
    setCurrentPage(1) // Reset to first page on reset
  }

  const clearJobTypes = () => {
    setJobTypeFilters([])
    setCurrentPage(1) // Reset to first page
  }

  const clearLocations = () => {
    setLocationFilters([])
    setCurrentPage(1) // Reset to first page
  }

  const handleCardClick = (opportunity: OpportunityData) => {
    setSelectedOpportunity(opportunity)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedOpportunity(null)
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Find Your Dream Job
        </Typography>

        {/* Search Bar */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            placeholder="Job Title, Company name or Anything"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1) // Reset to first page on search
            }}
            fullWidth
            sx={{ maxWidth: 400 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleReset}
            sx={{
              color: "#E61C31",
              borderColor: "#E61C31",
              "&:hover": {
                borderColor: "#E61C31",
                bgcolor: "#FEF2F2",
              },
            }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#E61C31",
              "&:hover": {
                bgcolor: "#DC2626",
              },
            }}
          >
            Search
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ display: "flex", gap: 4 }}>
        {/* Filters Sidebar */}
        <Box sx={{ width: 280, flexShrink: 0 }}>
          {/* Job Type Filter */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Job Type
                </Typography>
                <Link
                  component="button"
                  variant="body2"
                  onClick={clearJobTypes}
                  sx={{
                    color: "#E61C31",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Clear
                </Link>
              </Box>
              <FormGroup>
                {jobTypes.map((jobType) => (
                  <FormControlLabel
                    key={jobType}
                    control={
                      <Checkbox
                        checked={jobTypeFilters.includes(jobType)}
                        onChange={(e) => handleJobTypeChange(jobType, e.target.checked)}
                        sx={{
                          color: "#E61C31",
                          "&.Mui-checked": {
                            color: "#E61C31",
                          },
                        }}
                      />
                    }
                    label={jobType}
                    sx={{ mb: 0.5 }}
                  />
                ))}
              </FormGroup>
            </CardContent>
          </Card>

          {/* Location Filter */}
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Location
                </Typography>
                <Link
                  component="button"
                  variant="body2"
                  onClick={clearLocations}
                  sx={{
                    color: "#E61C31",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Clear
                </Link>
              </Box>
              <FormGroup>
                {locations.map((location) => (
                  <FormControlLabel
                    key={location}
                    control={
                      <Checkbox
                        checked={locationFilters.includes(location)}
                        onChange={(e) => handleLocationChange(location, e.target.checked)}
                        sx={{
                          color: "#E61C31",
                          "&.Mui-checked": {
                            color: "#E61C31",
                          },
                        }}
                      />
                    }
                    label={location}
                    sx={{ mb: 0.5 }}
                  />
                ))}
              </FormGroup>
            </CardContent>
          </Card>
        </Box>

        {/* Job Cards - Using CSS Grid for exactly 2 cards per row */}
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, 1fr)",
              },
              gap: 3,
            }}
          >
            {paginatedOpportunities.map((opportunity) => (
              <Card
                key={opportunity.id}
                onClick={() => handleCardClick(opportunity)}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    transform: "translateY(-2px)",
                    transition: "all 0.2s ease",
                  },
                }}
              >
                <CardContent sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
                  {/* Header */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar src={opportunity.companyLogo} sx={{ width: 48, height: 48 }}>
                        {opportunity.companyName[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ color: "#E61C31" }}>
                          {opportunity.location}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {opportunity.postedDate}
                    </Typography>
                  </Box>

                  {/* Job Title */}
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    {opportunity.title}
                  </Typography>

                  {/* Job Details */}
                  <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <Chip
                      label={opportunity.jobType.toUpperCase()}
                      size="small"
                      sx={{
                        bgcolor: "#FEF2F2",
                        color: "#E61C31",
                        fontWeight: 500,
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Salary: {opportunity.currency} {opportunity.salaryRange}
                    </Typography>
                  </Box>

                  {/* Skills */}
                  <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                    Skill
                  </Typography>

                  {/* Description */}
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
                    {opportunity.description}
                  </Typography>

                  <Link
                    component="button"
                    variant="body2"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCardClick(opportunity)
                    }}
                    sx={{
                      color: "#E61C31",
                      textDecoration: "none",
                      alignSelf: "flex-start",
                      mb: 3,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    View More
                  </Link>

                  {/* Footer */}
                  <Box sx={{ mt: "auto" }}>
                    {/* Stats */}
                    <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <WorkIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          {opportunity.jobType.toUpperCase()}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <GroupIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          {opportunity.applicationsCount} Applied
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <ScheduleIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          {opportunity.daysLeft} Days Left
                        </Typography>
                      </Box>
                    </Box>

                    {/* Action Buttons */}
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button
                        variant="contained"
                        startIcon={<BookmarkIcon />}
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log("Save job:", opportunity.title)
                        }}
                        sx={{
                          bgcolor: "#E61C31",
                          "&:hover": {
                            bgcolor: "#DC2626",
                          },
                          flex: 1,
                        }}
                      >
                        Save Job
                      </Button>
                      <Button
                        variant="contained"
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log("Apply to:", opportunity.title)
                        }}
                        sx={{
                          bgcolor: "#E61C31",
                          "&:hover": {
                            bgcolor: "#DC2626",
                          },
                          flex: 1,
                        }}
                      >
                        Apply Now
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          {filteredOpportunities.length === 0 && (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                No opportunities found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your search criteria or filters
              </Typography>
            </Box>
          )}

          {filteredOpportunities.length > 0 && (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2, mt: 4 }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                sx={{
                  color: "#E61C31",
                  borderColor: "#E61C31",
                  "&:hover": {
                    borderColor: "#E61C31",
                    bgcolor: "#FEF2F2",
                  },
                  "&.Mui-disabled": {
                    color: "#B0B0B0",
                    borderColor: "#B0B0B0",
                  },
                }}
              >
                Previous
              </Button>
              <Pagination
                count={pageCount}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#E61C31",
                    "&.Mui-selected": {
                      bgcolor: "#E61C31",
                      color: "white",
                      "&:hover": {
                        bgcolor: "#DC2626",
                      },
                    },
                  },
                }}
              />
              <Button
                variant="outlined"
                endIcon={<ArrowForwardIcon />}
                onClick={handleNextPage}
                disabled={currentPage === pageCount}
                sx={{
                  color: "#E61C31",
                  borderColor: "#E61C31",
                  "&:hover": {
                    borderColor: "#E61C31",
                    bgcolor: "#FEF2F2",
                  },
                  "&.Mui-disabled": {
                    color: "#B0B0B0",
                    borderColor: "#B0B0B0",
                  },
                }}
              >
                Next
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {/* Opportunity Detail Modal */}
      <OpportunityDetailModal opportunity={selectedOpportunity} open={modalOpen} onClose={handleCloseModal} />
    </Box>
  )
}