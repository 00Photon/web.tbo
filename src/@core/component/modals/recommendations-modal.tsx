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
  Divider,
  Chip,
  Link,
} from "@mui/material"
import { Close as CloseIcon, ThumbUp as ThumbUpIcon } from "@mui/icons-material"

// Define ApplicantData interface locally to match page.tsx
interface ApplicantData {
  id: number
  name: string
  email: string
  jobTitle: string
  applicationDate: string
  type: string
  status: string
  phone?: string
  experience?: string
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
  years_experience?: number | null
  availability_status?: string | null
  professional_summary?: string | null
  skills?: string[]
  current_company?: string | null
  education?: string | null
}

interface RecommendationsModalProps {
  open: boolean
  onClose: () => void
  recommendedApplicants: ApplicantData[]
  jobTitle: string
}

export function RecommendationsModal({ open, onClose, recommendedApplicants, jobTitle }: RecommendationsModalProps) {
  const [interestedApplicants, setInterestedApplicants] = useState<Set<number>>(new Set())
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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
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
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ textAlign: "center", mb: 2 }}>
                      <Avatar
                        src={applicant.profile_image || undefined}
                        sx={{
                          width: 80,
                          height: 80,
                          mx: "auto",
                          mb: 2,
                          bgcolor: "primary.main",
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                        }}
                      >
                        {!applicant.profile_image && getInitials(applicant.name)}
                      </Avatar>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                        {applicant.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {applicant.designation || "N/A"}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>
                        {applicant.years_experience ? `${applicant.years_experience} years experience` : "Experience not specified"} • {applicant.location || "Location not specified"}
                      </Typography>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>Contact Information</Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Email:</strong> {applicant.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Phone:</strong> {applicant.phone_number || "N/A"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Location:</strong> {applicant.location || "N/A"}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>Professional Details</Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Current Company:</strong> {applicant.current_company || "N/A"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Professional Summary:</strong> {applicant.professional_summary || "Not provided"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Availability:</strong> {applicant.availability_status || "N/A"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Education:</strong> {applicant.education || "N/A"}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>Skills</Typography>
                      {applicant.skills && applicant.skills.length > 0 ? (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {applicant.skills.map((skill, index) => (
                            <Chip key={index} label={skill} size="small" />
                          ))}
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary">No skills listed</Typography>
                      )}
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>Portfolio & Documents</Typography>
                      {applicant.cv_upload && (
                        <Typography variant="body2" color="text.secondary">
                          <strong>Resume:</strong>{" "}
                          <Link href={applicant.cv_upload} target="_blank" rel="noopener">
                            View Resume
                          </Link>
                        </Typography>
                      )}
                      {applicant.cover_letter_upload && (
                        <Typography variant="body2" color="text.secondary">
                          <strong>Cover Letter:</strong>{" "}
                          <Link href={applicant.cover_letter_upload} target="_blank" rel="noopener">
                            View Cover Letter
                          </Link>
                        </Typography>
                      )}
                      {applicant.id_upload && (
                        <Typography variant="body2" color="text.secondary">
                          <strong>ID:</strong>{" "}
                          <Link href={applicant.id_upload} target="_blank" rel="noopener">
                            View ID
                          </Link>
                        </Typography>
                      )}
                      {applicant.video_url && (
                        <Typography variant="body2" color="text.secondary">
                          <strong>Video:</strong>{" "}
                          <Link href={applicant.video_url} target="_blank" rel="noopener">
                            View Video
                          </Link>
                        </Typography>
                      )}
                      {applicant.work_sample_upload && (
                        <Typography variant="body2" color="text.secondary">
                          <strong>Work Sample:</strong>{" "}
                          <Link href={applicant.work_sample_upload} target="_blank" rel="noopener">
                            View Work Sample
                          </Link>
                        </Typography>
                      )}
                      {applicant.portfolio_link && (
                        <Typography variant="body2" color="text.secondary">
                          <strong>Portfolio:</strong>{" "}
                          <Link href={applicant.portfolio_link} target="_blank" rel="noopener">
                            View Portfolio
                          </Link>
                        </Typography>
                      )}
                      {applicant.project_screenshots && applicant.project_screenshots.length > 0 && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Project Screenshots:</strong>
                          </Typography>
                          {applicant.project_screenshots.map((screenshot, index) => (
                            <Link key={index} href={screenshot} target="_blank" rel="noopener" sx={{ display: "block" }}>
                              Screenshot {index + 1}
                            </Link>
                          ))}
                        </Box>
                      )}
                    </Box>

                    <Button
                      variant={isInterested ? "outlined" : "contained"}
                      startIcon={<ThumbUpIcon />}
                      onClick={() => handleInterested(applicant)}
                      disabled={isInterested}
                      fullWidth
                      sx={{
                        mt: 2,
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