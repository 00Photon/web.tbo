// * React Imports
import React from "react";

// ** Third Party Imports
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { companySchema } from "@/@core/formSchema";

// * MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CheckBox from "@mui/material/Checkbox";
import { InputAdornment } from "@mui/material";
import Divider from "@mui/material/Divider";

// * Custom Component Imports
import ProfilePicture from "../../components/ProfilePicture";
import CustomTextField from "@/@core/component/mui/text-field";

const defaultValues = {
  name: "",
  email: "",
  industry: "",
  employees: 0,
  typeOfEmployer: "",
  address: "",
  website: "",
  country: "",
  countryCode: "",

  contactPerson: "",
  workEmail: "",
  position: "",
  repCountryCode: "",
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
    resolver: yupResolver(companySchema),
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
          Company Information
        </Typography>
        <Typography sx={{ fontSize: "13px", mb: "10px" }}>
          Details about the company
        </Typography>
      </Box>

      <Box sx={{ my: 1 }}>
        <form>
          <Grid container spacing={4} sx={{ my: 4 }}>
            <Grid item xs={12} sm={6} lg={6}>
              <Typography
                sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
              >
                Company Name
              </Typography>

              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    size="medium"
                    placeholder="ABC Holdings..."
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={6}>
              <Typography
                sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
              >
                Company Email Address
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
                Industry
              </Typography>

              <Controller
                name="industry"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    select
                    value={value}
                    onChange={onChange}
                    size="medium"
                    placeholder="Agriculture, Technology..."
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          style: {
                            maxHeight: 200, // Limit the height to prevent overflow
                          },
                        },
                        disableScrollLock: true, // Prevent scroll locking
                      },
                    }}
                    error={Boolean(errors?.industry)}
                    helperText={errors?.industry?.message}
                  >
                    <MenuItem value="0">Consultancy</MenuItem>
                    <MenuItem value="1">Technology</MenuItem>
                    <MenuItem value="2">Travel</MenuItem>
                    <MenuItem value="3">Logistic</MenuItem>
                    <MenuItem value="4">Education</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={6}>
              <Typography
                sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
              >
                Number of employees
              </Typography>

              <Controller
                name="employees"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    select
                    value={value}
                    onChange={onChange}
                    size="medium"
                    placeholder="10-50, 50-100..."
                    error={Boolean(errors?.employees)}
                    helperText={errors?.employees?.message}
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          style: {
                            maxHeight: 200, // Limit the height to prevent overflow
                          },
                        },
                        disableScrollLock: true, // Prevent scroll locking
                      },
                    }}
                  >
                    <MenuItem value="0">10-50</MenuItem>
                    <MenuItem value="1">50-100</MenuItem>
                    <MenuItem value="2">100-200</MenuItem>
                    <MenuItem value="3">200+</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={6}>
              <Typography
                sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
              >
                Type of employer
              </Typography>

              <Controller
                name="typeOfEmployer"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    select
                    value={value}
                    onChange={onChange}
                    size="medium"
                    placeholder="ABC Holdings..."
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          style: {
                            maxHeight: 200, // Limit the height to prevent overflow
                          },
                        },
                        disableScrollLock: true, // Prevent scroll locking
                      },
                    }}
                    error={Boolean(errors.typeOfEmployer)}
                    helperText={errors.typeOfEmployer?.message}
                  >
                    <MenuItem value="0">Private</MenuItem>
                    <MenuItem value="1">Public</MenuItem>
                    <MenuItem value="2">Government</MenuItem>
                    <MenuItem value="3">Other</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={6}>
              <Typography
                sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
              >
                Company address
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
                    placeholder="124, Houston Street"
                    error={Boolean(errors.address)}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={6}>
              <Typography
                sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
              >
                Country Code
              </Typography>

              <Controller
                name="countryCode"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    size="medium"
                    InputProps={{
                      country: "rw",
                      startAdornment: (
                        <InputAdornment position="start">+234</InputAdornment>
                      ),
                    }}
                    error={Boolean(errors.countryCode)}
                    helperText={errors.countryCode?.message}
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
                    placeholder="Rwanda, Tunisia, Nigeria..."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">✅</InputAdornment>
                      ),
                    }}
                    error={Boolean(errors.country)}
                    helperText={errors.country?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} lg={6}>
              <Typography
                sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
              >
                Website
              </Typography>

              <Controller
                name="website"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onChange={onChange}
                    size="medium"
                    placeholder="www.company.com"
                    error={Boolean(errors.website)}
                    helperText={errors.website?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Divider variant="middle" />

          

          <Divider variant="middle" />

          <Box
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
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Profile;
