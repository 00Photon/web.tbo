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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import {
  Business as BusinessIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
  CalendarToday as CalendarIcon,
  Close as CloseIcon,
  Send as SendIcon,
} from "@mui/icons-material"
import type { RequestData } from "@/data/request-data"
import { useState } from "react"

interface RequestViewModalProps {
  request: RequestData
  open: boolean
  onClose: () => void
}

export function RequestViewModal({ request, open, onClose }: RequestViewModalProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hired":
        return { bgcolor: "#ECFDF5", color: "#065F46" }
      case "Processing":
        return { bgcolor: "#EFF6FF", color: "#1E40AF" }
      case "Cancelled":
        return { bgcolor: "#FEF2F2", color: "#991B1B" }
      default:
        return { bgcolor: "#F3F4F6", color: "#374151" }
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Request Details</span>
          <Button onClick={onClose} sx={{ minWidth: "auto", p: 1 }}>
            <CloseIcon />
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          {/* Header */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              {request.jobTitle}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Typography variant="body1" color="text.secondary">
                {request.companyName} → {request.talentName}
              </Typography>
              <Chip label={request.status} size="small" sx={getStatusColor(request.status)} />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <CalendarIcon sx={{ fontSize: 16, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                Requested on {request.requestDate}
              </Typography>
            </Box>
          </Box>

          {/* Company and Talent Info */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <BusinessIcon sx={{ color: "primary.main" }} />
                    <Typography variant="subtitle2">Company Information</Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {request.companyName}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <EmailIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                      <Typography variant="body2">{request.companyEmail}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PhoneIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                      <Typography variant="body2">{request.companyPhone}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <PersonIcon sx={{ color: "primary.main" }} />
                    <Typography variant="subtitle2">Talent Information</Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {request.talentName}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <EmailIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                      <Typography variant="body2">{request.talentEmail}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PhoneIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                      <Typography variant="body2">{request.talentPhone}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Request Details */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <WorkIcon sx={{ color: "primary.main" }} />
                <Typography variant="subtitle2">Request Details</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Request Type
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {request.requestType}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Job Title
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {request.jobTitle}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardContent>
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Notes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {request.notes}
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

interface ContactModalProps {
  open: boolean
  onClose: () => void
  title: string
  contactName: string
  contactEmail: string
  contactPhone: string
}

export function ContactModal({ open, onClose, title, contactName, contactEmail, contactPhone }: ContactModalProps) {
  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    // Here you would implement the actual message sending logic
    console.log("Sending message to:", contactName)
    console.log("Message:", message)

    // Reset form and close modal
    setMessage("")
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Send a message to {contactName}:
          </Typography>

          {/* Contact Information */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EmailIcon sx={{ color: "text.secondary" }} />
              <Typography variant="body2">{contactEmail}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIcon sx={{ color: "text.secondary" }} />
              <Typography variant="body2">{contactPhone}</Typography>
            </Box>
          </Box>

          {/* Message Input */}
          <TextField
            label="Message"
            fullWidth
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            variant="outlined"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSendMessage} disabled={!message.trim()} startIcon={<SendIcon />}>
          Send Message
        </Button>
      </DialogActions>
    </Dialog>
  )
}

interface ScheduleInterviewModalProps {
  open: boolean
  onClose: () => void
  request: RequestData
}

export function ScheduleInterviewModal({ open, onClose, request }: ScheduleInterviewModalProps) {
  const [formData, setFormData] = useState({
    selectedJob: "",
    selectedCandidate: "",
    interviewerName: "",
    department: "",
    emailAddress: "",
    phoneNumber: "",
    interviewDate: "",
    interviewTime: "",
    duration: "",
    interviewFormat: "",
    tboRepName: "",
    tboEmail: "",
    tboPhone: "",
    additionalInfo: "",
  })

  const jobs = [
    { id: "JOB001", title: "Senior Software Engineer" },
    { id: "JOB002", title: "UX Designer" },
    { id: "JOB003", title: "Data Scientist" },
    { id: "JOB004", title: "Product Manager" },
  ]

  const candidates = [
    { id: "CAND001", name: "Sarah Johnson" },
    { id: "CAND002", name: "Michael Chen" },
    { id: "CAND003", name: "Emily Rodriguez" },
    { id: "CAND004", name: "David Kim" },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Schedule Interview</DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Schedule an interview for {request.talentName} with {request.companyName}
          </Typography>

          <Grid container spacing={3}>
            {/* Row 1 */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Select Job</InputLabel>
                <Select
                  value={formData.selectedJob}
                  label="Select Job"
                  onChange={(e) => handleInputChange("selectedJob", e.target.value)}
                >
                  {jobs.map((job) => (
                    <MenuItem key={job.id} value={job.id}>
                      {job.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Select Candidate</InputLabel>
                <Select
                  value={formData.selectedCandidate}
                  label="Select Candidate"
                  onChange={(e) => handleInputChange("selectedCandidate", e.target.value)}
                >
                  {candidates.map((candidate) => (
                    <MenuItem key={candidate.id} value={candidate.id}>
                      {candidate.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Row 2 */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Interviewer Name"
                fullWidth
                value={formData.interviewerName}
                onChange={(e) => handleInputChange("interviewerName", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Department"
                fullWidth
                value={formData.department}
                onChange={(e) => handleInputChange("department", e.target.value)}
              />
            </Grid>

            {/* Row 3 */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                value={formData.emailAddress}
                onChange={(e) => handleInputChange("emailAddress", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Phone Number"
                fullWidth
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              />
            </Grid>

            {/* Row 4 */}
            <Grid item xs={12} md={4}>
              <TextField
                label="Interview Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.interviewDate}
                onChange={(e) => handleInputChange("interviewDate", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Interview Time"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.interviewTime}
                onChange={(e) => handleInputChange("interviewTime", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Duration</InputLabel>
                <Select
                  value={formData.duration}
                  label="Duration"
                  onChange={(e) => handleInputChange("duration", e.target.value)}
                >
                  <MenuItem value="30">30 minutes</MenuItem>
                  <MenuItem value="45">45 minutes</MenuItem>
                  <MenuItem value="60">1 hour</MenuItem>
                  <MenuItem value="90">1.5 hours</MenuItem>
                  <MenuItem value="120">2 hours</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Row 5 */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Interview Format</InputLabel>
                <Select
                  value={formData.interviewFormat}
                  label="Interview Format"
                  onChange={(e) => handleInputChange("interviewFormat", e.target.value)}
                >
                  <MenuItem value="video">Video Call</MenuItem>
                  <MenuItem value="phone">Phone Call</MenuItem>
                  <MenuItem value="in-person">In Person</MenuItem>
                  <MenuItem value="hybrid">Hybrid</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* TBO Representative Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 2, mt: 2, color: "primary.main" }}>
                TBO Representative Details
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="TBO Representative Name"
                fullWidth
                value={formData.tboRepName}
                onChange={(e) => handleInputChange("tboRepName", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="TBO Email Address"
                type="email"
                fullWidth
                value={formData.tboEmail}
                onChange={(e) => handleInputChange("tboEmail", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="TBO Phone Number"
                fullWidth
                value={formData.tboPhone}
                onChange={(e) => handleInputChange("tboPhone", e.target.value)}
              />
            </Grid>

            {/* Additional Information */}
            <Grid item xs={12}>
              <TextField
                label="Additional Information (Optional)"
                fullWidth
                multiline
                rows={3}
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                placeholder="Any additional notes or requirements for the interview..."
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained">Schedule Interview</Button>
      </DialogActions>
    </Dialog>
  )
}

interface CancelRequestModalProps {
  open: boolean
  onClose: () => void
  request: RequestData
  onConfirm: () => void
}

export function CancelRequestModal({ open, onClose, request, onConfirm }: CancelRequestModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Cancel Request</DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Are you sure you want to cancel the request for {request.talentName} at {request.companyName}?
          </Typography>
          <TextField
            label="Cancellation Reason"
            fullWidth
            multiline
            rows={3}
            placeholder="Please provide a reason for cancellation..."
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Keep Request</Button>
        <Button variant="contained" color="error" onClick={onConfirm}>
          Cancel Request
        </Button>
      </DialogActions>
    </Dialog>
  )
}
