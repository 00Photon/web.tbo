"use client"

import { useState } from "react"
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
} from "@mui/material"
import {
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Description as DescriptionIcon,
  Close as CloseIcon,
} from "@mui/icons-material"
import { InterestReceivedModal } from "./interest-received-modal"
import type { ApplicantData } from "@/data/applicant-data"

interface ApplicantViewModalProps {
  applicant: ApplicantData
  open: boolean
  onClose: () => void
}

export function ApplicantViewModal({ applicant, open, onClose }: ApplicantViewModalProps) {
  const [interestModalOpen, setInterestModalOpen] = useState(false)

  const handleActionClick = () => {
    if (applicant.type === "Recommended") {
      setInterestModalOpen(true)
      setTimeout(() => {
        setInterestModalOpen(false)
        onClose()
      }, 3000)
    } else {
      // Handle regular shortlist action
      console.log("Shortlisted:", applicant.name)
      onClose()
    }
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

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Applicant Profile</span>
            <Button onClick={onClose} sx={{ minWidth: "auto", p: 1 }}>
              <CloseIcon />
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2 }}>
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 3 }}>
              <Avatar sx={{ width: 64, height: 64 }}>
                {applicant.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {applicant.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  Applied for {applicant.jobTitle}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <LocationIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2" color="text.secondary">
                      {applicant.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <CalendarIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2" color="text.secondary">
                      {applicant.experience} years experience
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                  <Chip label={applicant.type} size="small" sx={getTypeColor(applicant.type)} />
                  <Chip label={applicant.status} size="small" sx={getStatusColor(applicant.status)} />
                </Box>
              </Box>
            </Box>

            {/* Contact Information (Blurred out) */}
            <Card sx={{ bgcolor: "#F9FAFB", mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                  Contact Information
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <EmailIcon sx={{ fontSize: 16, color: "text.disabled" }} />
                    <Typography variant="body2" sx={{ filter: "blur(2px)", color: "text.disabled" }}>
                      ████████@email.com
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PhoneIcon sx={{ fontSize: 16, color: "text.disabled" }} />
                    <Typography variant="body2" sx={{ filter: "blur(2px)", color: "text.disabled" }}>
                      +1 (███) ███-████
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                    Contact information available after shortlisting
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Application Details */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Application Date
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {applicant.applicationDate}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Job Title
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {applicant.jobTitle}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Resume Section */}
            <Card>
              <CardContent>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  Resume/CV
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <DescriptionIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                  <Typography variant="body2" color="primary" sx={{ cursor: "pointer" }}>
                    {applicant.resume}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
          <Button variant="contained" onClick={handleActionClick}>
            {applicant.type === "Recommended" ? "I am interested" : "Shortlist"}
          </Button>
        </DialogActions>
      </Dialog>

      <InterestReceivedModal open={interestModalOpen} applicantName={applicant.name} />
    </>
  )
}
