"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  Button,
  Box,
  Typography,
} from "@mui/material"
import { Visibility as VisibilityIcon } from "@mui/icons-material"

export interface TalentData {
  id: string
  firstName: string
  lastName: string
  designation: string
  location: string
  experience: number
  status: string
  avatar: string
  email: string
  phone: string
  summary: string
  skills: string[]
  education: string
  currentCompany: string
}

interface TalentTableProps {
  talents: TalentData[]
  onViewProfile: (talent: TalentData) => void
}

export function TalentTable({ talents, onViewProfile }: TalentTableProps) {
  return (
    <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #E5E7EB" }}>
      <Table>
        <TableHead sx={{ bgcolor: "#F9FAFB" }}>
          <TableRow>
            <TableCell>Talent Name</TableCell>
            <TableCell>Designation</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Experience</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {talents.map((talent) => (
            <TableRow key={talent.id} hover>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {talent.firstName[0]}
                    {talent.lastName[0]}
                  </Avatar>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {talent.firstName}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>{talent.designation}</TableCell>
              <TableCell>{talent.location}</TableCell>
              <TableCell>{talent.experience} years</TableCell>
              <TableCell>
                <Chip
                  label={talent.status}
                  color={talent.status === "Open to work" ? "success" : "default"}
                  size="small"
                  sx={{
                    bgcolor: talent.status === "Open to work" ? "#ECFDF5" : "#F3F4F6",
                    color: talent.status === "Open to work" ? "#065F46" : "#374151",
                  }}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<VisibilityIcon />}
                  onClick={() => onViewProfile(talent)}
                >
                  View Profile
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
