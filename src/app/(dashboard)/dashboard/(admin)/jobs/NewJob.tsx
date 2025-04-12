// *React Imports
import { useState, useEffect } from "react";

// *Icon Imports
import Icon from "@/@core/component/icon";
import Loader from '@/@core/utils/loader';

// *Custom Component Imports
import CustomTextField from "@/@core/component/mui/text-field";

// *Utility Imports
import { newJobSchema } from "@/@core/formSchema";

// *Third Party Imports
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
import Chip from "@mui/material/Chip";
import { Autocomplete, IconButton, TextFieldProps, CircularProgress } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

import { createJob } from "@/@core/services/jobService";

interface Props {
  open: boolean;
  close: () => void;
}

interface IFormInput {
  title: string;
  type: string;
  description: string;
  requirement: string;
  skill: string[];
  location: string;
  currency: string;
  minSalary: string;
  maxSalary: string;
  application_deadline: string;
  information: string;
  client_id: string;
}

interface Client {
  id: number;
  name: string;
  email: string;
  account_type: string;
}

const defaultValues = {
  title: "",
  type: "",
  description: "",
  requirement: "",
  skill: [],
  location: "",
  currency: "",
  minSalary: "",
  maxSalary: "",
  application_deadline: "",
  information: "",
  client_id: "",
};

const availableSkills = [
  "DEVELOPER",
  "DESIGNER",
  "MARKETER",
  "MANAGER",
  "WRITER",
];

const NewJob = ({ open, close }: Props) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>("");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);


  useEffect(() => {
    // Fetch clients when the dialog opens
    if (open) {
      fetchClients();
    }
  }, [open]);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.tbo-taas.com/api/v1/users");
      if (!response.ok) {
        throw new Error("Failed to fetch clients");
      }
      const data = await response.json();
      // Filter only users with account_type of CLIENT
      const clientUsers = data.filter((user: Client) => user.account_type === "CLIENT");
      setClients(clientUsers);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSelectedSkills((prev) => prev.filter((s) => s !== skill));
  };

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    defaultValues: defaultValues,
    mode: "onChange",
    resolver: yupResolver(newJobSchema),
  });

  const submitForm: SubmitHandler<IFormInput> = (values) => {
    setSubmitting(true); // Show loader when submission starts
    
    const jobData = {
      title: values.title,
      job_type: values.type,
      description: values.description,
      requirements: values.requirement,
      skill: values.skill.join(", "), // Join the selected skills as a string
      currency: values.currency,
      minimum_salary: parseInt(values.minSalary),
      maximum_salary: parseInt(values.maxSalary),
      location: values.location,
      application_deadline: dayjs(selectedDate).format("YYYY-MM-DD"), // Convert the selected date to the required format
      additional_info: values.information,
      client_id: parseInt(values.client_id) // Add client_id to the job data
    };
  
    createJob(jobData)
    .then((response) => {
      console.log("Job created:", response);
      reset();
      close();
    })
    .catch((error) => {
      console.error("Error creating job:", error);
    })
    .finally(() => {
      setSubmitting(false); // Hide loader when submission completes or fails
    });
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
              Add New Job
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
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ fontWeight: 600, fontSize: "1.2rem", mb: 2 }}>
                Job Details
              </Typography>
              <Grid container spacing={4}>
                {/* Client Selection Field - Added at the top */}
                <Grid item xs={12} md={12}>
                  <Typography sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}>
                    Select Company
                  </Typography>

                  <Controller
                    name="client_id"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        select
                        value={value}
                        onChange={onChange}
                        size="medium"
                        placeholder="Select a Company..."
                        error={Boolean(errors.client_id)}
                        helperText={errors.client_id?.message || "Please select a Company for this job"}
                        InputProps={{
                          endAdornment: loading ? <CircularProgress size={20} /> : null,
                        }}
                      >
                        {clients.map((client) => (
                          <MenuItem key={client.id} value={client.id.toString()}>
                            {client.name} ({client.email})
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}>
                    Job Title
                  </Typography>

                  <Controller
                    name="title"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        onChange={onChange}
                        size="medium"
                        placeholder="Front Desk..."
                        error={Boolean(errors.title)}
                        helperText={errors.title?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}>
                    Job Type
                  </Typography>

                  <Controller
                    name="type"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        onChange={onChange}
                        size="medium"
                        select
                        placeholder="ABC Holdings..."
                        error={Boolean(errors.type)}
                        helperText={errors.type?.message}
                      >
                        <MenuItem value="FULLTIME">Full Time</MenuItem>
                        <MenuItem value="PARTTIME">Part Time</MenuItem>
                        <MenuItem value="CONTRACT">Contract</MenuItem>
                        <MenuItem value="INTERNSHIP">Internship</MenuItem>
                        <MenuItem value="FREELANCE">Freelance</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <Typography sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}>
                    Description
                  </Typography>

                  <Controller
                    name="description"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        multiline
                        rows={5}
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
                        placeholder="Enter job description..."
                        error={Boolean(errors.description)}
                        helperText={errors.description?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <Typography sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}>
                    Requirements
                  </Typography>

                  <Controller
                    name="requirement"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        multiline
                        rows={5}
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
                        placeholder="Enter job requirements..."
                        error={Boolean(errors.requirement)}
                        helperText={errors.requirement?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <Typography sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}>
                    Skills
                  </Typography>

                  <Controller
                    name="skill"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Autocomplete
                        multiple
                        freeSolo
                        options={availableSkills}
                        value={value}
                        onChange={(event, newValue) => {
                          onChange(newValue);
                        }}
                        renderTags={(value: string[], getTagProps) =>
                          value.map((option, index) => {
                            const tagProps = getTagProps({ index });
                            const { key, ...restProps } = tagProps;
                            return (
                              <Chip
                                key={key}
                                variant="outlined"
                                label={option}
                                {...restProps}
                                sx={{ margin: 0.5 }}
                              />
                            );
                          })
                        }
                        renderInput={(params) => (
                          <CustomTextField
                            {...params}
                            fullWidth
                            size="medium"
                            placeholder="Select or add job skills..."
                            InputProps={{
                              ...params.InputProps,
                              disableUnderline: true,
                              sx: {
                                "& textarea": {
                                  overflow: "hidden",
                                  resize: "none",
                                },
                              },
                            }}
                            error={Boolean(errors.skill)}
                            helperText={errors.skill?.message}
                          />
                        )}
                      />
                    )}
                  />

                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                    {selectedSkills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        onDelete={() => handleRemoveSkill(skill)}
                        deleteIcon={
                          <IconButton>
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        }
                      />
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={2} md={2}>
                  <Typography sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}>
                    Currency
                  </Typography>

                  <Controller
                    name="currency"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        select
                        value={value}
                        onChange={onChange}
                        size="medium"
                        sx={{ overflow: "hidden" }}
                        error={Boolean(errors.currency)}
                        helperText={errors.currency?.message}
                      >
                        <MenuItem value="NGN">₦</MenuItem>
                        <MenuItem value="EUR">£</MenuItem>
                        <MenuItem value="USD">$</MenuItem>
                        <MenuItem value="GBP">¥</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={5}>
                  <Typography sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}>
                    Minimum
                  </Typography>

                  <Controller
                    name="minSalary"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        onChange={onChange}
                        size="medium"
                        placeholder="1"
                        error={Boolean(errors.minSalary)}
                        helperText={errors.minSalary?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={5}>
                  <Typography sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}>
                    Maximum
                  </Typography>

                  <Controller
                    name="maxSalary"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        onChange={onChange}
                        size="medium"
                        placeholder="999999"
                        error={Boolean(errors.maxSalary)}
                        helperText={errors.maxSalary?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}>
                    Location
                  </Typography>

                  <Controller
                    name="location"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        value={value}
                        onChange={onChange}
                        size="medium"
                        placeholder="South Gate, CA Allen FL"
                        error={Boolean(errors.location)}
                        helperText={errors.location?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}>
                    Application Deadline
                  </Typography>
                  <Controller
                    name="application_deadline"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        disablePast
                        value={value ? dayjs(value) : null}
                        onChange={(newDate) => {
                          const formattedDate = newDate
                            ? newDate.format("YYYY-MM-DD")
                            : null;
                          onChange(formattedDate);
                          setSelectedDate(formattedDate);
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}>
                    Additional Information
                  </Typography>

                  <Controller
                    name="information"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        multiline
                        rows={5}
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
                        placeholder="Any additional information..."
                        error={Boolean(errors.information)}
                        helperText={errors.information?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>

            
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
              disabled={isSubmitting || submitting}
              sx={{ textTransform: "capitalize", width: "30%" }}
            >
              {submitting ? <CircularProgress size={24} color="inherit" /> : "Create Job"}
            </Button>
          </DialogActions>
          </DialogContent>
        </form>
        <Loader loading={submitting} />
      </Dialog>
    </div>
  );
};

export default NewJob;