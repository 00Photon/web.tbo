// * React Imports
import React from "react";

// * Icon Import
import Icon from "@/@core/component/icon";

// * Utility Imports
import StyledImage from "@/@core/component/mui/image";
import { formatNumber } from "@/@core/utils/format";

// * MUI Imports
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";

// Types
interface StatCardProps {
  bg: string;
  color: string;
  icon: string;
  title: string;
  value: number | string;
}

interface SupTextProps {
  color?: string;
}

const SupText = styled("span")<SupTextProps>(({ color }) => ({
  display: "flex",
  alignItems: "center",
  fontWeight: "bold",
  color: color || "#008A5D",
}));

const StatCard: React.FC<StatCardProps> = ({ bg, color, icon, title, value }) => (
  <Card 
    elevation={0}
    sx={{ 
      p: 2, 
      backgroundColor: bg, 
      color: color,
      borderRadius: 2,
      height: '100%',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: 3
      }
    }}
  >
    <CardContent sx={{ 
      display: "flex", 
      flexDirection: "column",
      height: '100%',
      p: 1,
      '&:last-child': {
        pb: 1
      }
    }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <Icon icon={icon} fontSize="1.75rem" color={color} />
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mt: 'auto' }}>
        {typeof value === 'number' ? formatNumber(value) : value}
      </Typography>
    </CardContent>
  </Card>
);

const StatsOverview: React.FC = () => {
  const stats: StatCardProps[] = [
    { bg: "#E5FCF5", color: "#008A5D", icon: "ion:briefcase-outline", title: "Total Jobs Listed", value: 1892 },
    { bg: "#F9E5FF", color: "#7A0099", icon: "pepicons-print:file", title: "Total Views on Job Posts", value: 1245 },
    { bg: "#E6EBFF", color: "#001A80", icon: "solar:calendar-line-duotone", title: "Top Performing Job Posts", value: 42 },
    { bg: "#FFF4E5", color: "#C77600", icon: "mdi:account-check-outline", title: "Hired Candidates", value: 32 },
    { bg: "#E5F6FF", color: "#0066B2", icon: "mdi:timer-outline", title: "Average Time to Hire", value: "14 Days" },
    { bg: "#F5F5F5", color: "#444444", icon: "mdi:chart-timeline-variant", title: "Application Rate", value: "68%" }
  ];

  return (
    <Paper sx={{ boxShadow: 2, borderRadius: 3, overflow: 'hidden' }}>
      <CardHeader 
        title={
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Statistics Overview
          </Typography>
        }
        sx={{ 
          borderBottom: '1px solid', 
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          px: 3,
          py: 2
        }}
      />
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StatCard {...stat} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Paper>
  );
};

export default StatsOverview;