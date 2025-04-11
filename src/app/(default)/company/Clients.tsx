import "../../globals.css";
// *React Imports
import React from "react";

// *Third-Party Imports

// *Images Imports
import MakeLess from "../../../../public/icon/mtn.jpg";
import Dorfus from "../../../../public/icon/Petrocam.png";
import Green from "../../../../public/icon/VFD.png";
import Askimet from "../../../../public/clients/askimet.png";
import Sass from "../../../../public/clients/sass.png";
import Works from "../../../../public/clients/works.png";

// *Custom Component Imports
import StyledImage from "@/@core/component/mui/image";

// *MUI Imports
import Box from "@mui/material/Box";

interface Image {
  image: string;
  name: string;
}

const clientsData: Image[] = [
  {
    image: MakeLess.src,
    name: "MakeLess",
  },
  {
    image: Dorfus.src,
    name: "Dorfus",
  },
  {
    image: Green.src,
    name: "Green",
  },
  {
    image: Askimet.src,
    name: "Askimet",
  },
  {
    image: Sass.src,
    name: "Sass",
  },
  {
    image: Works.src,
    name: "Works",
  },
];

const Clients: React.FC = () => {
  return (
    <Box className="marquee">
      <Box className="marquee__content">
        {clientsData.map((item, i) => {
          return (
            <Box className="marquee__item" key={i}>
              <StyledImage
                src={item.image}
                alt={`${item.name} Logo`}
                className="img"
              />
            </Box>
          );
        })}
      </Box>

      {/* Duplicate for continuity */}
      <Box className="marquee__content">
        {clientsData.map((item, i) => {
          return (
            <Box aria-hidden="true" className="marquee__item" key={i}>
              <StyledImage
                src={item.image}
                alt={`${item.name} Logo`}
                className="img"
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Clients;
