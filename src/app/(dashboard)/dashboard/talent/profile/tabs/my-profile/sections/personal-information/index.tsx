import {
  Box,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { getProfile, User } from "@/@core/services/profileService";
import React, { useEffect, useState } from "react";

const PersonalInformation = () => {
  const [profile, setProfile] = useState<User | null>(null); // State to store profile data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState<string | null>(null);

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const fieldsData = [
    {
      label: "First Name",
      placeholder: "Enter First Name",
      value: profile?.name.split(" ")[0] || "", // Extract first name from full name
    },
    {
      label: "Surname",
      placeholder: "Enter Surname",
      value: profile?.name.split(" ")[1] || "", // Extract surname from full name
    },
    {
      label: "Email Address",
      placeholder: "Enter Email Address",
      value: profile?.email || "",
    },
    {
      label: "Phone Number",
      placeholder: "Enter Phone Number",
      value: profile?.phone_number || "",
    },
  ];

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <section>
      <Box>
        <Typography
          sx={{ fontWeight: 600, color: "#39353D", fontSize: "16px" }}
        >
          Personal Information
        </Typography>
        <Typography sx={{ fontSize: "13px", mb: "10px" }}>
          Details about yourself
        </Typography>
        <Grid columnSpacing={4} rowSpacing={3} container>
          {fieldsData.map((field, index) => (
            <Grid key={index} item xs={12} sm={6} lg={6}>
              <Box
                sx={{
                  color: "#101928",
                  fontSize: "12px",
                  fontWeight: 500,
                  marginBottom: "5px",
                }}
              >
                {field.label}
              </Box>
              <TextField
                placeholder={field.placeholder}
                sx={{ width: "100%" }}
                value={field.value}
                // inputProps={{ style: { fontSize: "12px" } }}
                inputProps={{
                  "aria-label": field.label, // Accessibility
                  style: { fontSize: "12px" },
                }}
                disabled // Disable fields if they are read-only
              ></TextField>
            </Grid>
          ))}
        </Grid>
      </Box>
    </section>
  );
};

export default PersonalInformation;
