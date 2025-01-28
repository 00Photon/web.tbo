// *React Imports
import { useState } from "react";

// *Icon Imports
import Icon from "@/@core/component/icon";

// *Custom Component Imports
import CustomTextField from "@/@core/component/mui/text-field";

// *Utility Imports
import { interviewSchema } from "@/@core/formSchema";

// *Third Party Imports
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs from "dayjs";

// *MUI Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

interface Props {
  open: boolean;
  close: () => void;
}

interface IFormInput {
  // candidate Info
  fullName: string;
  positionApplied: string;
  candidateEmail: string;
  candidatePhone: string;
  // Interviewer Info
  interviewerName: string;
  interviewerDepartment: string;
  interviewerEmail: string;
  interviewerPhone: string;
  // interview details
  interviewDate: string;
  interviewTime: string;
  duration: string;
  format: string;
  information?: string;
  reminder?: string;
}

const defaultValues = {
  fullName: "",
  positionApplied: "",
  candidateEmail: "",
  candidatePhone: "",
  interviewerName: "",
  interviewerDepartment: "",
  interviewerEmail: "",
  interviewerPhone: "",
  interviewDate: "",
  interviewTime: "",
  duration: "",
  format: "",
  information: "",
  reminder: "",
};

const NewInterview = ({ open, close }: Props) => {
  const [selectedDate, setSelectedDate] = useState<string | null>("");

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    defaultValues: defaultValues,
    mode: "onChange",
    resolver: yupResolver(interviewSchema),
  });

  const submitForm: SubmitHandler<IFormInput> = (values) => {
    try {
      console.log(values); // Check if values are correctly logged
      // You can perform your API call here
    } catch (error) {
      console.error("Submission Error:", error); // Log any errors during submission
    }
  };

  return (
    <div>
      <Dialog
        disableScrollLock
        open={open}
        sx={{
          "& .MuiPaper-root": {
            width: "100%",
            minWidth: { md: 800 },
            borderRadius: "8px",
            mx: "auto",
          },
        }}
      >
        <form onSubmit={handleSubmit(submitForm)}>
          <Box sx={{ display: "flex", alignItems: "center", p: 3 }}>
            <Button onClick={close} sx={{ color: "#111" }}>
              <Icon icon="basil:caret-left-solid" fontSize={25} />
            </Button>

            <Typography
              sx={{
                flex: 1,
                textAlign: "center",
                fontWeight: 600,
                fontSize: { xs: "1rem", md: "1.2rem" },
                mr: "4rem",
              }}
            >
              Schedule Interview
            </Typography>
          </Box>

          <DialogContent
            sx={{
              pb: (theme) => `${theme.spacing(4)} !important`,
              px: (theme) => [`${theme.spacing(4)} !important`],
              m: (theme) => theme.spacing(3),
              //   background: (theme) => theme.palette.secondary.main,
              borderRadius: "10px",
              overflowY: "scroll",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
                Candidate Information:
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}
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
                        placeholder="John Abraham"
                        error={Boolean(errors.fullName)}
                        helperText={errors.fullName?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}
                  >
                    Position applied for
                  </Typography>

                  <Controller
                    name="positionApplied"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        onChange={onChange}
                        size="medium"
                        placeholder="Front Desk Officer"
                        error={Boolean(errors.positionApplied)}
                        helperText={errors.positionApplied?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}
                  >
                    Email Address
                  </Typography>

                  <Controller
                    name="candidateEmail"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        onChange={onChange}
                        size="medium"
                        placeholder="example@gmail.com"
                        error={Boolean(errors.candidateEmail)}
                        helperText={errors.candidateEmail?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}
                  >
                    Phone Number
                  </Typography>

                  <Controller
                    name="candidatePhone"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        onChange={onChange}
                        size="medium"
                        placeholder="+234-000-000-00"
                        error={Boolean(errors.candidatePhone)}
                        helperText={errors.candidatePhone?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Typography sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
                Interviewer Information:
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}
                  >
                    Interviewer(s) Name(s)
                  </Typography>

                  <Controller
                    name="interviewerName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        onChange={onChange}
                        size="medium"
                        placeholder="John Abraham, Samantha Paul, Aisha Isah"
                        error={Boolean(errors.interviewerName)}
                        helperText={errors.interviewerName?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}
                  >
                    Department/Role
                  </Typography>

                  <Controller
                    name="interviewerDepartment"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        onChange={onChange}
                        size="medium"
                        placeholder="Human Resource"
                        error={Boolean(errors.interviewerDepartment)}
                        helperText={errors.interviewerDepartment?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}
                  >
                    Email Address
                  </Typography>

                  <Controller
                    name="interviewerEmail"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        onChange={onChange}
                        size="medium"
                        placeholder="example@gmail.com"
                        error={Boolean(errors.interviewerEmail)}
                        helperText={errors.interviewerEmail?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}
                  >
                    Phone Number
                  </Typography>

                  <Controller
                    name="interviewerPhone"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        onChange={onChange}
                        size="medium"
                        placeholder="+234-000-000-00"
                        error={Boolean(errors.interviewerPhone)}
                        helperText={errors.interviewerPhone?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Typography sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
                Interview Details:
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}
                  >
                    Date
                  </Typography>
                  <Controller
                    name="interviewDate"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        disablePast
                        value={value ? dayjs(value) : null} // Use the value from the controller
                        onChange={(newDate) => {
                          const formattedDate = newDate
                            ? newDate.format("YYYY-MM-DD")
                            : null;
                          onChange(formattedDate); // Call onChange with the formatted date
                          setSelectedDate(formattedDate); // Also update selectedDate
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}
                  >
                    Time
                  </Typography>
                  <Controller
                    name="interviewTime"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TimeField defaultValue={dayjs("2022-04-17T15:30")} />
                      // <DatePicker
                      //   disablePast
                      //   value={value ? dayjs(value) : null} // Use the value from the controller
                      //   onChange={(newDate) => {
                      //     const formattedDate = newDate
                      //       ? newDate.format("YYYY-MM-DD")
                      //       : null;
                      //     onChange(formattedDate); // Call onChange with the formatted date
                      //     setSelectedDate(formattedDate); // Also update selectedDate
                      //   }}
                      // />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}
                  >
                    Duration
                  </Typography>

                  <Controller
                    name="duration"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        onChange={onChange}
                        size="medium"
                        select
                        error={Boolean(errors.duration)}
                        helperText={errors.duration?.message}
                      >
                        <MenuItem value="1">1hour</MenuItem>
                        <MenuItem value="2">2hour</MenuItem>
                        <MenuItem value="3">3hour</MenuItem>
                        <MenuItem value="4">4hour</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}
                  >
                    Format
                  </Typography>

                  <Controller
                    name="format"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        onChange={onChange}
                        size="medium"
                        select
                        error={Boolean(errors.format)}
                        helperText={errors.format?.message}
                      >
                        <MenuItem value="physical">Physical</MenuItem>
                        <MenuItem value="virtual">Virtual</MenuItem>
                        <MenuItem value="hybrid">Hybrid</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid>
              </Grid>

              <Typography sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
                Additional Information
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}
                  >
                    Send special instructions
                  </Typography>

                  <Controller
                    name="information"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        multiline
                        rows={4}
                        value={value}
                        onChange={onChange}
                        size="medium"
                        InputProps={{
                          disableUnderline: true,
                          sx: {
                            "& textarea": {
                              overflow: "hidden",
                              resize: "none",
                            },
                          },
                        }}
                        placeholder="Enter Text..."
                        error={Boolean(errors.information)}
                        helperText={errors.information?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}
                  >
                    Confirmation & Reminder
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}
                  >
                    Send Reminder to:
                  </Typography>

                  <Controller
                    name="reminder"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        onChange={onChange}
                        size="medium"
                        select
                        error={Boolean(errors.reminder)}
                        helperText={errors.reminder?.message}
                      >
                        <MenuItem value="candidate">Select Candidate</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>

          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Button
              type="submit" // Updated to submit the form
              variant="contained"
              sx={{ textTransform: "capitalize", width: "30%", mb: 4 }}
              disabled={isSubmitting} // Disable button during submission
            >
              Schedule Interview
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default NewInterview;
