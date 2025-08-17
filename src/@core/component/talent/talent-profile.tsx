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
  Favorite as FavoriteIcon,
  Close as CloseIcon,
} from "@mui/icons-material"
import { InterestModal, NewJobMessageModal } from "@/@core/component/modals/interest-modal"
import { JobSelectionModal } from "@/@core/component/modals/job-selection-modal"
import { SuccessModal } from "@/@core/component/modals/success-modal"
import type { TalentData } from "./talent-table"

interface JobData {
  id: string
  title: string
  department: string
}

interface TalentProfileProps {
  talent: TalentData
  open: boolean
  onClose: () => void
  onInterested: () => void
  onNotInterested: () => void
  jobs: JobData[]
}

export function TalentProfile({ talent, open, onClose, onInterested, onNotInterested, jobs }: TalentProfileProps) {
  const [interestModalOpen, setInterestModalOpen] = useState(false)
  const [newJobMessageModalOpen, setNewJobMessageModalOpen] = useState(false)
  const [jobSelectionModalOpen, setJobSelectionModalOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState("")
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleInterestedClick = () => {
    setInterestModalOpen(true)
  }

  const handleNewJobClick = () => {
    setInterestModalOpen(false)
    setNewJobMessageModalOpen(true)
  }

  const handleExistingJobClick = () => {
    setInterestModalOpen(false)
    setJobSelectionModalOpen(true)
  }

  const handleJobSelectionContinue = () => {
    if (selectedJob) {
      setJobSelectionModalOpen(false)
      setShowSuccessMessage(true)
      setTimeout(() => {
        setShowSuccessMessage(false)
        onInterested()
      }, 3000)
    }
  }

  const handleCloseAll = () => {
    setInterestModalOpen(false)
    setNewJobMessageModalOpen(false)
    setJobSelectionModalOpen(false)
    setSelectedJob("")
    setShowSuccessMessage(false)
    onClose()
  }

  // ... rest of the component remains the same until the modals section

  return (
    <>
      {/* Main Dialog - keep existing content */}
      <Dialog open={open} onClose={handleCloseAll} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Talent Profile</span>
            <Button onClick={handleCloseAll} sx={{ minWidth: "auto", p: 1 }}>
              <CloseIcon />
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ py: 2 }}>
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 3 }}>
              <Avatar sx={{ width: 64, height: 64 }}>
                {talent.firstName[0]}
                {talent.lastName[0]}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {talent.firstName}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  {talent.designation}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <LocationIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2" color="text.secondary">
                      {talent.location.split(", ")[1] || talent.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <CalendarIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2" color="text.secondary">
                      {talent.experience} years experience
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={talent.status}
                  color={talent.status === "Open to work" ? "success" : "default"}
                  size="small"
                />
              </Box>
            </Box>

            {/* Contact Information (Grayed out) */}
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
                    Contact information available after expressing interest
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Professional Summary */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  Professional Summary
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {talent.summary}
                </Typography>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                  Skills
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {talent.skills.map((skill, index) => (
                    <Chip key={index} label={skill} variant="outlined" size="small" />
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Experience & Education */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Current Company
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {talent.currentCompany}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Education
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {talent.education}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* CV Section (Grayed out) */}
            <Card sx={{ bgcolor: "#F9FAFB" }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                  Resume/CV
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <DescriptionIcon sx={{ fontSize: 16, color: "text.disabled" }} />
                  <Typography variant="body2" sx={{ filter: "blur(2px)", color: "text.disabled" }}>
                    ████████_Resume.pdf
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                  Full resume available after expressing interest
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button variant="contained" startIcon={<FavoriteIcon />} onClick={handleInterestedClick} sx={{ flex: 1 }}>
            Interested
          </Button>
          <Button variant="outlined" startIcon={<CloseIcon />} onClick={onNotInterested} sx={{ flex: 1 }}>
            Not Interested
          </Button>
        </DialogActions>
      </Dialog>

      <InterestModal
        open={interestModalOpen}
        onClose={() => setInterestModalOpen(false)}
        onNewJob={handleNewJobClick}
        onExistingJob={handleExistingJobClick}
        talentName={talent.firstName}
      />

      <NewJobMessageModal
        open={newJobMessageModalOpen}
        onClose={() => {
          setNewJobMessageModalOpen(false)
          handleCloseAll()
        }}
        talentName={talent.firstName}
      />

      <JobSelectionModal
        open={jobSelectionModalOpen}
        onClose={() => setJobSelectionModalOpen(false)}
        onContinue={handleJobSelectionContinue}
        selectedJob={selectedJob}
        onJobChange={setSelectedJob}
        jobs={jobs}
        talentName={talent.firstName}
      />

      <SuccessModal open={showSuccessMessage} talentName={talent.firstName} />
    </>
  )
}
