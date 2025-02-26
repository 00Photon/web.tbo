// * React Imports
import React from "react";

// ** Icon Imports
import Icon from "@/@core/component/icon";

// * Image Import
import Bitmap from "../assets/Bitmap.svg";

//* MUI Imports
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  background: theme.palette.primary.light,
  color: theme.palette.primary.main,
  border: `2px solid ${theme.palette.primary.main}`,
  "&:focus, &:hover": {
    background: theme.palette.primary.light,
  },
}));

const HiringOffers: React.FC = () => {
  return (
    <Paper
      sx={{
        zIndex: -1,
        position: "relative",
        mt: { xs: "8rem", sm: -20 },
        pt: "6rem",
        p: (theme) => [
          `${theme.spacing(2)} !important`,
          `${theme.spacing(4)} !important`,
        ],
        background: (theme) => theme.palette.primary.light,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${Bitmap.src})`,
          backgroundSize: "cover",
          backgroundPosition: "top right",
        }}
      ></Box>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "1rem", sm: "1.5rem" },
          fontWeight: 400,
          textTransform: "capitalize",
          mb: 2,
          mt: "8rem",
          textAlign: "center",
          color: (theme) => theme.palette.primary.main,
        }}
      >
        What we offer
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
        Unlock Your Potential with Our Comprehensive Solutions
      </Typography>

      <Box
        sx={{
          my: 4,
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={4}>
            <Card
              sx={{
                height: "100%",
                boxShadow: 3,
                borderRadius: 6,
                textAlign: { xs: "center", sm: "left" },
                p: (theme) => `${theme.spacing(4)} !important`,
              }}
            >
              <IconButtonStyled
                sx={{
                  p: (theme) => [
                    `${theme.spacing(2)} !important`,
                    `${theme.spacing(3)} !important`,
                  ],
                }}
              >
                <Icon icon="icon-park-twotone:doc-search" fontSize={30} />
              </IconButtonStyled>
              <CardHeader
                title="Job Hunt"
                sx={{ color: (theme) => theme.palette.primary.main }}
              />
              <CardContent>
                We recommend employers from all around the world to help you
                secure your dream Job.
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card
              sx={{
                height: "100%",
                boxShadow: 3,
                borderRadius: 6,
                textAlign: { xs: "center", sm: "left" },
                p: (theme) => `${theme.spacing(4)} !important`,
              }}
            >
              <IconButtonStyled
                sx={{
                  p: (theme) => [
                    `${theme.spacing(2)} !important`,
                    `${theme.spacing(3)} !important`,
                  ],
                }}
              >
                <Icon icon="mdi:building" fontSize={30} />
              </IconButtonStyled>
              <CardHeader
                title="Hiring Hunt"
                sx={{ color: (theme) => theme.palette.primary.main }}
              />
              <CardContent>
                We offer a wide selection of qualified talents you can choose
                from to add that glow to your team.
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={12} lg={4}>
            <Card
              sx={{
                height: "100%",
                boxShadow: 3,
                borderRadius: 6,
                textAlign: { xs: "center", sm: "left" },
                p: (theme) => `${theme.spacing(4)} !important`,
              }}
            >
              <IconButtonStyled
                sx={{
                  p: (theme) => [
                    `${theme.spacing(2)} !important`,
                    `${theme.spacing(3)} !important`,
                  ],
                }}
              >
                <Icon icon="tabler:user-search" fontSize={30} />
              </IconButtonStyled>
              <CardHeader
                title="Recruitment Process"
                sx={{ color: (theme) => theme.palette.primary.main }}
              />
              <CardContent>
                We handle the screening and interview process to find the
                perfect fit for your company.
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default HiringOffers;
