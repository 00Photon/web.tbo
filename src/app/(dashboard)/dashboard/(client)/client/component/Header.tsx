// * React Imports
import React from "react";

// * Icon Import
import Icon from "@/@core/component/icon";

// * Utility Imports
import StyledImage from "@/@core/component/mui/image";
import { formatNumber } from "@/@core/utils/format";

//* Image Imports
import Green from "../../../components/assets/green.png";
import Purple from "../../../components/assets/purple.png";
import Blue from "../../../components/assets/blue.png";

// * MUI Imports
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useSession } from "next-auth/react";
interface SupTextProps {
  color?: string;
}

const SupText = styled("span")<SupTextProps>(({ color }) => ({
  display: "flex",
  alignItems: "center",
  fontWeight: "bold",
  color: color || "#008A5D",
}));

const InfoHeader: React.FC = () => {

 const { data: session } = useSession();
  return (
    // <Paper >
      
      <CardContent sx={{ pt: 10, pb: 6, p: 6,  mb: 4  }}>
      <Grid
          container
          spacing={0}
          sx={{
            backgroundColor: "#fff",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: 3,
            minHeight: { xs: "auto", md: 350 },
          }}
        >
          {/* Left - Image */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src="/company.jpeg"
              alt="Find Work"
              sx={{
                width: "100%",
                height: { xs: 250, md: "100%" },
                objectFit: "cover",
                borderRadius: { xs: "8px 8px 0 0", md: "8px 0 0 8px" },
              }}
            />
          </Grid>

          {/* Right - Text & CTA */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              backgroundColor: "#730E19",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: { xs: "center", md: "flex-start" },
              padding: { xs: 3, md: 5 },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography variant="subtitle2" sx={{ textTransform: "uppercase", fontWeight: 600 }}>
              Welcome, {session?.user?.name}!
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
            Post a Job Today, Hire Tomorrow! 🚀
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, mb: 3, opacity: 0.9 }}>
            Your hiring just got easier—we're the extra boost
            your hiring team needs!”
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
         

     

          {/* Other existing cards remain unchanged */}
        </Grid>
      </CardContent>
    // </Paper>
  );
};

export default InfoHeader;
