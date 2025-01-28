"use client";
import { TextOnlyPill } from "@/@core/utils/pills";
import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { BarChart } from "@mui/x-charts/BarChart";
import { Suspense } from "react";

export default function TalentHome() {
  return (
    <main>
      <Stack gap={3}>
        <Stack flexGrow={1} gap={1}>
          <Typography
            sx={{ fontWeight: 600, color: "#39353D", fontSize: "20px" }}
          >
            <Suspense fallback={"Hello..."}>Dashboard</Suspense>
          </Typography>
          <Typography sx={{ fontSize: "13px" }}>
            View summary of analytics happenings on your job profile
          </Typography>
        </Stack>
        <Box
          sx={{
            height: "212px",
            backgroundImage: "url('/dashboard_banner_with_text.png')",
            backgroundSize: "100% 100%",
            backgroundColor: "#FFF8F8",
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #E4E5E8",
            borderRadius: "8px",
          }}
        ></Box>
        <Grid columnSpacing={2} rowSpacing={2} container>
          {[
            { title: "Job Posted" },
            { title: "Saved Jobs" },
            { title: "Jobs Applied" },
            { title: "Interviews" },
          ].map((card, index) => (
            <Grid key={index} xs={12} md={3} item>
              <Box
                sx={{
                  border: "1px solid #E4E5E8",
                  borderRadius: "8px",
                  backgroundColor: "#FFFFFF",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Image
                      src="/icons/chart_rounded.svg"
                      alt="Chart Icon"
                      width={32}
                      height={32}
                    />
                  </Box>
                  <Box>Last 30 days</Box>
                </Box>
                <Box>
                  <Box>{card.title}</Box>
                  <Stack
                    gap={2}
                    direction={"row"}
                    sx={{ alignItems: "center" }}
                  >
                    <Box>450</Box>
                    <Box>
                      <TextOnlyPill variant="success" text="15%" />
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Grid columnSpacing={3} rowSpacing={3} container>
          <Grid xs={12} lg={8} item>
            <Box
              sx={{
                border: "1px solid #E4E5E8",
                borderRadius: "8px",
                backgroundColor: "#FFFFFF",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Stack gap={3}>
                <Stack direction={"row"} alignItems={"center"}>
                  <Box sx={{ flexGrow: 1 }}>Job Applications Report</Box>
                  <Box>
                    <Box
                      sx={{
                        border: "1px solid black",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        py: "5px",
                        px: "10px",
                        gap: 2,
                      }}
                    >
                      <Box>20/10/2023 - 14/05/2024</Box>
                      <Image
                        src={"/icons/calendar.svg"}
                        width={20}
                        height={20}
                        alt={"Calendar"}
                      />
                    </Box>
                  </Box>
                </Stack>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {["Job Posted", "Job Applied"].map((item, index) => (
                      <Box key={index}>
                        <TextOnlyPill text={item} />
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Stack>
              <BarChart
                sx={{ mt: "-20px" }}
                xAxis={[
                  {
                    scaleType: "band",
                    data: [
                      "Mon",
                      "Tues",
                      "Wed",
                      "Thurs",
                      "Fri",
                      "Sat",
                      "Sun",
                      "Mon",
                      "Tues",
                      "Wed",
                      "Thurs",
                      "Fri",
                    ],
                  },
                ]}
                series={[
                  { data: [4, 3, 5, 4, 3, 5, 4, 3, 5, 4, 3, 5, 4, 3, 5] },
                  { data: [1, 6, 3, 4, 3, 5, 4, 3, 5, 4, 3, 5, 4, 3, 5] },
                  { data: [2, 5, 6, 4, 3, 5, 4, 3, 5, 4, 3, 5, 4, 3, 5] },
                ]}
                height={220}
              />
            </Box>
          </Grid>
          <Grid xs={12} lg={4} item>
            <Box
              sx={{
                border: "1px solid #E4E5E8",
                borderRadius: "8px",
                backgroundColor: "#FFFFFF",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                gap: 3,
              }}
            >
              <Box>Upcoming Interviews</Box>
              <Divider />
              <Box>Friday, 6 July</Box>
              <Stack gap={2} direction={"row"} alignItems={"center"}>
                <Image
                  src={"/icons/clock.svg"}
                  width={20}
                  height={20}
                  alt="Clock Icon"
                />
                <Box>11:30 - 12:00 {"(30 mins)"}</Box>
              </Stack>
              <Stack gap={2} direction={"row"} alignItems={"center"}>
                <Image
                  src={"/icons/calendar.svg"}
                  width={20}
                  height={20}
                  alt="Calendar Icon"
                />
                <Box>Zoom Meeting Link</Box>
              </Stack>
              <Stack gap={2} direction={"row"} alignItems={"center"}>
                <Image
                  src={"/icons/google.png"}
                  width={30}
                  height={30}
                  alt="Clock Icon"
                />
                <Stack>
                  <Box>Google</Box>
                  <Box>Information Technology Support</Box>
                </Stack>
              </Stack>
              <Divider />
              <Stack direction={"row"} alignItems={"center"} gap={3}>
                {[
                  { variant: "outlined", label: "Reschedule" },
                  { variant: "contained", label: "Attend Now" },
                ].map((button, index) => (
                  <Button
                    key={index}
                    variant={button.variant as "outlined" | "contained"}
                    sx={{
                      textTransform: "none",
                    }}
                  >
                    {button.label}
                  </Button>
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </main>
  );
}
