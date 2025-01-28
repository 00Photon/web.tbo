"use client";
// ** React Imports
import React from "react";

// ** Icon Imports
import Icon from "@/@core/component/icon";

// ** MUI Imports
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Contact: React.FC = () => {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        width: "100%",
        maxWidth: "1200px",
        mx: "auto",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "1rem", sm: "1.5rem" },
          fontWeight: 400,
          textTransform: "capitalize",
          my: 2,
          textAlign: "center",
          color: (theme) => theme.palette.primary.main,
        }}
      >
        Need Any Assistance
      </Typography>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontSize: {
            xs: "1.25rem",
            sm: "1.75rem",
            md: "1.75rem",
          },
        }}
      >
        You can send us a message via any of the channels below
      </Typography>

      <Grid container spacing={4} sx={{ my: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography sx={{ color: (theme) => theme.palette.primary.main }}>
              <Icon icon="ph:phone-call-fill" fontSize="2.5rem" />
            </Typography>

            <Stack sx={{ textAlign: "center" }}>
              <Typography sx={{ fontWeight: "bold", mb: 2 }}>
                Call Us
              </Typography>
              <Typography>+234-802-555-0178</Typography>
              <Typography>+234-802-555-0178</Typography>
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography sx={{ color: (theme) => theme.palette.primary.main }}>
              <Icon icon="tabler:mail-filled" fontSize="2.5rem" />
            </Typography>

            <Stack sx={{ textAlign: "center" }}>
              <Typography sx={{ fontWeight: "bold", mb: 2 }}>
                Email Us
              </Typography>
              <Typography>support@TBO.ng</Typography>
              <Typography>contact@TBO.ng</Typography>
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography sx={{ color: (theme) => theme.palette.primary.main }}>
              <Icon icon="ic:sharp-my-location" fontSize="2.5rem" />
            </Typography>

            <Stack>
              <Typography
                sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}
              >
                Visit Us
              </Typography>
              <Typography>
                23 Ademola
                <br /> Adetukumbo Street, <br />
                Wuse 2, Abuja Nigeria
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
