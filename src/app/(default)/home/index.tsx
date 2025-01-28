"use client";
// * MUI Imports
import React from "react";

// ** MUI Imports
import Box from "@mui/material/Box";

// ** Custom Components
import HeroSection from "../component/HeroSection";
import HiringOffers from "./Offers";
import JobCategories from "../component/JobCategories";
import Banner from "../component/ClientBanner";
import TalentBanner from "../component/TalentBanner";
import Testimonial from "../component/Testimonial";

const Index = () => {
  return (
    <Box>
      <HeroSection />
      <HiringOffers />
      <JobCategories />
      <Banner />
      <Testimonial />
      <TalentBanner />
    </Box>
  );
};

export default Index;
