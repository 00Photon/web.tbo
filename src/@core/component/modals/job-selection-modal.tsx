"use client"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"

interface JobData {
  id: string
  title: string
  department: string
}

interface JobSelectionModalProps {
  open: boolean
  onClose: () => void
  onContinue: () => void
  selectedJob: string
  onJobChange: (jobId: string) => void
  jobs: JobData[]
  talentName: string
}

export function JobSelectionModal({
  open,
  onClose,
  onContinue,
  selectedJob,
  onJobChange,
  jobs,
  talentName,
}: JobSelectionModalProps) {
  // Debug logging
  console.log("JobSelectionModal - jobs:", jobs)
  console.log("JobSelectionModal - selectedJob:", selectedJob)

  const handleJobChange = (value: string) => {
    console.log("Job selected:", value)
    onJobChange(value)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Select Job</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Select the job you want to consider {talentName} for:
        </Typography>

        {/* Debug info */}
        <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: "block" }}>
          Available jobs: {jobs?.length || 0}
        </Typography>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Select Job</InputLabel>
          <Select value={selectedJob} label="Select Job" onChange={(e) => handleJobChange(e.target.value as string)}>
            {jobs && jobs.length > 0 ? (
              jobs.map((job) => (
                <MenuItem key={job.id} value={job.id}>
                  {job.title} - {job.department}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No jobs available</MenuItem>
            )}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onContinue} disabled={!selectedJob}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  )
}
