"use client";
import { TextOnlyPill } from "@/@core/utils/pills";
import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { Suspense } from "react";
import { useSession } from "next-auth/react";

export default function TalentHome() {
  const { data: session } = useSession();
  return (
    <main>
      <Stack gap={3} sx={{ px: 2, py: 4 }}>
        {/* HEADER */}
        <Stack flexGrow={1} gap={1}>
          <Typography sx={{ fontWeight: 700, color: "#39353D", fontSize: "24px" }}>
            <Suspense fallback={"Loading..."}>Dashboard</Suspense>
          </Typography>
        </Stack>

        {/* HERO SECTION */}
        <Grid
          container
          spacing={0}
          sx={{
            backgroundColor: "#fff",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: 3,
            minHeight: { xs: "auto", md: 350 },
          }}
        >
          {/* Left - Image */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src="/woman.jpg"
              alt="Find Work"
              sx={{
                width: "100%",
                height: { xs: 250, md: "100%" },
                objectFit: "cover",
                borderRadius: { xs: "8px 8px 0 0", md: "8px 0 0 8px" },
              }}
            />
          </Grid>

          {/* Right - Text & CTA */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              backgroundColor: "#730E19",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: { xs: "center", md: "flex-start" },
              padding: { xs: 3, md: 5 },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography variant="subtitle2" sx={{ textTransform: "uppercase", fontWeight: 600 }}>
              Welcome, {session?.user?.name}!
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
              Here’s a Quick Snapshot of Your Analytics
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, mb: 3, opacity: 0.9 }}>
            Level Up Your Career—Thousands of
            Opportunities Await!
            </Typography>
          </Grid>
        </Grid>

        {/* DASHBOARD CARDS */}
        <Grid container columnSpacing={2} rowSpacing={2}>
          {[
            { title: "Saved Jobs", value: 450, change: "15%" },
            { title: "Jobs Applied", value: 120, change: "10%" },
            { title: "Interviews", value: 5, change: "25%" },
          ].map((card, index) => (
            <Grid key={index} item xs={12} sm={4}>
              <Box
                sx={{
                  border: "1px solid #E4E5E8",
                  borderRadius: 3,
                  backgroundColor: "#FFFFFF",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 180,
                  textAlign: "center",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: 4,
                    transform: "scale(1.02)",
                  },
                }}
              >
                {/* Icon */}
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Image src="/icons/chart_rounded.svg" alt="Chart Icon" width={40} height={40} />
                </Box>

                {/* Title */}
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {card.title}
                </Typography>

                {/* Stats Section */}
                <Stack gap={1} direction="row" sx={{ alignItems: "center", mt: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {card.value}
                  </Typography>
                  <TextOnlyPill variant="success" text={card.change} />
                </Stack>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* UPCOMING INTERVIEWS */}
        <Grid container>
          <Grid xs={12} md={4} item>
            <Box
              sx={{
                border: "1px solid #E4E5E8",
                borderRadius: 3,
                backgroundColor: "#FFFFFF",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Upcoming Interviews</Typography>
              <Divider />
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Friday, 6 July</Typography>
              <Stack gap={2} direction="row" alignItems="center">
                <Image src="/icons/clock.svg" width={20} height={20} alt="Clock Icon" />
                <Typography>11:30 - 12:00 (30 mins)</Typography>
              </Stack>
              <Stack gap={2} direction="row" alignItems="center">
                <Image src="/icons/calendar.svg" width={20} height={20} alt="Calendar Icon" />
                <Typography sx={{ color: "#0073e6", cursor: "pointer", textDecoration: "underline" }}>
                  Zoom Meeting Link
                </Typography>
              </Stack>
              <Stack gap={2} direction="row" alignItems="center">
                <Image src="/icons/google.png" width={30} height={30} alt="Company Icon" />
                <Stack>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>Google</Typography>
                  <Typography variant="body2" sx={{ color: "gray" }}>IT Support</Typography>
                </Stack>
              </Stack>
              <Divider />
              <Stack direction="row" gap={2}>
                <Button variant="outlined" sx={{ textTransform: "none", flex: 1 }}>
                  Reschedule
                </Button>
                <Button variant="contained" sx={{ textTransform: "none", flex: 1 }}>
                  Attend Now
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </main>
  );
}
