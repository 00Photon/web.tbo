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
      <Grid container spacing={3}>
        {[
          { bg: "#E5FCF5", color: "#008A5D", icon: "ion:briefcase-outline", title: "Total Jobs Listed", value: 1892 },
          { bg: "#F9E5FF", color: "#7A0099", icon: "pepicons-print:file", title: "Total Views on Job Posts", value: 1245 },
          { bg: "#E6EBFF", color: "#001A80", icon: "solar:calendar-line-duotone", title: "Top Performing Job Posts", value: 42 },
          { bg: "#FFF4E5", color: "#C77600", icon: "mdi:account-check-outline", title: "Hired Candidate", value: 32 },
          { bg: "#E5E5FF", color: "#001A80", icon: "mdi:timer-outline", title: "Average Time to Hire", value: "14 Days" },
          { bg: "#E5E5FF", color: "#001A22", icon: "mdi:timer-outline", title: "Average Time to Hire", value: "14 Days" }
        ].map((stat :any, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ p: 1.5, background: stat.bg, color: stat.color }}>
              <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Icon icon={stat.icon} fontSize="2rem" color={stat.color} />
                  <Typography variant="body2" sx={{ fontWeight: "600" }}>{stat.title}</Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>{formatNumber(stat.value)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </CardContent>
  </Paper>
  
  );
};

export default InfoHeader;
