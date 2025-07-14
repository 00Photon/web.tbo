import React, { useEffect, useState, useMemo } from "react";
import Icon from "@/@core/component/icon";
import Link from "next/link";
import CustomTextField from "@/@core/component/mui/text-field";
import { TableCellStyled } from "@/@core/component/mui/tableStyled";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CustomChip from "@/@core/component/mui/chip";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import InputAdornment from "@mui/material/InputAdornment";
import { Avatar, Menu } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme } from "@mui/material/styles";
import PostJobModal from "./PostJobModal";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem as SelectMenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import {
  fetchJobsClients,
  fetchJobsclinetsById,
  deleteJobById,
  editJobClient,
} from "@/@core/services/jobService";

interface Job {
  id: number;
  title: string;
  job_type: string;
  description: string;
  requirements: string;
  skills: string[];
  currency: string;
  minimum_salary: string;
  maximum_salary: string;
  salary_type?: string;
  location: string;
  application_deadline: string;
  additional_info?: string;
  created_by: number;
  client_id: number;
  created_at: string;
  updated_at: string;
  status: string;
  applicant_count: number;
}

const ConfirmDialog: React.FC<{
  open: boolean;
  title?: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
}> = ({
  open,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  onCancel,
  onConfirm,
}) => (
  <Dialog open={open} onClose={onCancel}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Typography>{description}</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>Cancel</Button>
      <Button onClick={onConfirm} color="error" variant="contained">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

const EditJobModal: React.FC<{
  open: boolean;
  job: Job | null;
  close: () => void;
  onJobUpdated: (updatedJob: Job) => void;
}> = ({ open, job, close, onJobUpdated }) => {
  const [formData, setFormData] = useState({
    title: "",
    job_type: "",
    description: "",
    requirements: "",
    skills: [] as string[],
    currency: "",
    minimum_salary: 0,
    maximum_salary: 0,
    salary_type: "",
    location: "",
    application_deadline: "",
    additional_info: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skillsInput, setSkillsInput] = useState("");

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        job_type: job.job_type,
        description: job.description,
        requirements: job.requirements,
        skills: job.skills || [],
        currency: job.currency,
        minimum_salary: parseFloat(job.minimum_salary),
        maximum_salary: parseFloat(job.maximum_salary),
        salary_type: job.salary_type || "annual",
        location: job.location,
        application_deadline: job.application_deadline.split("T")[0],
        additional_info: job.additional_info || "",
      });
      setSkillsInput(job.skills?.join(", ") || "");
    } else {
      setFormData({
        title: "",
        job_type: "",
        description: "",
        requirements: "",
        skills: [],
        currency: "",
        minimum_salary: 0,
        maximum_salary: 0,
        salary_type: "",
        location: "",
        application_deadline: "",
        additional_info: "",
      });
      setSkillsInput("");
    }
  }, [job]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    if (name === "skills") {
      setSkillsInput(value as string);
      setFormData((prev) => ({
        ...prev,
        skills: (value as string)
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name as string]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!job) return;
    if (formData.skills.length === 0) {
      setError("At least one skill is required.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const updatedJob = await editJobClient(job.id, formData);
      onJobUpdated({
        ...updatedJob.job,
        skills: JSON.parse(updatedJob.job.skill || "[]"),
      });
      close();
    } catch (err: any) {
      setError(err.message || "Failed to update job");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onClose={close} maxWidth="md" fullWidth>
      <DialogTitle>Edit Job</DialogTitle>
      <DialogContent>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
          <TextField
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
          />
          <FormControl fullWidth>
            <InputLabel>Job Type</InputLabel>
            <Select
              name="job_type"
              value={formData.job_type}
              onChange={handleChange}
              required
            >
              <SelectMenuItem value="FULLTIME">Full Time</SelectMenuItem>
              <SelectMenuItem value="PARTTIME">Part Time</SelectMenuItem>
              <SelectMenuItem value="INTERNSHIP">Internship</SelectMenuItem>
              <SelectMenuItem value="FREELANCE">Freelance</SelectMenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            required
          />
          <TextField
            label="Requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            required
          />
          <TextField
            label="Skills (comma-separated)"
            name="skills"
            value={skillsInput}
            onChange={handleChange}
            fullWidth
            required
            helperText="Enter skills separated by commas (e.g., JavaScript, Python, React)"
          />
          <FormControl fullWidth>
            <InputLabel>Currency</InputLabel>
            <Select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              required
            >
              <SelectMenuItem value="NGN">NGN</SelectMenuItem>
              <SelectMenuItem value="USD">USD</SelectMenuItem>
              <SelectMenuItem value="EUR">EUR</SelectMenuItem>
              <SelectMenuItem value="GBP">GBP</SelectMenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Minimum Salary"
            name="minimum_salary"
            type="number"
            value={formData.minimum_salary}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Maximum Salary"
            name="maximum_salary"
            type="number"
            value={formData.maximum_salary}
            onChange={handleChange}
            fullWidth
            required
          />
          <FormControl fullWidth>
            <InputLabel>Salary Type</InputLabel>
            <Select
              name="salary_type"
              value={formData.salary_type}
              onChange={handleChange}
              required
            >
              <SelectMenuItem value="ANNUALLY">Annual</SelectMenuItem>
              <SelectMenuItem value="MONTHLY">Monthly</SelectMenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Application Deadline"
            name="application_deadline"
            type="date"
            value={formData.application_deadline}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
          />
          <TextField
            label="Additional Information"
            name="additional_info"
            value={formData.additional_info}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const JobDetailsModal: React.FC<{
  open: boolean;
  job: Job | null;
  close: () => void;
}> = ({ open, job, close }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (job) {
      setLoading(false);
    }
  }, [job]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!job) {
    return <Typography></Typography>;
  }

  return (
    <Dialog open={open} onClose={close} maxWidth="md" fullWidth>
      <DialogTitle>{job.title}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <Typography variant="h6">Job Details</Typography>
          <Typography><strong>Type:</strong> {job.job_type}</Typography>
          <Typography><strong>Location:</strong> {job.location}</Typography>
          <Typography><strong>Salary:</strong> {job.currency} {job.minimum_salary} - {job.maximum_salary}</Typography>
          <Typography><strong>Deadline:</strong> {new Date(job.application_deadline).toLocaleDateString()}</Typography>
          <Typography><strong>Status:</strong> {job.status}</Typography>
          <Typography><strong>Applicants:</strong> {job.applicant_count}</Typography>
          
          <Typography variant="h6" sx={{ mt: 2 }}>Description</Typography>
          <Typography>{job.description}</Typography>
          
          <Typography variant="h6" sx={{ mt: 2 }}>Requirements</Typography>
          <Typography>{job.requirements}</Typography>
          
          <Typography variant="h6" sx={{ mt: 2 }}>Skills</Typography>
          <Typography>{job.skills.join(", ")}</Typography>
          
          <Typography variant="h6" sx={{ mt: 2 }}>Additional Info</Typography>
          <Typography>{job.additional_info}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

const JobListTable: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<(HTMLElement | null)[]>([]);
  const [openPostJobModal, setOpenPostJobModal] = useState(false);
  const [openEditJobModal, setOpenEditJobModal] = useState(false);
  const [openJobDetailsModal, setOpenJobDetailsModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<{ id: number; index: number } | null>(null);

  const smallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetchJobsClients();
        if (response.status) {
          setJobs(response.jobs);
          setTotalJobs(response.total || response.jobs.length);
          setAnchorEl(Array(response.jobs.length).fill(null));
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    let result = jobs;

    if (status && status !== "0") {
      result = result.filter((job) => job.status.toLowerCase() === status.toLowerCase());
    }

    if (jobType && jobType !== "0") {
      result = result.filter((job) => job.job_type.toLowerCase() === jobType.toLowerCase());
    }

    if (value) {
      const searchTerm = value.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm) ||
          job.job_type.toLowerCase().includes(searchTerm) ||
          job.location.toLowerCase().includes(searchTerm)
      );
    }

    return result;
  }, [jobs, status, jobType, value]);

  useEffect(() => {
    setTotalJobs(filteredJobs.length);
    setPage(0);
  }, [filteredJobs]);

  const paginatedJobs = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredJobs.slice(start, start + rowsPerPage);
  }, [filteredJobs, page, rowsPerPage]);

  const requestDeleteJob = (id: number, index: number) => {
    setJobToDelete({ id, index });
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!jobToDelete) return;
    const { id, index } = jobToDelete;

    try {
      const response = await deleteJobById(id);
      if (response.status) {
        const updatedJobs = [...jobs];
        updatedJobs.splice(jobs.findIndex((job) => job.id === id), 1);
        setJobs(updatedJobs);
        setAnchorEl(Array(updatedJobs.length).fill(null));
        handleRowOptionsClose(index);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    } finally {
      setConfirmDialogOpen(false);
      setJobToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDialogOpen(false);
    setJobToDelete(null);
  };

  const handleOpenModal = () => setOpenPostJobModal(true);
  const handleCloseModal = () => setOpenPostJobModal(false);

  const handleOpenEditModal = (job: Job) => {
    setSelectedJob(job);
    setOpenEditJobModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditJobModal(false);
    setSelectedJob(null);
  };

  const handleOpenJobDetailsModal = (job: Job) => {
    setSelectedJob(job);
    setOpenJobDetailsModal(true);
  };

  const handleCloseJobDetailsModal = () => {
    setOpenJobDetailsModal(false);
    setSelectedJob(null);
  };

  const loadJobs = async () => {
    try {
      setLoading(true);
      const response = await fetchJobsClients();
      if (response.status) {
        setJobs(response.jobs);
        setTotalJobs(response.total || response.jobs.length);
        setAnchorEl(Array(response.jobs.length).fill(null));
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleJobUpdated = (updatedJob: Job) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
    setAnchorEl(Array(jobs.length).fill(null));
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowOptionsClick = (event: any, index: number) => {
    const newAnchorEl = [...anchorEl];
    newAnchorEl[index] = event.currentTarget;
    setAnchorEl(newAnchorEl);
  };

  const handleRowOptionsClose = (index: number) => {
    const newAnchorEl = [...anchorEl];
    newAnchorEl[index] = null;
    setAnchorEl(newAnchorEl);
  };

  const toggleFilter = () => setOpenFilter(!openFilter);

  return (
    <Card
      sx={{
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        my: (theme) => theme.spacing(4),
        background: "#fff",
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 4 } }}>
        <Collapse
          easing={"ease-in-out"}
          in={openFilter}
          timeout={500}
          unmountOnExit
          sx={{ mb: 3, boxShadow: 2 }}
        >
          <Paper sx={{ px: 3, py: 3 }}>
            <Typography sx={{ mb: 3, fontSize: { xs: "1rem", sm: "1.25rem" } }}>
              Filter
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={3}>
                <CustomTextField
                  select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  size="small"
                  placeholder="Select Status"
                  fullWidth
                  label="Status"
                >
                  <MenuItem value="0">All Statuses</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item xs={6} sm={3}>
                <CustomTextField
                  select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  size="small"
                  placeholder="Select Job Type"
                  fullWidth
                  label="Job Type"
                >
                  <MenuItem value="0">All Job Types</MenuItem>
                  <MenuItem value="FULLTIME">Full Time</MenuItem>
                  <MenuItem value="PARTTIME">Part Time</MenuItem>
                  <MenuItem value="INTERNSHIP">Internship</MenuItem>
                  <MenuItem value="FREELANCE">Freelance</MenuItem>
                </CustomTextField>
              </Grid>
            </Grid>
          </Paper>
        </Collapse>

        <Box sx={{ my: 3, mx: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 4,
            }}
          >
            <CustomTextField
              fullWidth
              value={value}
              onChange={(e) => setValue(e.target.value)}
              size="small"
              placeholder="Search jobs..."
              sx={{ maxWidth: 400 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{ color: (theme) => theme.palette.primary.main }}
                  >
                    <Icon icon="lets-icons:search-duotone" />
                  </InputAdornment>
                ),
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <Button
                onClick={toggleFilter}
                variant={openFilter ? "contained" : "outlined"}
                size="medium"
                sx={{
                  textTransform: "capitalize",
                  width: "fit-content",
                  minWidth: { md: 80 },
                }}
              >
                {smallScreen && (
                  <Typography sx={{ fontSize: ".857rem" }}>Filter</Typography>
                )}
                <Icon icon="basil:filter-outline" />
              </Button>
              <Button
                variant="contained"
                size="medium"
                onClick={handleOpenModal}
                sx={{
                  textTransform: "capitalize",
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  width: "fit-content",
                  minWidth: { md: 120 },
                }}
              >
                <Icon icon="fa6-solid:user-pen" fontSize="1.257rem" />
                {smallScreen && (
                  <Typography sx={{ fontSize: ".857rem" }}>Post Job</Typography>
                )}
              </Button>
            </Box>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow sx={{ background: (theme) => theme.palette.secondary.dark }}>
                <TableCellStyled align="left">S/N</TableCellStyled>
                <TableCellStyled align="left">Title</TableCellStyled>
                <TableCellStyled align="left">Applications</TableCellStyled>
                <TableCellStyled align="left">Posting Date</TableCellStyled>
                <TableCellStyled align="left">Application Deadline</TableCellStyled>
                <TableCellStyled align="left">Status</TableCellStyled>
                <TableCellStyled align="left">Actions</TableCellStyled>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : paginatedJobs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No jobs found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedJobs.map((item, i) => (
                  <TableRow key={item.id}>
                    <TableCell>{page * rowsPerPage + i + 1}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.applicant_count}</TableCell>
                    <TableCell>
                      {new Date(item.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(item.application_deadline).toLocaleDateString()}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ textTransform: "capitalize", fontWeight: "semibold" }}
                    >
                      <CustomChip
                        label={item.status}
                        color={item.status === "active" ? "success" : "error"}
                        skin="light"
                        size="small"
                        sx={{ width: "100%", borderRadius: "5px" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ alignSelf: "end" }}>
                        <Avatar sx={{ background: "transparent" }}>
                          <IconButton
                            size="small"
                            onClick={(event) => handleRowOptionsClick(event, i)}
                          >
                            <Icon icon="tabler:dots-vertical" />
                          </IconButton>
                          <Menu
                            keepMounted
                            disableScrollLock
                            anchorEl={anchorEl[i]}
                            open={Boolean(anchorEl[i])}
                            onClose={() => handleRowOptionsClose(i)}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            PaperProps={{ style: { minWidth: "8rem" } }}
                          >
                            <MenuItem
                              sx={{ fontSize: ".85rem", "& svg": { mr: 2 } }}
                              onClick={() => handleOpenEditModal(item)}
                            >
                              <Icon icon="tabler:edit" fontSize={20} />
                              Edit
                            </MenuItem>
                            <MenuItem
                              sx={{ fontSize: ".85rem", "& svg": { mr: 2 } }}
                              onClick={() => handleOpenJobDetailsModal(item)}
                            >
                              <Icon icon="tabler:eye" fontSize={20} />
                              View Job Details
                            </MenuItem>
                            <MenuItem sx={{ fontSize: ".85rem", "& svg": { mr: 2 } }}>
                              <Icon icon="tabler:eye" fontSize={20} />
                              <Link href={`/dashboard/applications/${item.id}`}>
                                View Application
                              </Link>
                            </MenuItem>
                            <MenuItem
                              sx={{ fontSize: ".85rem", "& svg": { mr: 2 } }}
                              onClick={() => requestDeleteJob(item.id, i)}
                            >
                              <Icon icon="fluent:delete-24-regular" fontSize={20} />
                              Delete
                            </MenuItem>
                          </Menu>
                        </Avatar>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

      <TablePagination
        component="div"
        count={totalJobs}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <PostJobModal open={openPostJobModal} close={handleCloseModal} onJobCreated={() => {
        loadJobs();
      }} />
      <EditJobModal
        open={openEditJobModal}
        job={selectedJob}
        close={handleCloseEditModal}
        onJobUpdated={handleJobUpdated}
      />
      <JobDetailsModal
        open={openJobDetailsModal}
        job={selectedJob}
        close={handleCloseJobDetailsModal}
      />
      <ConfirmDialog
        open={confirmDialogOpen}
        title="Delete Job?"
        description="Are you sure you want to delete this job? This action cannot be undone."
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Card>
  );
};

export default JobListTable;