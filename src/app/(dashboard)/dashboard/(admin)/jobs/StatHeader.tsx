// * React Imports
import React from "react";

// * Icon Import
import Icon from "@/@core/component/icon";

// * Utility Imports
import StyledImage from "@/@core/component/mui/image";
import { formatNumber } from "@/@core/utils/format";

//* Image Imports
import Green from "../../components/assets/green.png";
import Purple from "../../components/assets/purple.png";
import Brown from "../../components/assets/brown.png";
import Red from "../../components/assets/red.png";

// * MUI Imports
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";

interface SupTextProps {
  color?: string;
}

const SupText = styled("span")<SupTextProps>(({ color }) => ({
  display: "flex",
  alignItems: "center",
  fontWeight: "bold",
  color: color || "#008A5D",
}));

const StatHeader: React.FC = () => {
  return (
    <Paper sx={{ boxShadow: "3", borderRadius: 3 }}>
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                p: 2,
                background: "#E5FCF5",
                color: "#008A5D",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Stack spacing={2}>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "14px", fontWeight: "600" }}
                  >
                    Total openings
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, fontFamily: "sans-serif" }}
                  >
                    {formatNumber(1850)}
                  </Typography>
                </Stack>

                <Box sx={{ position: "relative", width: 50, height: 50 }}>
                  <StyledImage
                    src={Green.src}
                    alt="icon adornment"
                    sx={{
                      position: "absolute",
                      left: "-.7rem",
                      top: "-.3rem",
                    }}
                  />
                  <Icon icon="circum:user" fontSize="2.85rem" color="#008A5D" />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                p: 2,
                background: "#F9E5FF",
                color: "#7A0099",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Stack spacing={2}>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "14px", fontWeight: "600" }}
                  >
                    Applications
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, fontFamily: "sans-serif" }}
                  >
                    {formatNumber(1254)}
                  </Typography>
                </Stack>

                <Box sx={{ position: "relative", width: 50, height: 50 }}>
                  <StyledImage
                    src={Purple.src}
                    alt="icon adornment"
                    sx={{
                      position: "absolute",
                      left: "-.7rem",
                      top: "-.3rem",
                    }}
                  />
                  <Icon
                    icon="pepicons-print:file"
                    fontSize="2.85rem"
                    color="#7A0099"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                p: 2,
                background: "#FFF9E5",
                color: "#997A00",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Stack spacing={2}>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "14px", fontWeight: "600" }}
                  >
                    Companies
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, fontFamily: "sans-serif" }}
                  >
                    {formatNumber(690)}
                  </Typography>
                </Stack>

                <Box sx={{ position: "relative", width: 50, height: 50 }}>
                  <StyledImage
                    src={Brown.src}
                    alt="icon adornment"
                    sx={{
                      position: "absolute",
                      left: "-.7rem",
                      top: "-.3rem",
                    }}
                  />
                  <Icon
                    icon="ph:building-office-duotone"
                    fontSize="2.85rem"
                    color="#997A00"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                p: 2,
                background: "#FFF0F1",
                color: "#C01729",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Stack spacing={2}>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "14px", fontWeight: "600" }}
                  >
                    Active Jobs
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, fontFamily: "sans-serif" }}
                  >
                    {formatNumber(320)}
                  </Typography>
                </Stack>

                <Box sx={{ position: "relative", width: 50, height: 50 }}>
                  <StyledImage
                    src={Red.src}
                    alt="icon adornment"
                    sx={{
                      position: "absolute",
                      left: "-.7rem",
                      top: "-.3rem",
                    }}
                  />
                  <Icon
                    icon="ion:briefcase-outline"
                    fontSize="2.85rem"
                    color="#C01729"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Paper>
  );
};

export default StatHeader;
