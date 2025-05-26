import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordSchema } from "@/@core/formSchema";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { InputAdornment, IconButton, Divider, Snackbar, Alert } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ListItem } from "@mui/material";

import CustomTextField from "@/@core/component/mui/text-field";
import { changePassword } from "@/@core/services/user";

const defaultValues = {
  password: "",
  newPassword: "",
  confirmPassword: "",
};

const Password = () => {
  const [focusNewPassword, setFocusNewPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(passwordSchema),
  });

  const onSubmit = async (data: typeof defaultValues) => {
    try {
      await changePassword({
        current_password: data.password,
        password: data.newPassword,
        password_confirmation: data.confirmPassword,
      });
      setSnackbar({ open: true, message: "Password changed successfully", severity: "success" });
      reset();
    } catch (error: any) {
      setSnackbar({ open: true, message: error.message || "Failed to change password", severity: "error" });
    }
  };

  return (
    <main>
      <Box sx={{ mt: 4 }}>
        <Typography sx={{ fontWeight: 600, color: "#39353D", fontSize: { xs: "1rem", sm: "1.2rem" } }}>
          Password Management
        </Typography>
        <Typography sx={{ fontSize: "13px", mb: "10px" }}>Make changes to your password</Typography>
      </Box>

      <Divider variant="middle" />

      <Box sx={{ my: 4 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack sx={{ width: { xs: "100%", sm: "50%" } }}>
            <Box sx={{ my: 3 }}>
              <Typography sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}>Password</Typography>
              <Controller
                name="password"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    size="medium"
                    onChange={onChange}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </Box>

            <Box sx={{ my: 3 }}>
              <Typography sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}>New password</Typography>
              <Controller
                name="newPassword"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    size="medium"
                    onChange={onChange}
                    onFocus={() => setFocusNewPassword(true)}
                    onBlur={() => setFocusNewPassword(false)}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(errors.newPassword)}
                    helperText={errors.newPassword?.message}
                  />
                )}
              />
              {focusNewPassword && <ListItem>{errors?.newPassword?.message}</ListItem>}
            </Box>

            <Box sx={{ my: 3 }}>
              <Typography sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}>Confirm password</Typography>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    size="medium"
                    onChange={onChange}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors.confirmPassword?.message}
                  />
                )}
              />
            </Box>
          </Stack>

          <Divider variant="middle" />
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", my: 4 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{ width: { xs: "fit-content", md: "30%" }, textTransform: "capitalize" }}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </Box>
        </form>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity as any} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </main>
  );
};

export default Password;
