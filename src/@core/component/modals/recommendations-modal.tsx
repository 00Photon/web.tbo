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
import type { ApplicantData } from "@/data/applicant-data"

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
    // Generate designation based on experience
    if (applicant.experience >= 7) return "Senior " + applicant.jobTitle
    if (applicant.experience >= 4) return applicant.jobTitle
    return "Junior " + applicant.jobTitle
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
                      {applicant.experience} years experience • {applicant.location}
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
