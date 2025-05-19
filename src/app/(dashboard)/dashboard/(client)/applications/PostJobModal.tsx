// *React Imports
import { useState } from "react";

// *Icon Imports
import Icon from "@/@core/component/icon";

// *Custom Component Imports
import CustomTextField from "@/@core/component/mui/text-field";

// *Utility Imports
import { newJobSchema2 } from "@/@core/formSchema";

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
import { Autocomplete, IconButton, TextFieldProps } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

import { createJobclient }  from "@/@core/services/jobService"

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
    resolver: yupResolver(newJobSchema2),
  });

  const submitForm: SubmitHandler<IFormInput> = (values) => {
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
    };
  
    createJobclient(jobData)
      .then((response) => {
        console.log("Job created:", response);
        reset();
        close();
      })
      .catch((error) => {
        console.error("Error creating job:", error);
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
              <Typography sx={{ fontWeight: 600, fontSize: "1.2rem", mb: 2 }}>
                Job Details
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography
                    sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
                  >
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
                  <Typography
                    sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
                  >
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
                        {/* <MenuItem value="CONTRACT">Contract</MenuItem> */}
                        <MenuItem value="INTERNSHIP">Internship</MenuItem>
                        <MenuItem value="FREELANCE">Freelance</MenuItem>
                      </CustomTextField>
                           
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <Typography
                    sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
                  >
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
                  <Typography
                    sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
                  >
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
                  <Typography
                    sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
                  >
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

                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}
                  >
                    {selectedSkills.map((skill) => (
                      <Chip
                        key={skill} // Ensure the key is unique
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
                  <Typography
                    sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
                  >
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
                  <Typography
                    sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
                  >
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
                        placeholder="$1"
                        error={Boolean(errors.minSalary)}
                        helperText={errors.minSalary?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={5}>
                  <Typography
                    sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
                  >
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
                        placeholder="$999999"
                        error={Boolean(errors.maxSalary)}
                        helperText={errors.maxSalary?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography
                    sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
                  >
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
                  <Typography
                    sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
                  >
                    Application Deadline
                  </Typography>
                  <Controller
                    name="application_deadline"
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

                <Grid item xs={12}>
                  <Typography
                    sx={{ fontWeight: 600, fontSize: "14px", mb: "10px" }}
                  >
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
                disabled={isSubmitting}
                sx={{ textTransform: "capitalize", width: "30%" }}
              >
                Post
              </Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default NewJob;
