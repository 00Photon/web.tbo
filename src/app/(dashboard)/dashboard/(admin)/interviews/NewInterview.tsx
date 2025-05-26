// *React Imports
import { useState, useEffect } from "react";

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

import { scheduleInterview } from "@/@core/services/interviewService";
import { getAppliedJob } from "@/@core/services/jobVanciesService";

interface Props {
  open: boolean;
  close: () => void;
}

interface Job {
  id: number;
  title: string;
  job_type: string;
  description: string;
  requirements: string;
  skill: string;
  currency: string;
  minimum_salary: string;
  maximum_salary: string;
  location: string;
  application_deadline: string;
  additional_info: string | null;
  created_by: number;
  client_id: number;
  created_at: string;
  updated_at: string;
  status: string;
  applicant_count: number;
  client: Client;
}

interface Client {
  id: number;
  name: string;
  account_type: string;
  company_logo: string | null;
  company_name: string | null;
  company_email_address: string | null;
  industry: string | null;
  number_of_employees: number | null;
  type_of_employer: string | null;
  company_address: string | null;
  company_phone_number: string | null;
  country: string | null;
  company_website: string | null;
  contact_person: string | null;
  work_email: string | null;
  position_in_company: string | null;
  phone_number: string | null;
  cv_upload: string | null;
  cover_letter_upload: string | null;
  id_upload: string | null;
  video_url: string | null;
  project_screenshots: string | null;
  work_sample_upload: string | null;
  portfolio_link: string | null;
  profile_image: string | null;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  status: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone_number: string | null;
  account_type: string;
  company_logo: string | null;
  company_name: string | null;
  company_email_address: string | null;
  industry: string | null;
  number_of_employees: string | null;
  type_of_employer: string | null;
  company_address: string | null;
  company_phone_number: string | null;
  country: string | null;
  company_website: string | null;
  contact_person: string | null;
  work_email: string | null;
  position_in_company: string | null;
  cv_upload: string | null;
  cover_letter_upload: string | null;
  id_upload: string | null;
  video_url: string | null;
  project_screenshots: string | null;
  work_sample_upload: string | null;
  portfolio_link: string | null;
  profile_image: string | null;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  status: string;
}

interface Application {
  id: number;
  job_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  status: string;
  job: Job;
  user: User;
}

interface IFormInput {
  applicationId: number;
  userId: number;
  interviewerName: string;
  interviewerDepartment: string;
  interviewerEmail: string;
  interviewerPhone: string;
  interviewDate: string;
  interviewTime: string;
  duration: string;
  format: string;
  information?: string;
  reminder?: string;
  tboRepName: string;
  tboRepEmail: string;
  tboRepPhone: string;
}

const defaultValues: IFormInput = {
  applicationId: 0,
  userId: 0,
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
  tboRepName: "",
  tboRepEmail: "",
  tboRepPhone: "",
};

const NewInterview = ({ open, close }: Props) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    control,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(interviewSchema),
  });

  // Watch applicationId to update userId when changed
  const selectedApplicationId = watch("applicationId");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const applications = await getAppliedJob();
        setApplications(applications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchApplications();
    }
  }, [open]);

  useEffect(() => {
    if (selectedApplicationId) {
      const selectedApp = applications.find((app) => app.id === selectedApplicationId);
      if (selectedApp) {
        setValue("userId", selectedApp.user_id);
      }
    }
  }, [selectedApplicationId, applications, setValue]);

  const submitForm: SubmitHandler<IFormInput> = async (values) => {
    try {
      const formattedData = {
        application_id: values.applicationId,
        user_id: values.userId,
        interview_date: values.interviewDate,
        interview_time: values.interviewTime,
        interview_location: values.format === "In-Person" ? "Company Headquarters, Meeting Room 3" : "Virtual",
        interviewer_department: values.interviewerDepartment,
        interviewer_name: values.interviewerName,
        interviewer_role: values.interviewerName, // Can be made dynamic if needed
        interviewer_email: values.interviewerEmail,
        interviewer_phone: values.interviewerPhone,
        tbo_rep_name: values.tboRepName,
        tbo_rep_email: values.tboRepEmail,
        tbo_rep_phone: values.tboRepPhone,
        status: "Scheduled",
      };
      const response = await scheduleInterview(formattedData);
      console.log("Interview scheduled successfully:", response);
      alert("Interview scheduled successfully!");
      reset();
      close();
    } catch (error) {
      console.error("Error scheduling interview:", error);
      alert("Failed to schedule interview. Please try again.");
    }
  };

  return (
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
            borderRadius: "10px",
            overflowY: "scroll",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography sx={{ mt: 4, mb: 2, fontWeight: 600 }}>Application Details</Typography>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}>
                  Select Candidate
                </Typography>
                <Controller
                  name="applicationId"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      onChange={onChange}
                      size="medium"
                      select
                      disabled={loading}
                      error={Boolean(errors.applicationId)}
                      helperText={errors.applicationId?.message}
                    >
                      <MenuItem value={0} disabled>
                        {loading ? "Loading applications..." : "Select an application"}
                      </MenuItem>
                      {applications.map((app) => (
                        <MenuItem key={app.id} value={app.id}>
                          {app.job.title} - {app.user.name} - {app.user.email}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  )}
                />
              </Grid>
            </Grid>

            <Typography sx={{ mt: 4, mb: 2, fontWeight: 600 }}>Interviewer Information</Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}>
                  Interviewer Name
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
                      placeholder="John Doe"
                      error={Boolean(errors.interviewerName)}
                      helperText={errors.interviewerName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}>
                  Department
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
                      placeholder="HR Management"
                      error={Boolean(errors.interviewerDepartment)}
                      helperText={errors.interviewerDepartment?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}>
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
                      placeholder="johndoe@example.com"
                      error={Boolean(errors.interviewerEmail)}
                      helperText={errors.interviewerEmail?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}>
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
                      placeholder="+1234567890"
                      error={Boolean(errors.interviewerPhone)}
                      helperText={errors.interviewerPhone?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Typography sx={{ mt: 4, mb: 2, fontWeight: 600 }}>Interview Details</Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}>
                  Interview Date
                </Typography>
                <Controller
                  name="interviewDate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <DatePicker
                      value={value ? dayjs(value) : null}
                      onChange={(date) => onChange(date ? date.format("YYYY-MM-DD") : "")}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          size: "medium",
                          error: Boolean(errors.interviewDate),
                          helperText: errors.interviewDate?.message,
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}>
                  Interview Time
                </Typography>
                <Controller
                  name="interviewTime"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TimeField
                      value={value ? dayjs(`2023-01-01T${value}`) : null}
                      onChange={(time) => onChange(time ? time.format("HH:mm:ss") : "")}
                      format="HH:mm:ss"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          size: "medium",
                          error: Boolean(errors.interviewTime),
                          helperText: errors.interviewTime?.message,
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}>
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
                      <MenuItem value="30">30 minutes</MenuItem>
                      <MenuItem value="60">1 hour</MenuItem>
                      <MenuItem value="90">1.5 hours</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}>
                  Interview Format
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
                      <MenuItem value="In-Person">In-Person</MenuItem>
                      <MenuItem value="Virtual">Virtual</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>
           
            </Grid>
            <Typography sx={{ mt: 4, mb: 2, fontWeight: 600 }}>TBO Representative Information</Typography>
<Grid container spacing={4}>
  <Grid item xs={12} md={6}>
    <Typography sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}>
      TBO Representative Name
    </Typography>
    <Controller
      name="tboRepName"
      control={control}
      rules={{ required: true }}
      render={({ field: { value, onChange } }) => (
        <CustomTextField
          fullWidth
          value={value}
          onChange={onChange}
          size="medium"
          placeholder="Jane Smith"
          error={Boolean(errors.tboRepName)}
          helperText={errors.tboRepName?.message}
        />
      )}
    />
  </Grid>
  <Grid item xs={12} md={6}>
    <Typography sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}>
      TBO Email Address
    </Typography>
    <Controller
      name="tboRepEmail"
      control={control}
      rules={{ required: true }}
      render={({ field: { value, onChange } }) => (
        <CustomTextField
          fullWidth
          value={value}
          onChange={onChange}
          size="medium"
          placeholder="janesmith@example.com"
          error={Boolean(errors.tboRepEmail)}
          helperText={errors.tboRepEmail?.message}
        />
      )}
    />
  </Grid>
  <Grid item xs={12} md={6}>
    <Typography sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}>
      TBO Phone Number
    </Typography>
    <Controller
      name="tboRepPhone"
      control={control}
      rules={{ required: true }}
      render={({ field: { value, onChange } }) => (
        <CustomTextField
          fullWidth
          value={value}
          onChange={onChange}
          size="medium"
          placeholder="+1234567890"
          error={Boolean(errors.tboRepPhone)}
          helperText={errors.tboRepPhone?.message}
        />
      )}
    />
  </Grid>

  <Grid item xs={12}>
                <Typography sx={{ fontWeight: 500, fontSize: "14px", mb: "10px" }}>
                  Additional Information (Optional)
                </Typography>
                <Controller
                  name="information"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      onChange={onChange}
                      size="medium"
                      multiline
                      rows={3}
                      placeholder="Any additional details..."
                    />
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
            type="submit"
            variant="contained"
            sx={{ textTransform: "capitalize", width: "30%", mb: 4 }}
            disabled={isSubmitting || !selectedApplicationId}
          >
            Schedule Interview
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NewInterview;