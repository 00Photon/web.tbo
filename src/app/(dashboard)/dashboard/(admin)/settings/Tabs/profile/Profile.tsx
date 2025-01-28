// * React Imports
import React from "react";

// ** Third Party Imports
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AdminProfileSchema } from "@/@core/formSchema";

// * MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CheckBox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";

// * Custom Component Imports
import ProfilePicture from "../../../component/ProfileImage";
import CustomTextField from "@/@core/component/mui/text-field";

const defaultValues = {
  fullName: "",
  username: "",
  email: "",
  role: "",
  address: "",
  city: "",
  country: "",
  postalCode: 0,
  phoneNumber: "",
};

const Profile = () => {
  const user = {
    name: "Test User",
    job: "Developer",
    avatar: "",
  };

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValues,
    mode: "onChange",
    resolver: yupResolver(AdminProfileSchema),
  });

  return (
    <Box sx={{ mb: 8 }}>
      <ProfilePicture user={user} />

      <Box sx={{ mt: 4 }}>
        <Typography
          sx={{
            fontWeight: 600,
            color: "#39353D",
            fontSize: { xs: "1rem", sm: "1.2rem" },
          }}
        >
          Admin Information
        </Typography>
        <Typography sx={{ fontSize: "13px", mb: "10px" }}>
          Details about the Admin
        </Typography>
      </Box>

      <Box sx={{ my: 1 }}>
        <form>
          <Grid container spacing={4} sx={{ my: 4 }}>
            <Grid item xs={12} sm={6} lg={6}>
              <Typography
                sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
              >
                Full Name
              </Typography>

              <Controller
                name="fullName"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    size="medium"
                    placeholder="Sarah Doe"
                    error={Boolean(errors.fullName)}
                    helperText={errors.fullName?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={6}>
              <Typography
                sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
              >
                Username
              </Typography>

              <Controller
                name="username"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    size="medium"
                    placeholder="example12084"
                    error={Boolean(errors.username)}
                    helperText={errors.username?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={6}>
              <Typography
                sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
              >
                Email
              </Typography>

              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    size="medium"
                    placeholder="abc@gmail.com"
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={6}>
              <Typography
                sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
              >
                Role
              </Typography>

              <Controller
                name="role"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    size="medium"
                    placeholder="Developer, Designer..."
                    error={Boolean(errors?.role)}
                    helperText={errors?.role?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={6}>
              <Typography
                sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
              >
                Address
              </Typography>

              <Controller
                name="address"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    size="medium"
                    placeholder="Diwali Street 84"
                    error={Boolean(errors?.address)}
                    helperText={errors?.address?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={6}>
              <Typography
                sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
              >
                City
              </Typography>

              <Controller
                name="city"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    size="medium"
                    placeholder="Abuja, Kigali, Nairobi"
                    error={Boolean(errors?.city)}
                    helperText={errors?.city?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={6}>
              <Typography
                sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
              >
                Country
              </Typography>

              <Controller
                name="country"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    size="medium"
                    placeholder="Ghana, Nigeria..."
                    error={Boolean(errors?.country)}
                    helperText={errors?.country?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={6}>
              <Typography
                sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
              >
                Postal Code
              </Typography>

              <Controller
                name="postalCode"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    size="medium"
                    placeholder="000000"
                    error={Boolean(errors?.postalCode)}
                    helperText={errors?.postalCode?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={6}>
              <Typography
                sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
              >
                Phone Number
              </Typography>

              <Controller
                name="phoneNumber"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    size="medium"
                    placeholder="+91 0000000000"
                    error={Boolean(errors?.phoneNumber)}
                    helperText={errors?.phoneNumber?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          {/* <Divider variant="middle" /> */}

          {/* <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: { xs: "center", sm: "flex-start" },
              flexDirection: { xs: "column", sm: "row" },
              gap: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              <Box>
                <CheckBox color="primary" />
              </Box>
              <Typography sx={{ fontSize: "12px", width: { md: "70%" } }}>
                Warning by clicking this box, it means you have read and agreed
                with our terms and conditions and privacy policy
              </Typography>
            </Box>

            <Button
              variant="contained"
              size="large"
              sx={{
                width: { xs: "fit-content", md: "30%" },
                textTransform: "capitalize",
              }}
            >
              Save
            </Button>
          </Box> */}
        </form>
      </Box>
    </Box>
  );
};

export default Profile;
