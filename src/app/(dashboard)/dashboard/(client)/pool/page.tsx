"use client"

import { useState, useMemo } from "react"
import { Box, Typography, Card, CardContent, Button, Grid } from "@mui/material"
import { FilterList as FilterIcon } from "@mui/icons-material"
import { TalentTable } from "@/@core/component/talent/talent-table"
import { TalentProfile } from "@/@core/component/talent/talent-profile"
import { SearchBar } from "@/@core/component/common/search-bar"
import { CustomPagination } from "@/@core/component/common/custom-pagination"
import { StatsCard } from "@/@core/component/common/stats-card"
import { usePagination } from "@/@core/component/hooks/use-pagination"
import { talentData } from "@/@core/component/data/talent-data"
import { jobData } from "@/@core/component/data/job-data"
import type { TalentData } from "@/@core/component/talent/talent-table"
import {
  People as PeopleIcon,
  Favorite as FavoriteIcon,
  Visibility as VisibilityIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material"

export default function TalentPool() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTalent, setSelectedTalent] = useState<TalentData | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const filteredTalents = useMemo(
    () =>
      talentData.filter(
        (talent) =>
          talent.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          talent.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          talent.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
          talent.location.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery],
  )

  const { currentPage, totalPages, paginatedData, handlePrevious, handleNext } = usePagination({
    data: filteredTalents,
    itemsPerPage: 10,
  })

  const handleViewProfile = (talent: TalentData) => {
    setSelectedTalent(talent)
    setDialogOpen(true)
  }

  const handleInterested = () => {
    console.log("Interested in talent:", selectedTalent?.firstName)
    setDialogOpen(false)
    setSelectedTalent(null)
  }

  const handleNotInterested = () => {
    console.log("Not interested in talent:", selectedTalent?.firstName)
    setDialogOpen(false)
    setSelectedTalent(null)
  }

  // Calculate stats
  const stats = [
    {
      title: "Total Talents",
      value: talentData.length.toString(),
      icon: PeopleIcon,
      color: "#3B82F6",
      bgcolor: "#EFF6FF",
    },
    {
      title: "Open to Work",
      value: talentData.filter((t) => t.status === "Open to work").length.toString(),
      icon: FavoriteIcon,
      color: "#10B981",
      bgcolor: "#ECFDF5",
    },
    {
      title: "Passive",
      value: talentData.filter((t) => t.status === "Passive").length.toString(),
      icon: VisibilityIcon,
      color: "#F59E0B",
      bgcolor: "#FFFBEB",
    },
    {
      title: "Avg Experience",
      value: `${Math.round(talentData.reduce((acc, t) => acc + t.experience, 0) / talentData.length)}y`,
      icon: CalendarIcon,
      color: "#8B5CF6",
      bgcolor: "#F3E8FF",
    },
  ]

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" sx={{ mb: 1 }}>
          Talent Pool
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover and connect with talented professionals
        </Typography>
      </Box>

      {/* Stats Cards - Now inside the same Card structure as the table */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <StatsCard {...stat} />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Talent List */}
      <Card>
        <CardContent sx={{ p: 3 }}>
          {/* Search and Actions */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "stretch", sm: "center" },
              gap: 2,
              mb: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="h3">Available Talents</Typography>
              <Typography variant="body2" color="text.secondary">
                {filteredTalents.length}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <SearchBar placeholder="Search talents..." value={searchQuery} onChange={setSearchQuery} />
              <Button variant="outlined" startIcon={<FilterIcon />} size="small">
                Filter
              </Button>
            </Box>
          </Box>

          {/* Table */}
          <TalentTable talents={paginatedData} onViewProfile={handleViewProfile} />

          {/* Pagination */}
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredTalents.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            itemName="talents"
          />
        </CardContent>
      </Card>

      {/* Talent Profile Dialog */}
      {selectedTalent && (
        <TalentProfile
          talent={selectedTalent}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onInterested={handleInterested}
          onNotInterested={handleNotInterested}
          jobs={jobData}
        />
      )}
    </Box>
  )
}
