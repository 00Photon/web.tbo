// *React Imports
import React from "react";

// *MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

interface Applications {
  title: string;
  reviewed: number;
  shortlisted: number;
  rejected: number;
}

interface ApplicationRowProps {
  data: Applications;
}

const data: Applications[] = [
  { title: "UI/UX Design", reviewed: 16, shortlisted: 10, rejected: 6 },
  { title: "Backend Developer", reviewed: 10, shortlisted: 4, rejected: 6 },
  { title: "Product Manager", reviewed: 5, shortlisted: 2, rejected: 3 },
];

const ApplicationRows: React.FC<ApplicationRowProps> = ({ data }) => {
  return (
    <Box>
      <Typography sx={{ mb: 1, mt: 3, ml: 2, fontWeight: "bold" }}>
        {data.title}
      </Typography>
      <Box
        sx={{
          borderRadius: 3,
          p: 3,
          mb: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
          // width: "100%",
          background: (theme) => theme.palette.primary.light,
        }}
      >
        <Stack sx={{ width: "90%" }}>
          <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
            {data.reviewed}
          </Typography>
          <Typography
            sx={{
              color: (theme) => theme.palette.secondary.dark,
              textAlign: "center",
            }}
          >
            Reviewed
          </Typography>
        </Stack>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Stack sx={{ width: "90%" }}>
          <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
            {data.shortlisted}
          </Typography>
          <Typography
            sx={{
              color: (theme) => theme.palette.secondary.dark,
              textAlign: "center",
            }}
          >
            Reviewed
          </Typography>
        </Stack>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Stack sx={{ width: "90%" }}>
          <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
            {data.rejected}
          </Typography>
          <Typography
            sx={{
              color: (theme) => theme.palette.secondary.dark,
              textAlign: "center",
            }}
          >
            Reviewed
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

const Applications: React.FC = () => {
  return (
    <Box
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        p: 3,
        width: "100%",
        minWidth: "40%",
        mt: { xs: 4, md: 0 },
        background: "#fff",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontSize: "1.25rem", fontWeight: "bold" }}
          >
            Applications
          </Typography>
          <Button
            variant="text"
            size="medium"
            sx={{ textTransform: "capitalize" }}
          >
            View all
          </Button>
        </Box>
        <Grid container spacing={2} sx={{ mx: "auto", width: "100%" }}>
          {data.map((item, i) => {
            return (
              <Grid key={i} xs={12}>
                <ApplicationRows data={item} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default Applications;
