// * React Imports
import React, { useEffect, useRef } from "react";

// ** Icon Imports
import Icon from "@/@core/component/icon";

// ** anime Import
import anime from "animejs";

// ** Image Imports
import cheerful from "../assets/cheerful.svg";
import Quote from "../assets/quote.svg";
import SingleGear from "../assets/singleGear.svg";

// * MUI Imports
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { alpha, styled } from "@mui/material/styles";

// * Custom Component Imports
import StyledImage from "@/@core/component/mui/image";

interface DataProps {
  name: string;
  title: string;
  image: any;
  testimony: string;
}

const data: DataProps[] = [
  {
    name: "James Ronald",
    title: "Full Stack Developer",
    image: cheerful,
    testimony: `LinkPath has been a game-changer for my business. I used to struggle with sharing multiple links to my portfolio, social media profiles, and contact information. Now, with just one link, my clients can easily access everything they need. I highly recommend LinkPath to any freelancer looking to streamline their online presence!`,
  },
  {
    name: "James Ronald",
    title: "Full Stack Developer",
    image: cheerful,
    testimony: `LinkPath has been a game-changer for my business. I used to struggle with sharing multiple links to my portfolio, social media profiles, and contact information. Now, with just one link, my clients can easily access everything they need. I highly recommend LinkPath to any freelancer looking to streamline their online presence!`,
  },
  {
    name: "James Ronald",
    title: "Full Stack Developer",
    image: cheerful,
    testimony: `LinkPath has been a game-changer for my business. I used to struggle with sharing multiple links to my portfolio, social media profiles, and contact information. Now, with just one link, my clients can easily access everything they need. I highly recommend LinkPath to any freelancer looking to streamline their online presence!`,
  },
  {
    name: "James Ronald",
    title: "Full Stack Developer",
    image: cheerful,
    testimony: `LinkPath has been a game-changer for my business. I used to struggle with sharing multiple links to my portfolio, social media profiles, and contact information. Now, with just one link, my clients can easily access everything they need. I highly recommend LinkPath to any freelancer looking to streamline their online presence!`,
  },
  {
    name: "James Ronald",
    title: "Full Stack Developer",
    image: cheerful,
    testimony: `LinkPath has been a game-changer for my business. I used to struggle with sharing multiple links to my portfolio, social media profiles, and contact information. Now, with just one link, my clients can easily access everything they need. I highly recommend LinkPath to any freelancer looking to streamline their online presence!`,
  },
  {
    name: "James Ronald",
    title: "Full Stack Developer",
    image: cheerful,
    testimony: `LinkPath has been a game-changer for my business. I used to struggle with sharing multiple links to my portfolio, social media profiles, and contact information. Now, with just one link, my clients can easily access everything they need. I highly recommend LinkPath to any freelancer looking to streamline their online presence!`,
  },
  {
    name: "James Ronald",
    title: "Full Stack Developer",
    image: cheerful,
    testimony: `LinkPath has been a game-changer for my business. I used to struggle with sharing multiple links to my portfolio, social media profiles, and contact information. Now, with just one link, my clients can easily access everything they need. I highly recommend LinkPath to any freelancer looking to streamline their online presence!`,
  },
  {
    name: "James Ronald",
    title: "Full Stack Developer",
    image: cheerful,
    testimony: `LinkPath has been a game-changer for my business. I used to struggle with sharing multiple links to my portfolio, social media profiles, and contact information. Now, with just one link, my clients can easily access everything they need. I highly recommend LinkPath to any freelancer looking to streamline their online presence!`,
  },
  {
    name: "James Ronald",
    title: "Full Stack Developer",
    image: cheerful,
    testimony: `LinkPath has been a game-changer for my business. I used to struggle with sharing multiple links to my portfolio, social media profiles, and contact information. Now, with just one link, my clients can easily access everything they need. I highly recommend LinkPath to any freelancer looking to streamline their online presence!`,
  },
  {
    name: "James Ronald",
    title: "Full Stack Developer",
    image: cheerful,
    testimony: `LinkPath has been a game-changer for my business. I used to struggle with sharing multiple links to my portfolio, social media profiles, and contact information. Now, with just one link, my clients can easily access everything they need. I highly recommend LinkPath to any freelancer looking to streamline their online presence!`,
  },
];

const Testimonial: React.FC = () => {
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    anime({
      targets: quoteRef.current,
      scale: [0.8, 1],
      duration: 2000,
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
    });
  }, []);
  return (
    <Paper
      sx={{
        position: "relative",
        background: (theme) => theme.palette.primary.light,
        py: (theme) => theme.spacing(4),
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          background: `url(${SingleGear.src})`,
          width: "100%",
          height: "100%",
          zIndex: 1,
          backgroundBlendMode: "multiply",
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          top: { xs: "27%", md: "10%" },
          right: { xs: "-15%", md: "5%" },
        }}
        ref={quoteRef}
      >
        <StyledImage src={Quote.src} alt="Qoute sign" />
      </Box>
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          py: (theme) => theme.spacing(4),
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, sm: 4 },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "1rem", sm: "1.5rem" },
            fontWeight: 400,
            textTransform: "capitalize",
            mb: 2,
            mt: "2rem",
            textAlign: "center",
            color: (theme) => theme.palette.primary.main,
          }}
        >
          Testimonials
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
          What our users are saying about their experience...
        </Typography>
      </Box>
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          px: { xs: 2, sm: 4 },
          py: 4,
          overflowX: "hidden",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 3,
            px: { xs: 2, sm: 0 },
            overflowX: "auto",
            width: "100%",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {data.map((item, index) => {
            return (
              <Card
                key={index}
                sx={{
                  p: { xs: 2, sm: 4 },
                  minWidth: { xs: "100%", sm: "60%", md: "35%" },
                  textAlign: { xs: "center", sm: "left" },
                  my: 1,
                  borderRadius: { xs: "1rem", sm: "1.6rem" },
                  boxShadow: `${alpha("#000", 0.5)}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: ".85rem", sm: "1rem" },
                    whiteSpace: "preserve",
                  }}
                >
                  {item.testimony}
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}
                >
                  <Avatar
                    src={item.image.src}
                    alt="cheerful face guy holding a laptop"
                  />
                  <Stack>
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: { xs: "0.7rem", sm: ".9rem" },
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: "0.6rem", sm: ".8rem" },
                        color: (theme) => theme.palette.primary.main,
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Stack>
                </Box>
              </Card>
            );
          })}
        </Box>
      </Box>
    </Paper>
  );
};

export default Testimonial;
