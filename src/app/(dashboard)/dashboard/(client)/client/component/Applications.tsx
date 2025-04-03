// *React Imports
import React from "react";

// *MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

interface Application {
  title: string;
  reviewed: number;
  shortlisted: number;
  rejected: number;
}

interface ApplicationRowProps {
  data: Application;
}

const data: Application[] = [
  { title: "UI/UX Design", reviewed: 16, shortlisted: 10, rejected: 6 },
  { title: "Backend Developer", reviewed: 10, shortlisted: 4, rejected: 6 },
  { title: "Product Manager", reviewed: 5, shortlisted: 2, rejected: 3 },
];

const ApplicationRow: React.FC<ApplicationRowProps> = ({ data }) => {
  return (
    <Box>
      <Typography sx={{ mb: 1.5, fontWeight: 600, color: 'text.primary' }}>
        {data.title}
      </Typography>
      <Card
        elevation={0}
        sx={{
          borderRadius: 2,
          p: 2,
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: '#fff'
        }}
      >
        <Stack sx={{ flex: 1 }}>
          <Typography sx={{ textAlign: "center", fontWeight: 700, fontSize: '1.25rem' }}>
            {data.reviewed}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              textAlign: "center",
              fontWeight: 500,
              mt: 0.5
            }}
          >
            Reviewed
          </Typography>
        </Stack>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Stack sx={{ flex: 1 }}>
          <Typography sx={{ textAlign: "center", fontWeight: 700, fontSize: '1.25rem', color: '#1976d2' }}>
            {data.shortlisted}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              textAlign: "center",
              fontWeight: 500,
              mt: 0.5
            }}
          >
            Shortlisted
          </Typography>
        </Stack>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Stack sx={{ flex: 1 }}>
          <Typography sx={{ textAlign: "center", fontWeight: 700, fontSize: '1.25rem', color: '#d32f2f' }}>
            {data.rejected}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              textAlign: "center",
              fontWeight: 500,
              mt: 0.5
            }}
          >
            Rejected
          </Typography>
        </Stack>
      </Card>
    </Box>
  );
};

const Applications: React.FC = () => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        width: "100%",
        maxWidth: '960px',
        mx: 'auto',
        mt: { xs: 4, md: 0 },
        overflow: 'hidden'
      }}
    >
      <CardHeader
        title={
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Applications
          </Typography>
        }
        action={
          <Button
            variant="text"
            size="small"
            sx={{ textTransform: "capitalize", fontWeight: 500 }}
          >
            View all
          </Button>
        }
        sx={{ 
          borderBottom: '1px solid', 
          borderColor: 'divider',
          px: 3,
          py: 2
        }}
      />
      <CardContent sx={{ p: 3 }}>
        {data.map((item, i) => (
          <ApplicationRow key={i} data={item} />
        ))}
      </CardContent>
    </Card>
  );
};

export default Applications;