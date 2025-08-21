"use client"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  TextField,
} from "@mui/material"
import {
  Business as BusinessIcon,
  Work as WorkIcon,
  LocationOn as LocationIcon,
  AttachMoney as SalaryIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  Close as CloseIcon,
} from "@mui/icons-material"
import type { ApplicationData } from "@/@core/component/data/application-data"

interface ApplicationViewModalProps {
  application: ApplicationData
  open: boolean
  onClose: () => void
}

export function ApplicationViewModal({ application, open, onClose }: ApplicationViewModalProps) {
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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Application Details</span>
          <Button onClick={onClose} sx={{ minWidth: "auto", p: 1 }}>
            <CloseIcon />
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          {/* Header */}
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 3 }}>
            <Avatar sx={{ width: 64, height: 64 }} src={application.companyLogo}>
              {application.companyName[0]}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                {application.roleAppliedFor}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                {application.companyName}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <LocationIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                  <Typography variant="body2" color="text.secondary">
                    {application.location}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <CalendarIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                  <Typography variant="body2" color="text.secondary">
                    Applied on {application.dateOfApplication}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                <Chip label={application.status} size="small" sx={getStatusColor(application.status)} />
                <Chip label={application.applicationType} size="small" sx={getTypeColor(application.applicationType)} />
              </Box>
            </Box>
          </Box>

          {/* Job Details */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <WorkIcon sx={{ color: "primary.main" }} />
                <Typography variant="subtitle2">Job Details</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {application.jobDescription}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <SalaryIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {application.salary}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocationIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {application.location}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <BusinessIcon sx={{ color: "primary.main" }} />
                <Typography variant="subtitle2">Company Information</Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {application.companyName}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <EmailIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                  <Typography variant="body2">{application.companyEmail}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PhoneIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                  <Typography variant="body2">{application.companyPhone}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Application Notes */}
          <Card>
            <CardContent>
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Application Notes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {application.applicationNotes}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

interface ApplicationActionModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText: string
  confirmColor?: "primary" | "success" | "error"
  application: ApplicationData
}

export function ApplicationActionModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  confirmColor = "primary",
  application,
}: ApplicationActionModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {message}
          </Typography>
          <Box sx={{ p: 2, bgcolor: "grey.50", borderRadius: 1, mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {application.roleAppliedFor}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {application.companyName}
            </Typography>
          </Box>
          <TextField
            label="Additional Notes (Optional)"
            fullWidth
            multiline
            rows={3}
            placeholder="Add any additional comments..."
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color={confirmColor} onClick={onConfirm}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
