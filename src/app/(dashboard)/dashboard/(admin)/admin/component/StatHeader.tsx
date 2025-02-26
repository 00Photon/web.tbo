import React, { useEffect, useState } from "react";
import Icon from "@/@core/component/icon";
import StyledImage from "@/@core/component/mui/image";
import { formatNumber } from "@/@core/utils/format";
import Green from "../../../components/assets/green.png";
import Purple from "../../../components/assets/purple.png";
import Brown from "../../../components/assets/brown.png";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { getAdminStats   } from "@/@core/services/stats"; 

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
  const [stats, setStats] = useState({
    total_users: 0,
    total_applications: 0,
    total_interviews: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
         const response = await getAdminStats();  
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Paper sx={{ boxShadow: "3", borderRadius: 3, pb: 2 }}>
      <CardHeader title="Statistic Overview" />
      <CardContent>
        <Grid container spacing={4}>
          {/* Total Users */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 2, background: "#E5FCF5", color: "#008A5D" }}>
              <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ position: "relative", width: 50, height: 50 }}>
                    <StyledImage src={Green.src} alt="icon" sx={{ position: "absolute", left: "-.7rem", top: "-.3rem" }} />
                    <Icon icon="circum:user" fontSize="2.85rem" color="#008A5D" />
                  </Box>
                  <Typography variant="h6" sx={{ fontSize: "14px", fontWeight: "500" }}>Total users</Typography>
                </Box>
                <Icon icon="tabler:dots-vertical" fontSize="1.5rem" color="#008A5D" />
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <Stack>
                  <Typography variant="h5" sx={{ fontWeight: 600, fontFamily: "sans-serif" }}>
                    {formatNumber(stats.total_users)}
                  </Typography>
                </Stack>
                <Icon icon="ph:chart-bar-fill" fontSize="4rem" />
              </CardActions>
            </Card>
          </Grid>

          {/* Applications */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 2, background: "#F9E5FF", color: "#7A0099" }}>
              <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ position: "relative", width: 50, height: 50 }}>
                    <StyledImage src={Purple.src} alt="icon" sx={{ position: "absolute", left: "-.7rem", top: "-.3rem" }} />
                    <Icon icon="pepicons-print:file" fontSize="2.85rem" color="#7A0099" />
                  </Box>
                  <Typography variant="h6" sx={{ fontSize: "14px", fontWeight: "500" }}>Applications</Typography>
                </Box>
                <Icon icon="tabler:dots-vertical" fontSize="1.5rem" color="#7A0099" />
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <Stack>
                  <Typography variant="h5" sx={{ fontWeight: 600, fontFamily: "sans-serif" }}>
                    {formatNumber(stats.total_applications)}
                  </Typography>
                </Stack>
                <Icon icon="ph:chart-bar-fill" fontSize="4rem" />
              </CardActions>
            </Card>
          </Grid>

          {/* Interviews */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 2, background: "#FFF9E5", color: "#997A00" }}>
              <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ position: "relative", width: 50, height: 50 }}>
                    <StyledImage src={Brown.src} alt="icon" sx={{ position: "absolute", left: "-.7rem", top: "-.3rem" }} />
                    <Icon icon="solar:calendar-line-duotone" fontSize="2.85rem" color="#997A00" />
                  </Box>
                  <Typography variant="h6" sx={{ fontSize: "14px", fontWeight: "500" }}>Interviews</Typography>
                </Box>
                <Icon icon="tabler:dots-vertical" fontSize="1.5rem" color="#997A00" />
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <Stack>
                  <Typography variant="h5" sx={{ fontWeight: 600, fontFamily: "sans-serif" }}>
                    {formatNumber(stats.total_interviews)}
                  </Typography>
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

export default StatHeader;
