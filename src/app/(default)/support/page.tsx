"use client";

// ** React Imports
import React from "react";

// ** Icon Imports
import Icon from "@/@core/component/icon";

// ** MUI Imports
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

//* Custom Components Import
import CustomTextField from "@/@core/component/mui/text-field";

// ** Third Party Imports
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { supportSchema } from "../../../@core/formSchema";

interface DefaultValue {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const defaultValues: DefaultValue = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const Support: React.FC = () => {
  const smallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("sm")
  );

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValues,
    mode: "onChange",
    resolver: yupResolver(supportSchema),
  });

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
          my: 2,
          textAlign: "center",
          color: (theme) => theme.palette.primary.main,
        }}
      >
        Need Personalized Assistance?
      </Typography>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontSize: {
            xs: "1.25rem",
            sm: "1.75rem",
            md: "1.75rem",
          },
        }}
      >
        You can send us a message via the form below
      </Typography>

      <Paper
        sx={{
          px: { xs: 2, sm: 4 },
          py: 4,
          my: 4,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Grid container spacing={4} rowSpacing={4}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  autoFocus
                  value={value}
                  onChange={onChange}
                  size={smallScreen ? "medium" : "small"}
                  placeholder="John Doe"
                  label="Name"
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  onChange={onChange}
                  size={smallScreen ? "medium" : "small"}
                  placeholder="Email"
                  label="Email"
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="phone"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  onChange={onChange}
                  size={smallScreen ? "medium" : "small"}
                  placeholder="+234 000 000 0000"
                  label="Phone Number"
                  error={Boolean(errors.phone)}
                  helperText={errors.phone?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="subject"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  onChange={onChange}
                  size={smallScreen ? "medium" : "small"}
                  placeholder="I want to ..."
                  label="Subject"
                  error={Boolean(errors.subject)}
                  helperText={errors.subject?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="message"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  onChange={onChange}
                  multiline
                  rows={6}
                  placeholder="Enter your Message"
                  label="Message"
                  error={Boolean(errors.message)}
                  helperText={errors.message?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, mb: 2 }}>
          <Button
            variant="contained"
            size={smallScreen ? "medium" : "small"}
            sx={{ background: "#A50214", textTransform: "capitalize" }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Support;
