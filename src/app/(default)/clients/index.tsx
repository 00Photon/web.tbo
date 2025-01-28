// ** React Imports
import React from "react";

// ** MUI Imports
import ClientHero from "./ClientHero";
import ClientOffers from "./ClientOffers";
import Pricing from "./Pricing";
import JobCategories from "../component/JobCategories";
import Banner from "../component/ClientBanner";

const Clients: React.FC = () => {
  return (
    <>
      <ClientHero />
      <ClientOffers />
      <Banner />
      <Pricing />
      <JobCategories />
    </>
  );
};

export default Clients;
