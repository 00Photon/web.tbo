//** React Import
import React from "react";

// ** Icon Imports
import Icon from "@/@core/component/icon";

//** Image Import
import BannerImage from "../assets/hiring.png";

//** MUI Import
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Banner: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1400px",
        mx: "auto",
        height: { xs: "auto", sm: "80vh" },
      }}
    >
      <Paper
        sx={{
          background: `url(${BannerImage.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          mt: (theme) => theme.spacing(4),
          height: { xs: "100%", md: "80vh" },
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-start" },
            alignItems: "center",
            pt: { xs: 2, sm: 4 },
            width: "100%",
            height: "100%",
            background: `rgba(0, 0, 0, 0.53)`,
          }}
        >
          <Stack
            sx={{
              color: "#fff",
              textTransform: "capitalize",
              ml: { xs: 2, sm: 4 },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                my: 2,
                fontSize: { xs: ".875rem", sm: "1rem" },
                fontWeight: { xs: 200, sm: 500 },
              }}
            >
              Are you an Employer...
            </Typography>
            <Typography
              variant="h4"
              sx={{
                my: 2,
                fontSize: { xs: "1.25rem", sm: "1.75rem" },
              }}
            >
              Looking for top talents?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                my: 2,
                fontSize: { xs: "1rem", sm: "1.25rem" },
                fontWeight: { xs: 200, sm: 500 },
              }}
            >
              With over 301,567 job-seekers, we&apos;ve got your organization
              covered!
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "flex-start" },
                alignItems: "center",
                my: 4,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  py: ".5rem",
                  background: "#A20514",
                  textTransform: "capitalize",
                }}
                size="medium"
              >
                Explore more
                <Icon icon="material-symbols-light:arrow-right-alt-rounded" />
              </Button>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default Banner;
