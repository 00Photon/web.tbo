// * React Imports
import React from "react";

// ** Icon Imports
import Icon from "../../../@core/component/icon";

// * MUI Imports
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const ListStyled = styled(Box)(({}) => ({
  width: 24,
  height: 24,
  borderRadius: "50%",
  color: "#fff",
  background: "#000",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SupText = styled("span")(({}) => ({
  display: "flex",
  alignItems: "center",
  fontSize: "2rem",
  fontWeight: "semibold",
}));

const Pricing = () => {
  return (
    <Box
      sx={{
        my: 4,
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
          textAlign: "center",
          color: (theme) => theme.palette.primary.main,
        }}
      >
        Pricing
      </Typography>

      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
        }}
      >
        <Typography sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}>
          Monthly
        </Typography>
        <Switch color="primary" size="medium" />
        <Typography sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}>
          Annually
        </Typography>
      </Stack>
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3, borderRadius: 6, p: 2, height: "100%" }}>
              <Typography
                variant="h5"
                sx={{ mt: 3, fontWeight: "bold", ml: 3 }}
              >
                Professional
              </Typography>

              <CardContent>
                <Typography>For Individuals and Small Team</Typography>
                <Typography sx={{ display: "flex", alignItems: "baseline" }}>
                  <SupText>$15</SupText>
                  /per user per month
                </Typography>
              </CardContent>

              <Button
                variant="contained"
                size="small"
                sx={{ width: "90%", display: "block", mx: "auto", mb: 3, p: 2 }}
              >
                Get Started
              </Button>

              <Divider variant="middle" component="div" />

              <CardContent>
                <List>
                  <ListItem
                    sx={{ display: "flex", alignItems: "center", gap: 2 }}
                  >
                    <ListStyled>
                      <Icon icon="gg:check" />
                    </ListStyled>
                    <ListItemText>Up to 15 Jobs per Account</ListItemText>
                  </ListItem>
                  <ListItem
                    sx={{ display: "flex", alignItems: "center", gap: 2 }}
                  >
                    <ListStyled>
                      <Icon icon="gg:check" />
                    </ListStyled>
                    <ListItemText>Up to 10,000 Candidates</ListItemText>
                  </ListItem>
                  <ListItem
                    sx={{ display: "flex", alignItems: "center", gap: 2 }}
                  >
                    <ListStyled>
                      <Icon icon="gg:check" />
                    </ListStyled>
                    <ListItemText>Unlimited Hiring Managers</ListItemText>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 6,
                p: 2,
                height: "100%",
                background: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.secondary.main,
              }}
            >
              <Typography
                variant="h5"
                sx={{ mt: 3, fontWeight: "bold", ml: 3 }}
              >
                Enterprise
              </Typography>

              <CardContent>
                <Typography>For Industry Leaders</Typography>
                <Typography sx={{ display: "flex", alignItems: "baseline" }}>
                  <SupText>$35</SupText>
                  /per user per month
                </Typography>
              </CardContent>

              <Button
                variant="outlined"
                size="small"
                sx={{
                  width: "90%",
                  display: "block",
                  mx: "auto",
                  mb: 3,
                  p: 2,
                  background: (theme) => theme.palette.secondary.main,
                  "&:hover": {
                    color: (theme) => theme.palette.secondary.main,
                    background: (theme) => theme.palette.primary.dark,
                  },
                }}
              >
                Get Started
              </Button>

              <Divider variant="middle" component="div" />

              <CardContent>
                <List>
                  <ListItem
                    sx={{ display: "flex", alignItems: "center", gap: 2 }}
                  >
                    <ListStyled
                      sx={{
                        background: (theme) => theme.palette.secondary.main,
                        color: (theme) => theme.palette.primary.main,
                      }}
                    >
                      <Icon icon="gg:check" />
                    </ListStyled>
                    <ListItemText>Unlimited Jobs</ListItemText>
                  </ListItem>
                  <ListItem
                    sx={{ display: "flex", alignItems: "center", gap: 2 }}
                  >
                    <ListStyled
                      sx={{
                        background: (theme) => theme.palette.secondary.main,
                        color: (theme) => theme.palette.primary.main,
                      }}
                    >
                      <Icon icon="gg:check" />
                    </ListStyled>
                    <ListItemText>Unlimited Candidates</ListItemText>
                  </ListItem>
                  <ListItem
                    sx={{ display: "flex", alignItems: "center", gap: 2 }}
                  >
                    <ListStyled
                      sx={{
                        background: (theme) => theme.palette.secondary.main,
                        color: (theme) => theme.palette.primary.main,
                      }}
                    >
                      <Icon icon="gg:check" />
                    </ListStyled>
                    <ListItemText>Unlimited Hiring Managers</ListItemText>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Card sx={{ boxShadow: 3, borderRadius: 6, p: 2, height: "100%" }}>
              <Typography
                variant="h5"
                sx={{ mt: 3, fontWeight: "bold", ml: 3 }}
              >
                Custom
              </Typography>

              <CardContent>
                <Typography>For Custom Plan</Typography>
                <Typography sx={{ display: "flex", alignItems: "baseline" }}>
                  <SupText>In Demand</SupText>
                </Typography>
              </CardContent>

              <Button
                variant="contained"
                size="small"
                sx={{ width: "90%", display: "block", mx: "auto", mb: 3, p: 2 }}
              >
                Get Started
              </Button>

              <Divider variant="middle" component="div" />

              <CardContent>
                <List>
                  <ListItem
                    sx={{ display: "flex", alignItems: "center", gap: 2 }}
                  >
                    <ListStyled>
                      <Icon icon="gg:check" />
                    </ListStyled>
                    <ListItemText>Everything in Enterprise plan</ListItemText>
                  </ListItem>
                  <ListItem
                    sx={{ display: "flex", alignItems: "center", gap: 2 }}
                  >
                    <ListStyled>
                      <Icon icon="gg:check" />
                    </ListStyled>
                    <ListItemText>Custom Features</ListItemText>
                  </ListItem>
                  <ListItem
                    sx={{ display: "flex", alignItems: "center", gap: 2 }}
                  >
                    <ListStyled>
                      <Icon icon="gg:check" />
                    </ListStyled>
                    <ListItemText>Custom Integration</ListItemText>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Pricing;
