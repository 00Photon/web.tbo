// *React Imports
import React from "react";

// *MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const Terms: React.FC = () => {
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
          mb: 2,
          mt: 4,
          textAlign: "center",
          color: (theme) => theme.palette.primary.main,
        }}
      >
        Terms & Conditions
      </Typography>

      <Typography sx={{ mb: 3, textAlign: "center" }}>
        By accessing and placing an order with UXTheme, you confirm that you are
        in agreement with and bound by the terms and conditions.
      </Typography>

      <Typography sx={{ mb: 3, textAlign: "justify" }}>
        By accessing and placing an order with UXTheme, you confirm that you are
        in agreement with and bound by the terms and conditions contained in the
        Terms Of Use outlined below. These terms apply to the entire website and
        any email or other type of communication between you and UXTheme. Under
        no circumstances shall UXTheme team be liable for any direct, indirect,
        special, incidental or consequential damages, including, but not limited
        to, loss of data or profit, arising out of the use, or the inability to
        use, the materials on this site, even if UXTheme team or an authorized
        representative has been advised of the possibility of such damages. If
        your use of materials from this site results in the need for servicing,
        repair or correction of equipment or data, you assume any costs thereof.
        UXTheme will not be responsible for any outcome that may occur during
        the course of usage of our resources.
      </Typography>

      <Typography
        variant="h4"
        sx={{ fontSize: "1rem", fontWeight: "bold", mb: 2, mt: 4 }}
      >
        License
      </Typography>

      <Typography sx={{ mb: 3, textAlign: "justify" }}>
        By purchasing or downloading resource (“item” or “file”) you are being
        granted a license to use these files for specific uses under certain
        conditions. Ownership remains with UXTheme, and you are required to
        abide by the following licensing terms.
      </Typography>

      <Typography
        variant="h4"
        sx={{ fontSize: "1rem", fontWeight: "bold", mb: 2, mt: 4 }}
      >
        Security
      </Typography>
      <List sx={{ listStyleType: "disc", pl: 4 }}>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary="You have rights for royalty free use of our resources for any or all of your personal." />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary="You are not required to attribute or link to UXTheme in any of projects." />
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          <ListItemText primary="We reserve the rights to change prices and revise the resources usage policy in any moment." />
        </ListItem>
      </List>

      <Typography
        variant="h4"
        sx={{ fontSize: "1rem", fontWeight: "bold", mb: 2, mt: 4 }}
      >
        Embedded content from other websites
      </Typography>
      <Typography sx={{ mb: 3, textAlign: "justify" }}>
        Articles on this site may include embedded content (e.g. videos, images,
        articles, etc.). Embedded content from other websites behaves in the
        exact same way as if the visitor has visited the other website.
      </Typography>
      <Typography sx={{ mb: 3, textAlign: "justify" }}>
        These websites may collect data about you, use cookies, embed additional
        third-party tracking, and monitor your interaction with that embedded
        content, including tracking your activities.
      </Typography>

      <Typography
        variant="h4"
        sx={{ fontSize: "1rem", fontWeight: "bold", mb: 2, mt: 4 }}
      >
        Changes about terms
      </Typography>
      <Typography sx={{ mb: 3, textAlign: "justify" }}>
        If we change our terms of use we will post those changes on this page.
        Registered users will be sent an email that outlines changes made to the
        terms of use.
      </Typography>
    </Box>
  );
};

export default Terms;
