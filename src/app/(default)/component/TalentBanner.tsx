// ** React Import
import React from "react";

// ** Icon Imports
import Icon from "@/@core/component/icon";

// ** Custom Component Imports
import StyledImage from "@/@core/component/mui/image";

// * Image Imports
import Bitmap from "../assets/Bitmap.svg";
import bars from "../assets/bars.svg";
import polygon from "../assets/polygon.svg";
import cheerful from "../assets/cheerful.svg";
import bits from "../assets/bits.svg";

// ** MUI Imports
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const TalentBanner: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "fit-content",
        background: "linear-gradient(to right bottom, #A20514, #730E18)",
      }}
    >
      <Paper
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: { xs: "column-reverse", sm: "row" },
          justifyContent: { xs: "center", sm: "space-evenly" },
          alignItems: "center",
          background: "linear-gradient(to right bottom, #A20514, #730E18)",
          pt: { xs: 2, sm: 4 },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: { xs: "20%", sm: 0 },
            left: { xs: -30, sm: 0 },
            width: "100%",
            height: "100%",
            backgroundImage: `url(${bars.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: { xs: "50%", sm: "15%" },
            zIndex: 1,
          }}
        ></Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${Bitmap.src})`,
          }}
        ></Box>

        <Box
          sx={{
            display: "flex",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* <Box
            sx={{
              position: "absolute",
              width: { xs: 250, md: 350 },
              height: { xs: 250, md: 350 },

              borderRadius: "50%",
              background: `linear-gradient(${alpha("#000", 0.3)}, #730E18)`,
              zIndex: -1,
              top: 6,
              left: { xs: "8%", sm: "15%", md: "10%" },
            }}
          ></Box> */}

          {/* <Box
            sx={{
              position: "absolute",
              top: "65%",
              left: "42%",
              width: "100%",
              height: "100%",
              backgroundImage: `url(${polygon.src})`,
              backgroundRepeat: "no-repeat",
            }}
          ></Box> */}

          <StyledImage
            src={cheerful.src}
            alt="A happy employee holding a laptop cheerfully"
          />
        </Box>

        <Stack
          sx={{
            color: "#fff",
            textTransform: "capitalize",
            ml: { xs: 2, sm: 4 },
            textAlign: { xs: "center", sm: "left" },
            zIndex: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              my: 2,
              pt: 4,
              fontSize: { xs: "1rem", sm: "1.25rem" },
              fontWeight: { xs: 200, sm: 500 },
            }}
          >
            Job Hunting...
          </Typography>
          <Typography
            variant="h4"
            sx={{
              my: 2,
              fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
            }}
          >
            Are You Looking For A Job?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              my: 2,
              fontSize: { xs: ".875rem", sm: "1rem" },
              fontWeight: { xs: 200, sm: 500 },
            }}
          >
           With numerous jobseekers, we've got your organization covered!
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
                py: ".75rem",
                background: "#A20514",
                textTransform: "capitalize",
              }}
              size="medium"
            >
              Get Started
              <Icon icon="material-symbols-light:arrow-right-alt-rounded" />
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default TalentBanner;
