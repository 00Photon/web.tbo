// * React Imports
import React from "react";

// * Icon Import
import Icon from "@/@core/component/icon";

// * Utility Imports
import StyledImage from "@/@core/component/mui/image";
import { formatNumber } from "@/@core/utils/format";

//* Image Imports
import Green from "../../../components/assets/green.png";
import Purple from "../../../components/assets/purple.png";
import Blue from "../../../components/assets/blue.png";

// * MUI Imports
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
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

const InfoHeader: React.FC = () => {
  return (
    <Paper sx={{ boxShadow: "3", borderRadius: 3, pb: 2 }}>
      <CardHeader title="Statistic Overview" />
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 2, background: "#E5FCF5", color: "#008A5D" }}>
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
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
                    <Icon
                      icon="ion:briefcase-outline"
                      fontSize="2.85rem"
                      color="#008A5D"
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "14px", fontWeight: "600" }}
                  >
                    Total Openings
                  </Typography>
                </Box>

                <IconButton>
                  <Icon
                    icon="tabler:dots-vertical"
                    fontSize="1.5rem"
                    color="#008A5D"
                  />
                </IconButton>
              </CardContent>

              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                  alignItems: "flex-end",
                }}
              >
                <Stack>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, fontFamily: "sans-serif" }}
                  >
                    {formatNumber(1892)}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <Icon
                      icon="gravity-ui:carets-expand-vertical"
                      fontSize="1.5rem"
                    />
                    <Typography
                      sx={{
                        color: "#4CEDB9",
                        fontSize: "13px",
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <SupText>-O.5%</SupText> from last week
                    </Typography>
                  </Box>
                </Stack>
                <Icon icon="ph:chart-bar-fill" fontSize="4rem" />
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 2, background: "#F9E5FF", color: "#7A0099" }}>
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
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
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "14px", fontWeight: "600" }}
                  >
                    Applications
                  </Typography>
                </Box>

                <IconButton>
                  <Icon
                    icon="tabler:dots-vertical"
                    fontSize="1.5rem"
                    color="#7A0099"
                  />
                </IconButton>
              </CardContent>

              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                  alignItems: "flex-end",
                }}
              >
                <Stack>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, fontFamily: "sans-serif" }}
                  >
                    {formatNumber(1245)}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <Icon
                      icon="gravity-ui:carets-expand-vertical"
                      fontSize="1.5rem"
                    />
                    <Typography
                      sx={{
                        color: "#E57FFF",
                        fontSize: "13px",
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <SupText color="#7A0099">+1.0%</SupText> from last week
                    </Typography>
                  </Box>
                </Stack>
                <Icon icon="ph:chart-bar-fill" fontSize="4rem" />
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 2, background: "#E6EBFF", color: "#001A80" }}>
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ position: "relative", width: 50, height: 50 }}>
                    <StyledImage
                      src={Blue.src}
                      alt="icon adornment"
                      sx={{
                        position: "absolute",
                        left: "-.7rem",
                        top: "-.3rem",
                      }}
                    />
                    <Icon
                      icon="solar:calendar-line-duotone"
                      fontSize="2.85rem"
                      color="#001A80"
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "14px", fontWeight: "600" }}
                  >
                    Shortlisted
                  </Typography>
                </Box>

                <IconButton>
                  <Icon
                    icon="tabler:dots-vertical"
                    fontSize="1.5rem"
                    color="#001A80"
                  />
                </IconButton>
              </CardContent>

              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                  alignItems: "flex-end",
                }}
              >
                <Stack>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 600, fontFamily: "sans-serif" }}
                  >
                    {formatNumber(42)}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <Icon
                      icon="gravity-ui:carets-expand-vertical"
                      fontSize="1.5rem"
                    />
                    <Typography
                      sx={{
                        color: "#1A47FF",
                        fontSize: "13px",
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <SupText color="#001A80">-O.5%</SupText> from last week
                    </Typography>
                  </Box>
                </Stack>
                <Icon icon="ph:chart-bar-fill" fontSize="4rem" />
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Paper>
  );
};

export default InfoHeader;
