// ** React Imports
import React from "react";

// ** MUI Imports
import ClientHero from "./ClientHero";
import ClientOffers from "./ClientOffers";
import Talents from "./ViewTalent";
import JobCategories from "../component/JobCategories";
import Banner from "../component/ClientBanner";

const Clients: React.FC = () => {
  return (
    <>
      <ClientHero />
      {/* <ClientOffers /> */}
      {/* <Banner /> */}
      <Talents />
    </>
  );
};

export default Clients;
