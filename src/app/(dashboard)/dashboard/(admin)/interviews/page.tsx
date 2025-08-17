"use client"

import { useState, useMemo, useRef } from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material"
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Refresh as RefreshIcon,
  Edit as EditIcon,
} from "@mui/icons-material"
import { interviewData } from "@/@core/component/data/interview-data"

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const dayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

export default function InterviewsPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 24)) 
  const [selectedDate, setSelectedDate] = useState("2025-07-24")
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Filter interviews by selected date
  const filteredInterviews = useMemo(() => {
    return interviewData.filter((interview) => interview.interviewDate === selectedDate)
  }, [selectedDate])

  // Calculate pagination
  const totalInterviews = interviewData.length
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = Math.min(startIndex + rowsPerPage, totalInterviews)

  // Generate calendar days for horizontal carousel (show 3 months worth of days)
  const generateCarouselDays = () => {
    const days = []
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)

    // Generate 90 days (approximately 3 months)
    for (let i = 0; i < 90; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)

      const dayOfWeek = (date.getDay() + 6) % 7 // Convert Sunday=0 to Monday=0
      const dayName = dayNames[dayOfWeek]

      days.push({
        date: date,
        day: date.getDate(),
        dayName: dayName,
        dateString: date.toISOString().split("T")[0],
        isCurrentMonth: date.getMonth() === currentDate.getMonth(),
      })
    }

    return days
  }

  const handleDateClick = (dateString: string) => {
    setSelectedDate(dateString)
  }

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    setCurrentDate(newDate)

    // Scroll the container left
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const handleNextMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    setCurrentDate(newDate)

    // Scroll the container right
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return { bgcolor: "#ECFDF5", color: "#065F46" }
      case "Scheduled":
        return { bgcolor: "#EFF6FF", color: "#1E40AF" }
      case "In Progress":
        return { bgcolor: "#FFFBEB", color: "#92400E" }
      case "Cancelled":
        return { bgcolor: "#FEF2F2", color: "#991B1B" }
      default:
        return { bgcolor: "#F3F4F6", color: "#374151" }
    }
  }

  const carouselDays = generateCarouselDays()

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" sx={{ mb: 1 }}>
          Interview Calendar
        </Typography>
      </Box>

      {/* Calendar Carousel Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          {/* Calendar Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton onClick={handlePrevMonth} sx={{ color: "#E61C31" }}>
                <ChevronLeftIcon />
              </IconButton>
              <IconButton onClick={handleNextMonth} sx={{ color: "#E61C31" }}>
                <ChevronRightIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Horizontal Calendar Carousel */}
          <Box
            ref={scrollContainerRef}
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: 2,
              pb: 2,
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": {
                height: 6,
              },
              "&::-webkit-scrollbar-track": {
                background: "#f1f1f1",
                borderRadius: 3,
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#c1c1c1",
                borderRadius: 3,
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#a8a8a8",
              },
            }}
          >
            {carouselDays.map((dayInfo, index) => {
              const isSelected = dayInfo.dateString === selectedDate
              const hasInterview = interviewData.some((interview) => interview.interviewDate === dayInfo.dateString)

              return (
                <Box
                  key={index}
                  onClick={() => handleDateClick(dayInfo.dateString)}
                  sx={{
                    minWidth: 80,
                    height: 100,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    borderRadius: 3,
                    border: isSelected ? "2px solid #E61C31" : "1px solid #E5E7EB",
                    bgcolor: hasInterview ? "#FEF2F2" : "white",
                    opacity: dayInfo.isCurrentMonth ? 1 : 0.6,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: isSelected ? "#FEF2F2" : "#F9FAFB",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 500,
                      color: "text.secondary",
                      mb: 0.5,
                    }}
                  >
                    {dayInfo.dayName}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: isSelected ? 700 : 500,
                      color: isSelected ? "#E61C31" : "text.primary",
                      fontSize: "1.25rem",
                    }}
                  >
                    {dayInfo.day}
                  </Typography>
                  {hasInterview && (
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: "#E61C31",
                        mt: 0.5,
                      }}
                    />
                  )}
                </Box>
              )
            })}
          </Box>
        </CardContent>
      </Card>

      {/* Interviews Section */}
      <Card>
        <CardContent sx={{ p: 4 }}>
          {/* Interviews Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: "#E61C31" }}>
              Interviews
            </Typography>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              sx={{
                color: "#E61C31",
                borderColor: "#E61C31",
                "&:hover": {
                  borderColor: "#E61C31",
                  bgcolor: "#FEF2F2",
                },
              }}
            >
              Refresh
            </Button>
          </Box>

          {/* Interviews Table */}
          <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #E5E7EB" }}>
            <Table>
              <TableHead sx={{ bgcolor: "#FEF2F2" }}>
                <TableRow>
                  <TableCell sx={{ color: "#E61C31", fontWeight: 600 }}>Job</TableCell>
                  <TableCell sx={{ color: "#E61C31", fontWeight: 600 }}>Candidate</TableCell>
                  <TableCell sx={{ color: "#E61C31", fontWeight: 600 }}>Interview Date</TableCell>
                  <TableCell sx={{ color: "#E61C31", fontWeight: 600 }}>Time</TableCell>
                  <TableCell sx={{ color: "#E61C31", fontWeight: 600 }}>Location</TableCell>
                  <TableCell sx={{ color: "#E61C31", fontWeight: 600 }}>Interviewer</TableCell>
                  <TableCell sx={{ color: "#E61C31", fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ color: "#E61C31", fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredInterviews.length > 0 ? (
                  filteredInterviews.map((interview) => (
                    <TableRow key={interview.id} hover>
                      <TableCell sx={{ fontWeight: 500 }}>{interview.jobTitle}</TableCell>
                      <TableCell>{interview.candidateName}</TableCell>
                      <TableCell>{interview.interviewDate}</TableCell>
                      <TableCell>{interview.time}</TableCell>
                      <TableCell>{interview.location}</TableCell>
                      <TableCell>{interview.interviewer}</TableCell>
                      <TableCell>
                        <Chip label={interview.status} size="small" sx={getStatusColor(interview.status)} />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" sx={{ color: "#E61C31" }}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} sx={{ textAlign: "center", py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        No interviews scheduled for {selectedDate}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="body2">Rows per page:</Typography>
              <FormControl size="small" sx={{ minWidth: 80 }}>
                <Select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {startIndex + 1}-{endIndex} of {totalInterviews}
              </Typography>
              <IconButton size="small" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                size="small"
                disabled={endIndex >= totalInterviews}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ChevronRightIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
