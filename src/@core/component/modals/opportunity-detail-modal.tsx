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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import {
  Close as CloseIcon,
  Work as WorkIcon,
  LocationOn as LocationIcon,
  AttachMoney as SalaryIcon,
  CalendarToday as CalendarIcon,
  Business as BusinessIcon,
  Group as GroupIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Bookmark as BookmarkIcon,
} from "@mui/icons-material"
import type { OpportunityData } from "@/data/opportunity-data"

interface OpportunityDetailModalProps {
  opportunity: OpportunityData | null
  open: boolean
  onClose: () => void
}

export function OpportunityDetailModal({ opportunity, open, onClose }: OpportunityDetailModalProps) {
  if (!opportunity) return null

  const requirements = [
    "Bachelor's degree in Computer Science or related field",
    `3+ years of experience in ${opportunity.department.toLowerCase()} development`,
    "Strong problem-solving and analytical skills",
    "Excellent communication and teamwork abilities",
    "Experience with modern development tools and practices",
  ]

  const responsibilities = [
    "Develop and maintain high-quality software solutions",
    "Collaborate with cross-functional teams to deliver projects",
    "Participate in code reviews and technical discussions",
    "Contribute to system architecture and design decisions",
    "Mentor junior team members and share knowledge",
  ]

  const benefits = [
    "Competitive salary and performance bonuses",
    "Comprehensive health insurance coverage",
    "Flexible working hours and remote work options",
    "Professional development and training opportunities",
    "Modern office environment with latest technology",
  ]

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Job Details
          </Typography>
          <Button onClick={onClose} sx={{ minWidth: "auto", p: 1 }}>
            <CloseIcon />
          </Button>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 3 }}>
          {/* Header Section */}
          <Card sx={{ mb: 3, bgcolor: "#FEF2F2" }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
                <Avatar src={opportunity.companyLogo} sx={{ width: 80, height: 80 }}>
                  {opportunity.companyName[0]}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, color: "#E61C31" }}>
                    {opportunity.title}
                  </Typography>

                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <WorkIcon sx={{ fontSize: 20, color: "#E61C31" }} />
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Job Type
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {opportunity.jobType}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <LocationIcon sx={{ fontSize: 20, color: "#E61C31" }} />
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Location
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {opportunity.location}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <SalaryIcon sx={{ fontSize: 20, color: "#E61C31" }} />
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Salary
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {opportunity.currency} {opportunity.salaryRange}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CalendarIcon sx={{ fontSize: 20, color: "#E61C31" }} />
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Posted
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {opportunity.postedDate}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>

                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <GroupIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                      <Typography variant="body2" color="text.secondary">
                        {opportunity.applicationsCount} Applied
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <ScheduleIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                      <Typography variant="body2" color="text.secondary">
                        {opportunity.daysLeft} Days Left
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#E61C31" }}>
                Job Description
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7, color: "text.secondary" }}>
                {opportunity.description}
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7, color: "text.secondary", mt: 2 }}>
                We are looking for a talented professional to join our growing team. This role offers excellent
                opportunities for career growth and the chance to work on exciting projects with cutting-edge
                technologies. You'll be part of a collaborative environment where innovation and creativity are valued.
              </Typography>
            </CardContent>
          </Card>

          {/* Skills Required */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#E61C31" }}>
                Skills Required
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {opportunity.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    variant="outlined"
                    sx={{
                      borderColor: "#E61C31",
                      color: "#E61C31",
                      "&:hover": {
                        bgcolor: "#FEF2F2",
                      },
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* Requirements, Responsibilities, Benefits */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#E61C31" }}>
                    Requirements
                  </Typography>
                  <List dense>
                    {requirements.map((requirement, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <CheckCircleIcon sx={{ fontSize: 16, color: "#10B981" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={requirement}
                          primaryTypographyProps={{
                            variant: "body2",
                            color: "text.secondary",
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#E61C31" }}>
                    Responsibilities
                  </Typography>
                  <List dense>
                    {responsibilities.map((responsibility, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <CheckCircleIcon sx={{ fontSize: 16, color: "#3B82F6" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={responsibility}
                          primaryTypographyProps={{
                            variant: "body2",
                            color: "text.secondary",
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#E61C31" }}>
                    Benefits
                  </Typography>
                  <List dense>
                    {benefits.map((benefit, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <CheckCircleIcon sx={{ fontSize: 16, color: "#F59E0B" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={benefit}
                          primaryTypographyProps={{
                            variant: "body2",
                            color: "text.secondary",
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Company Information */}
          <Card sx={{ mt: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#E61C31" }}>
                About the Role
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <BusinessIcon sx={{ color: "#E61C31" }} />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {opportunity.department} Department
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Professional Development Opportunity
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                We are a forward-thinking company committed to innovation and excellence. Our team is passionate about
                creating solutions that make a difference. We believe in fostering a collaborative work environment
                where every team member can thrive and contribute to our shared success.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
          <Button
            variant="outlined"
            startIcon={<BookmarkIcon />}
            sx={{
              flex: 1,
              color: "#E61C31",
              borderColor: "#E61C31",
              "&:hover": {
                borderColor: "#E61C31",
                bgcolor: "#FEF2F2",
              },
            }}
          >
            Save Job
          </Button>
          <Button
            variant="contained"
            sx={{
              flex: 1,
              bgcolor: "#E61C31",
              "&:hover": {
                bgcolor: "#DC2626",
              },
            }}
          >
            Apply Now
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  )
}
