"use client"

import type React from "react"

import { useState, useMemo } from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  Description as AllIcon,
  Send as AppliedIcon,
  Mail as InvitedIcon,
  Recommend as RecommendedIcon,
  Search as SearchIcon,
  MoreHoriz as MoreHorizIcon,
} from "@mui/icons-material"
import { StatsCard } from "@/@core/component/common/stats-card"
import { CustomPagination } from "@/@core/component/common/custom-pagination"
import  { usePagination }  from "@/@core/component/hooks/use-pagination"
import { ApplicationViewModal, ApplicationActionModal } from "@/@core/component/modals/application-action-modals"
import { applicationData } from "@/@core/component/data/application-data"
import type { ApplicationData } from "@/@core/component/data/application-data"

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selectedApplication, setSelectedApplication] = useState<ApplicationData | null>(null)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [actionModalOpen, setActionModalOpen] = useState(false)
  const [actionModalData, setActionModalData] = useState<{
    title: string
    message: string
    confirmText: string
    confirmColor: "primary" | "success" | "error"
    action: string
  } | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedApplicationIndex, setSelectedApplicationIndex] = useState<number | null>(null)

  const tabs = ["All", "Applied", "Invited", "Recommended"]
  const statusFilters = ["All", "Pending", "Shortlisted", "Interviewed", "Hired"]

  // Calculate stats
  const stats = [
    {
      title: "All",
      value: applicationData.length.toString(),
      icon: AllIcon,
      color: "#3B82F6",
      bgcolor: "#EFF6FF",
    },
    {
      title: "Applied",
      value: applicationData.filter((a) => a.category === "Applied").length.toString(),
      icon: AppliedIcon,
      color: "#10B981",
      bgcolor: "#ECFDF5",
    },
    {
      title: "Invited",
      value: applicationData.filter((a) => a.category === "Invited").length.toString(),
      icon: InvitedIcon,
      color: "#F59E0B",
      bgcolor: "#FFFBEB",
    },
    {
      title: "Recommended",
      value: applicationData.filter((a) => a.category === "Recommended").length.toString(),
      icon: RecommendedIcon,
      color: "#8B5CF6",
      bgcolor: "#F3E8FF",
    },
  ]

  const filteredApplications = useMemo(() => {
    return applicationData.filter((application) => {
      const matchesTab = activeTab === 0 || application.category === tabs[activeTab]
      const matchesSearch =
        application.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        application.roleAppliedFor.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "All" || application.status === statusFilter

      return matchesTab && matchesSearch && matchesStatus
    })
  }, [activeTab, searchQuery, statusFilter, tabs])

  const { currentPage, totalPages, paginatedData, handlePrevious, handleNext } = usePagination({
    data: filteredApplications,
    itemsPerPage: 10,
  })

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget)
    setSelectedApplicationIndex(index)
    setSelectedApplication(paginatedData[index])
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedApplicationIndex(null)
  }

  const handleViewApplication = () => {
    setViewModalOpen(true)
    handleMenuClose()
  }

  const handleAcceptApplication = () => {
    setActionModalData({
      title: "Accept Application",
      message: "Are you sure you want to accept this application? This will move it to the next stage.",
      confirmText: "Accept",
      confirmColor: "success",
      action: "accept",
    })
    setActionModalOpen(true)
    handleMenuClose()
  }

  const handleRejectApplication = () => {
    setActionModalData({
      title: "Reject Application",
      message: "Are you sure you want to reject this application? This action cannot be undone.",
      confirmText: "Reject",
      confirmColor: "error",
      action: "reject",
    })
    setActionModalOpen(true)
    handleMenuClose()
  }

  const handleCancelApplication = () => {
    setActionModalData({
      title: "Cancel Application",
      message: "Are you sure you want to cancel this application?",
      confirmText: "Cancel Application",
      confirmColor: "error",
      action: "cancel",
    })
    setActionModalOpen(true)
    handleMenuClose()
  }

  const handleConfirmAction = () => {
    if (selectedApplication && actionModalData) {
      console.log(`${actionModalData.action} application:`, selectedApplication.id)
      // Here you would update the application status
    }
    setActionModalOpen(false)
    setActionModalData(null)
    setSelectedApplication(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hired":
        return { bgcolor: "#ECFDF5", color: "#065F46" }
      case "Interviewed":
        return { bgcolor: "#F0F9FF", color: "#0C4A6E" }
      case "Shortlisted":
        return { bgcolor: "#FFFBEB", color: "#92400E" }
      case "Pending":
        return { bgcolor: "#F3F4F6", color: "#374151" }
      default:
        return { bgcolor: "#F3F4F6", color: "#374151" }
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Direct Application":
        return { bgcolor: "#EFF6FF", color: "#1E40AF" }
      case "Recommendation":
        return { bgcolor: "#ECFDF5", color: "#065F46" }
      case "Interest":
        return { bgcolor: "#FEF3C7", color: "#92400E" }
      default:
        return { bgcolor: "#F3F4F6", color: "#374151" }
    }
  }

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" sx={{ mb: 1 }}>
          My Applications
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track and manage your job applications
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4, width: "100%" }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index} sx={{ display: "flex" }}>
            <Box sx={{ width: "100%" }}>
              <StatsCard {...stat} />
            </Box>
          </Grid>
        ))}
      </Grid>

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
              <Typography variant="h3">Applications</Typography>
              <Typography variant="body2" color="text.secondary">
                {filteredApplications.length}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1, justifyContent: "center" }}>
              <TextField
                placeholder="Search by company or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                sx={{ width: { xs: "100%", md: 400 } }}
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
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Filter by Status</InputLabel>
                <Select value={statusFilter} label="Filter by Status" onChange={(e) => setStatusFilter(e.target.value)}>
                  {statusFilters.map((filter) => (
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
                  <TableCell>Company Name</TableCell>
                  <TableCell>Role Applied For</TableCell>
                  <TableCell>Date of Application</TableCell>
                  <TableCell>Application Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((application, index) => (
                  <TableRow key={application.id} hover>
                    <TableCell sx={{ fontWeight: 500 }}>{application.companyName}</TableCell>
                    <TableCell>{application.roleAppliedFor}</TableCell>
                    <TableCell>{application.dateOfApplication}</TableCell>
                    <TableCell>
                      <Chip
                        label={application.applicationType}
                        size="small"
                        sx={getTypeColor(application.applicationType)}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip label={application.status} size="small" sx={getStatusColor(application.status)} />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" onClick={(e) => handleMenuClick(e, index)}>
                        <MoreHorizIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredApplications.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            itemName="applications"
          />
        </CardContent>
      </Card>

      {/* Action Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItemComponent onClick={handleViewApplication}>View</MenuItemComponent>
        <MenuItemComponent onClick={handleAcceptApplication} sx={{ color: "success.main" }}>
          Accept
        </MenuItemComponent>
        <MenuItemComponent onClick={handleRejectApplication} sx={{ color: "error.main" }}>
          Reject
        </MenuItemComponent>
        <MenuItemComponent onClick={handleCancelApplication} sx={{ color: "error.main" }}>
          Cancel
        </MenuItemComponent>
      </Menu>

      {/* Modals */}
      {selectedApplication && (
        <>
          <ApplicationViewModal
            application={selectedApplication}
            open={viewModalOpen}
            onClose={() => {
              setViewModalOpen(false)
              setSelectedApplication(null)
            }}
          />

          {actionModalData && (
            <ApplicationActionModal
              open={actionModalOpen}
              onClose={() => {
                setActionModalOpen(false)
                setActionModalData(null)
                setSelectedApplication(null)
              }}
              onConfirm={handleConfirmAction}
              title={actionModalData.title}
              message={actionModalData.message}
              confirmText={actionModalData.confirmText}
              confirmColor={actionModalData.confirmColor}
              application={selectedApplication}
            />
          )}
        </>
      )}
    </Box>
  )
}
