import {
  Box,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import {
  getProfile,
  updateProfile,
  User,
} from "@/@core/services/profileService";
import React, { useEffect, useState } from "react";

const PersonalInformation = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    phoneNumber: "",
  });

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
        setFormData({
          firstName: data.name.split(" ")[0] || "",
          surname: data.name.split(" ")[1] || "",
          email: data.email || "",
          phoneNumber: data.phone_number || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      // Perform save action
      handleSave();
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        name: `${formData.firstName} ${formData.surname}`,
        email: formData.email,
        phone_number: formData.phoneNumber,
      };

      const updatedProfile = await updateProfile(updatedData);
      setProfile(updatedProfile);
      setIsEditing(false); // Exit edit mode after saving
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const fieldsData = [
  //   {
  //     label: "First Name",
  //     placeholder: "Enter First Name",
  //     value: profile?.name.split(" ")[0] || "",
  //   },
  //   {
  //     label: "Surname",
  //     placeholder: "Enter Surname",
  //     value: profile?.name.split(" ")[1] || "",
  //   },
  //   {
  //     label: "Email Address",
  //     placeholder: "Enter Email Address",
  //     value: profile?.email || "",
  //   },
  //   {
  //     label: "Phone Number",
  //     placeholder: "Enter Phone Number",
  //     value: profile?.phone_number || "",
  //   },
  // ];

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
          {[
            {
              label: "First Name",
              name: "firstName",
              value: formData.firstName,
            },
            { label: "Surname", name: "surname", value: formData.surname },
            { label: "Email Address", name: "email", value: formData.email },
            {
              label: "Phone Number",
              name: "phoneNumber",
              value: formData.phoneNumber,
            },
          ].map((field, index) => (
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
                placeholder={field.label}
                sx={{ width: "100%" }}
                value={field.value}
                inputProps={{
                  "aria-label": field.label, // Accessibility
                  style: { fontSize: "12px" },
                }}
                disabled={!isEditing}
              ></TextField>
            </Grid>
          ))}
        </Grid>
        <Box mt={2}>
          <Button variant="contained" onClick={handleEditToggle}>
            {isEditing ? "Save" : "Edit"}
          </Button>
        </Box>
      </Box>
    </section>
  );
};

export default PersonalInformation;
