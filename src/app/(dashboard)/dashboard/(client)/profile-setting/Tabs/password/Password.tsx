// * React Imports
import { useState } from "react";

// ** Third Party Imports
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordSchema } from "@/@core/formSchema";

// * MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { InputAdornment, IconButton } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ListItem } from "@mui/material";

// * Custom Component Imports
import CustomTextField from "@/@core/component/mui/text-field";
import DeactivateAccount from "../../../../components/delete-account";

const defaultValues = {
  password: "",
  newPassword: "",
  confirmPassword: "",
};

const Password = () => {
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [focusNewPassword, setFocusNewPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValues,
    mode: "onChange",
    resolver: yupResolver(passwordSchema),
  });

  return (
    <main>
      <Box sx={{ mt: 4 }}>
        <Typography
          sx={{
            fontWeight: 600,
            color: "#39353D",
            fontSize: { xs: "1rem", sm: "1.2rem" },
          }}
        >
          Password Management
        </Typography>
        <Typography sx={{ fontSize: "13px", mb: "10px" }}>
          Make changes to your password
        </Typography>
      </Box>

      <Divider variant="middle" />

      <Box sx={{ my: 4 }}>
        <form>
          <Stack sx={{ width: { xs: "100%", sm: "50%" } }}>
            <Box sx={{ my: 3 }}>
              <Typography
                sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
              >
                Password
              </Typography>

              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
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
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
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
              <Typography
                sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
              >
                New password
              </Typography>

              <Controller
                name="newPassword"
                control={control}
                rules={{ required: true }}
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
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
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
            </Box>
            {focusNewPassword && (
              <ListItem>{errors?.newPassword?.message}</ListItem>
            )}

            <Box sx={{ my: 3 }}>
              <Typography
                sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
              >
                Confirm password
              </Typography>

              <Controller
                name="confirmPassword"
                control={control}
                rules={{ required: true }}
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
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              my: 4,
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                width: { xs: "fit-content", md: "30%" },
                textTransform: "capitalize",
              }}
            >
              Save&nbsp;Changes
            </Button>
          </Box>
        </form>
      </Box>

      <DeactivateAccount />
    </main>
  );
};

export default Password;
