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

const ReProfile = () => {
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
   

     
      <Box sx={{ my: 1 }}>
        <form>
        

          <Divider variant="middle" />

          <Box sx={{ mt: 4 }}>
            <Typography
              sx={{
                fontWeight: 600,
                color: "#39353D",
                fontSize: { xs: "1rem", sm: "1.2rem" },
              }}
            >
              Company Representative
            </Typography>
            <Typography sx={{ fontSize: "13px", mb: "10px" }}>
              Details about the company representative
            </Typography>
          </Box>

          <Box sx={{ my: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} lg={6}>
                <Typography
                  sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
                >
                  Contact Person
                </Typography>

                <Controller
                  name="contactPerson"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      onChange={onChange}
                      size="medium"
                      placeholder="John Doe"
                      error={Boolean(errors.contactPerson)}
                      helperText={errors.contactPerson?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} lg={6}>
                <Typography
                  sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
                >
                  Work Email
                </Typography>

                <Controller
                  name="workEmail"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      onChange={onChange}
                      size="medium"
                      placeholder="abc@gmail.com"
                      error={Boolean(errors.workEmail)}
                      helperText={errors.workEmail?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} lg={6}>
                <Typography
                  sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
                >
                  Position in company
                </Typography>

                <Controller
                  name="position"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      onChange={onChange}
                      size="medium"
                      placeholder="Manager..."
                      error={Boolean(errors.position)}
                      helperText={errors.position?.message}
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
            </Grid>
          </Box>

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

export default ReProfile;
