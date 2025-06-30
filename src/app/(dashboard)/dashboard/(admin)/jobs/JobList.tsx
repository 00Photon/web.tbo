import React, { useEffect, useState } from "react";
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
import { Avatar, Menu, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchJobs, activateJob, rejectJob, deleteJob } from "@/@core/services/jobService";
import JobDialog from "./JobDialog";
import NewJob from "./NewJob";
import JobDetailsModal from "./JobDetailsModal";

interface Job {
  id: number;
  title: string;
  job_type: string;
  description: string;
  requirements: string;
  skill: string;
  currency: string;
  salary_type: string;
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
  applications: { id: number; name: string; status: string }[];
  postingDate?: string;
  expirationDate?: string;
}

const JobListTable: React.FC = () => {
  const [openFilter, setOpenFilter] = React.useState<boolean>(false);
  const [viewJobModal, setViewJobModal] = React.useState<boolean>(false);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [postJobModal, setPostJobModal] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("all");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [anchorEl, setAnchorEl] = React.useState<{ [key: number]: HTMLElement | null }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [jobToDelete, setJobToDelete] = useState<number | null>(null);
  const [jobDetailsModalOpen, setJobDetailsModalOpen] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const smallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const loadJobs = async () => {
    try {
      setLoading(true);
      const response = await fetchJobs();
      if (response && Array.isArray(response.jobs)) {
        setJobs(response.jobs);
        setFilteredJobs(response.jobs);
      } else {
        setJobs([]);
        setFilteredJobs([]);
        toast.error("No jobs found", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (err) {
      setError("Failed to load jobs. Please try again.");
      toast.error("Failed to load jobs. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    let result = [...jobs];

    if (status !== "all") {
      result = result.filter((job) => job.status.toLowerCase() === status.toLowerCase());
    }

    if (value) {
      result = result.filter((job) =>
        job.title.toLowerCase().includes(value.toLowerCase())
      );
    }

    setFilteredJobs(result);
  }, [status, value, jobs]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const toggleViewJobModal = (id: number | null) => {
    setSelectedJobId(id);
    setViewJobModal(!viewJobModal);
  };

  const togglePostJobModal = () => {
    setPostJobModal(!postJobModal);
  };

  const toggleJobDetailsModal = (job: Job | null) => {
    setSelectedJob(job);
    setJobDetailsModalOpen(!jobDetailsModalOpen);
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

  const handleOpenDeleteDialog = (jobId: number) => {
    setJobToDelete(jobId);
    setDeleteDialogOpen(true);
    handleRowOptionsClose(jobId);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setJobToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (jobToDelete !== null) {
      try {
        await deleteJob(jobToDelete);
        toast.success("Job deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        const updatedJobs = jobs.filter((job) => job.id !== jobToDelete);
        setJobs(updatedJobs);
        setFilteredJobs(updatedJobs);
      } catch (error) {
        toast.error("Failed to delete job. Please try again.", {
          position: "top-right",
          autoClose: 3000,
  hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
    handleCloseDeleteDialog();
  };

  const handleApproveJob = async (jobId: number) => {
    try {
      const result = await activateJob(jobId);
      toast.success("Job approved successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      const updatedJobs = jobs.map((job) =>
        job.id === jobId ? { ...job, status: "active" } : job
      );
      setJobs(updatedJobs);
      setFilteredJobs(updatedJobs);
      handleRowOptionsClose(jobId);
    } catch (error) {
      toast.error("Failed to approve job. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleRejectJob = async (jobId: number) => {
    try {
      const result = await rejectJob(jobId);
      toast.success("Job rejected successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      const updatedJobs = jobs.map((job) =>
        job.id === jobId ? { ...job, status: "rejected" } : job
      );
      setJobs(updatedJobs);
      setFilteredJobs(updatedJobs);
      handleRowOptionsClose(jobId);
    } catch (error) {
      toast.error("Failed to reject job. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleRowOptionsClick = (event: React.MouseEvent<HTMLButtonElement>, jobId: number) => {
    setAnchorEl((prev) => ({
      ...prev,
      [jobId]: event.currentTarget,
    }));
  };

  const handleRowOptionsClose = (jobId: number) => {
    setAnchorEl((prev) => ({
      ...prev,
      [jobId]: null,
    }));
  };

  const toggleFilter = () => setOpenFilter(!openFilter);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Card
        sx={{
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          my: (theme) => theme.spacing(4),
          background: "#fff",
        }}
      >
        <CardContent sx={{ p: { xs: 2, md: 4 } }}>
          <CardHeader title="Job List" />
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
                    fullWidth
                    label="Job Status"
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
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
                placeholder="Job title, company name, applicant"
                sx={{ maxWidth: 400 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{
                        color: (theme) => theme.palette.primary.main,
                      }}
                    >
                      <Icon icon="lets-icons:search-duotone" />
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 2 }}>
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
                  {smallScreen && <Typography sx={{ fontSize: ".857rem" }}>Filter</Typography>}
                  <Icon icon="basil:filter-outline" />
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{
                    textTransform: "capitalize",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    width: "fit-content",
                    minWidth: { md: 120 },
                  }}
                  onClick={togglePostJobModal}
                >
                  <Icon icon="fa6-solid:user-pen" fontSize="1.257rem" />
                  {smallScreen && <Typography sx={{ fontSize: ".857rem" }}>Post Job</Typography>}
                </Button>
              </Box>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow sx={{ background: (theme) => theme.palette.secondary.dark }}>
                  <TableCellStyled align={"left"}>Job ID</TableCellStyled>
                  <TableCellStyled align={"left"}>Title</TableCellStyled>
                  <TableCellStyled align={"left"}>Applications</TableCellStyled>
                  <TableCellStyled align={"left"}>Posting Date</TableCellStyled>
                  <TableCellStyled align={"left"}>Application Deadline</TableCellStyled>
                  <TableCellStyled align={"left"}>Status</TableCellStyled>
                  <TableCellStyled align={"left"}>Actions</TableCellStyled>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredJobs.length > 0 ? (
                  filteredJobs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((job, i) => (
                      <TableRow key={job.id}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{job.title}</TableCell>
                        <TableCell>{job.applicant_count}</TableCell>
                        <TableCell>{new Date(job.created_at).toISOString().split("T")[0]}</TableCell>
                        <TableCell>{job.application_deadline}</TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            textTransform: "capitalize",
                            fontWeight: "semibold",
                          }}
                        >
                          {job.status === "active" ? (
                            <CustomChip
                              label="Active"
                              color="success"
                              skin="light"
                              size="small"
                              sx={{ width: "100%", borderRadius: "5px" }}
                            />
                          ) : job.status === "pending" ? (
                            <CustomChip
                              label="Pending"
                              color="warning"
                              skin="light"
                              size="small"
                              sx={{ width: "100%", borderRadius: "5px" }}
                            />
                          ) : job.status === "rejected" ? (
                            <CustomChip
                              label="Rejected"
                              color="error"
                              skin="light"
                              size="small"
                              sx={{ width: "100%", borderRadius: "5px" }}
                            />
                          ) : null}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ alignSelf: "end" }}>
                            <Avatar sx={{ background: "transparent" }}>
                              <IconButton size="small" onClick={(event) => handleRowOptionsClick(event, job.id)}>
                                <Icon icon="tabler:dots-vertical" />
                              </IconButton>
                              <Menu
                                keepMounted
                                disableScrollLock
                                anchorEl={anchorEl[job.id]}
                                open={Boolean(anchorEl[job.id])}
                                onBlur={() => handleRowOptionsClose(job.id)}
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
                                  onClick={() => {
                                    toggleJobDetailsModal(job);
                                    handleRowOptionsClose(job.id);
                                  }}
                                >
                                  <Icon icon="tabler:info-circle" fontSize={20} />
                                  View Details
                                </MenuItem>
                                <Link href={`/dashboard/jobs/application/${job.applications[0]?.id}`}>
                                  <MenuItem
                                    sx={{ fontSize: ".85rem", "& svg": { mr: 2 } }}
                                    onClick={() => handleRowOptionsClose(job.id)}
                                  >
                                    <Icon icon="tabler:eye" fontSize={20} />
                                    View Applications
                                  </MenuItem>
                                </Link>
                                <MenuItem
                                  sx={{ fontSize: ".85rem", "& svg": { mr: 2 } }}
                                  onClick={() => handleApproveJob(job.id)}
                                >
                                  <Icon icon="tabler:check" fontSize={20} />
                                  Approve
                                </MenuItem>
                                <MenuItem
                                  sx={{ fontSize: ".85rem", "& svg": { mr: 2 } }}
                                  onClick={() => handleRejectJob(job.id)}
                                >
                                  <Icon icon="tabler:x" fontSize={20} />
                                  Reject
                                </MenuItem>
                                <MenuItem
                                  sx={{ fontSize: ".85rem", "& svg": { mr: 2 } }}
                                  onClick={() => handleOpenDeleteDialog(job.id)}
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
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No jobs available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <TablePagination
          component="div"
          count={filteredJobs.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {viewJobModal && (
          <JobDialog
            open={viewJobModal}
            close={() => toggleViewJobModal(null)}
            jobId={selectedJobId ? selectedJobId.toString() : ""}
          />
        )}
        <NewJob
          open={postJobModal}
          close={togglePostJobModal}
          onJobCreated={loadJobs}
        />
        <JobDetailsModal
          open={jobDetailsModalOpen}
          close={() => toggleJobDetailsModal(null)}
          job={selectedJob}
        />
        <Dialog
          open={deleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this job? This action cannot be undone.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </div>
  );
};

export default JobListTable;