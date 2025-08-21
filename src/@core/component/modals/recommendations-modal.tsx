"use client"

import { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Avatar,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Alert,
} from "@mui/material"
import { Close as CloseIcon, ThumbUp as ThumbUpIcon } from "@mui/icons-material"

// Define ApplicantData interface locally to match page.tsx
interface ApplicantData {
  id: string
  name: string
  email: string
  jobTitle: string
  applicationDate: string
  type: string
  status: string
  phone?: string
  experience?: string // Match page.tsx, where it's a string
  location?: string
  resume?: string
  account_type?: string
  company_logo?: string | null
  company_name?: string | null
  company_email_address?: string | null
  industry?: string | null
  number_of_employees?: string | null
  type_of_employer?: string | null
  company_address?: string | null
  company_phone_number?: string | null
  country?: string | null
  company_website?: string | null
  contact_person?: string | null
  work_email?: string | null
  position_in_company?: string | null
  phone_number?: string | null
  cv_upload?: string | null
  cover_letter_upload?: string | null
  id_upload?: string | null
  video_url?: string | null
  project_screenshots?: string[] | null
  work_sample_upload?: string | null
  portfolio_link?: string | null
  profile_image?: string | null
  designation?: string | null
  email_verified_at?: string | null
  otp?: string | null
  otp_expires_at?: string | null
  is_verified?: number
  created_at?: string
  updated_at?: string
  deleted_at?: string | null
  status_user?: string
  reset_token?: string | null
}

interface RecommendationsModalProps {
  open: boolean
  onClose: () => void
  recommendedApplicants: ApplicantData[]
  jobTitle: string
}

export function RecommendationsModal({ open, onClose, recommendedApplicants, jobTitle }: RecommendationsModalProps) {
  const [interestedApplicants, setInterestedApplicants] = useState<Set<string>>(new Set())
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [lastInterestedName, setLastInterestedName] = useState("")

  const handleInterested = (applicant: ApplicantData) => {
    setInterestedApplicants((prev) => new Set(prev).add(applicant.id))
    setLastInterestedName(applicant.name.split(" ")[0]) // Get first name
    setShowSuccessMessage(true)

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 3000)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getDesignation = (applicant: ApplicantData) => {
    // Parse experience as a number, default to 0 if undefined or invalid
    const experience = applicant.experience ? parseInt(applicant.experience, 10) : 0
    if (isNaN(experience)) return `Junior ${applicant.jobTitle}` // Fallback if parsing fails
    if (experience >= 7) return `Senior ${applicant.jobTitle}`
    if (experience >= 4) return applicant.jobTitle
    return `Junior ${applicant.jobTitle}`
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Box>
          <Typography variant="h6">AI Recommendations</Typography>
          <Typography variant="body2" color="text.secondary">
            {recommendedApplicants.length} candidates recommended for {jobTitle}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {showSuccessMessage && (
          <Alert severity="success" sx={{ mb: 3 }} onClose={() => setShowSuccessMessage(false)}>
            Your interest in {lastInterestedName} has been received! TBO team will contact you shortly.
          </Alert>
        )}

        <Grid container spacing={3}>
          {recommendedApplicants.map((applicant) => {
            const firstName = applicant.name.split(" ")[0]
            const isInterested = interestedApplicants.has(applicant.id)

            return (
              <Grid item xs={12} sm={6} md={4} key={applicant.id}>
                <Card
                  sx={{
                    height: "100%",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 3,
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: "center", p: 3 }}>
                    <Avatar
                      sx={{
                        width: 64,
                        height: 64,
                        mx: "auto",
                        mb: 2,
                        bgcolor: "primary.main",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      {getInitials(applicant.name)}
                    </Avatar>

                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                      {firstName}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {getDesignation(applicant)}
                    </Typography>

                    <Typography variant="caption" color="text.secondary" sx={{ mb: 3, display: "block" }}>
                      {applicant.experience || "Unknown"} years experience • {applicant.location || "Unknown"}
                    </Typography>

                    <Button
                      variant={isInterested ? "outlined" : "contained"}
                      startIcon={<ThumbUpIcon />}
                      onClick={() => handleInterested(applicant)}
                      disabled={isInterested}
                      fullWidth
                      sx={{
                        ...(isInterested && {
                          color: "success.main",
                          borderColor: "success.main",
                        }),
                      }}
                    >
                      {isInterested ? "Interest Sent" : "I'm Interested"}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>

        {recommendedApplicants.length === 0 && (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No recommendations available for this position yet.
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  )
}