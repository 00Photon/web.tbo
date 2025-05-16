import React, { useEffect, useState } from "react";
import Icon from "@/@core/component/icon";
import Link from "next/link";
import CustomTextField from "@/@core/component/mui/text-field";
import { TableCellStyled } from "@/@core/component/mui/tableStyled";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { fetchJobs, activateJob, deactivateJob, deleteJob } from "@/@core/services/jobService";
import JobDialog from "./JobDialog";
import NewJob from "./NewJob";

interface Job {
  id: number;
  title: string;
  application_deadline: string;
  applicant_count: number;
  created_at: string;
  postingDate: string;
  expirationDate: string;
  status: string;
  applications: { id: number; name: string; status: string }[]; // Replace with the actual structure of Application
}

const JobListTable: React.FC = () => {
  const [openFilter, setOpenFilter] = React.useState<boolean>(false);
  const [viewJobModal, setViewJobModal] = React.useState<boolean>(false);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [postJobModal, setPostJobModal] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("");
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [anchorEl, setAnchorEl] = React.useState<{ [key: number]: HTMLElement | null }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [jobToDelete, setJobToDelete] = useState<number | null>(null);

  const smallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const response = await fetchJobs();
        console.log("Fetched data:", response);
        if (response && Array.isArray(response.jobs)) {
          setJobs(response.jobs);
        } else {
          setJobs([]);
        }
      } catch (err) {
        setError("Failed to load jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const toggleViewJobModal = (id: number | null) => {
    setSelectedJobId(id);
    setViewJobModal(!viewJobModal);
  };

  const togglePostJobModal = () => {
    setPostJobModal(!postJobModal);
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
        console.log("Job deleted:", jobToDelete);
        const updatedJobs = jobs.filter(job => job.id !== jobToDelete);
        setJobs(updatedJobs);
      } catch (error) {
        console.error("Failed to delete job:", error instanceof Error ? error.message : error);
      }
    }
    handleCloseDeleteDialog();
  };

  const handleToggleJobStatus = async (jobId: number, currentStatus: string) => {
    try {
      if (currentStatus === "active") {
        const result = await deactivateJob(jobId);
        console.log("Job deactivated:", result);
        const updatedJobs = jobs.map(job =>
          job.id === jobId ? { ...job, status: "pending" } : job
        );
        setJobs(updatedJobs);
      } else {
        const result = await activateJob(jobId);
        console.log("Job activated:", result);
        const updatedJobs = jobs.map(job =>
          job.id === jobId ? { ...job, status: "active" } : job
        );
        setJobs(updatedJobs);
      }
      handleRowOptionsClose(jobId);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to toggle job status:", error.message);
      } else {
        console.error("Failed to toggle job status: Unknown error");
      }
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
                  placeholder="Reviewed, Hired, Short..."
                  fullWidth
                  label="Status"
                >
                  <MenuItem value="0">Select Status</MenuItem>
                  <MenuItem value="1">Shortlisted</MenuItem>
                  <MenuItem value="2">Reviewed</MenuItem>
                  <MenuItem value="3">Interviewed</MenuItem>
                  <MenuItem value="4">Hired</MenuItem>
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
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>{job.id}</TableCell>
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
                          label="Inactive"
                          color="warning"
                          skin="light"
                          size="small"
                          sx={{ width: "100%", borderRadius: "5px" }}
                        />
                      ) : job.status === "expired" ? (
                        <CustomChip
                          label="Expired"
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
                        <Link href={`/dashboard/jobs/application/${job.applications[0]?.id}`}>
                          <MenuItem
                            sx={{ fontSize: ".85rem", "& svg": { mr: 2 } }}
                            onClick={() => handleRowOptionsClose(job.id)}
                          >
                            <Icon icon="tabler:eye" fontSize={20} />
                            View
                          </MenuItem>
                        </Link>


                            <MenuItem
                              sx={{ fontSize: ".85rem", "& svg": { mr: 2 } }}
                              onClick={() => handleToggleJobStatus(job.id, job.status)}
                            >
                              {job.status === "active" ? (
                                <>
                                  <Icon icon="tabler:eye-off" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <Icon icon="tabler:eye" />
                                  Approve
                                </>
                              )}
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
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {viewJobModal && (
        <JobDialog
          open={viewJobModal}
          close={() => toggleViewJobModal(null)}
          jobId={selectedJobId ? selectedJobId.toString() : ''}
        />
      )}
      <NewJob open={postJobModal} close={togglePostJobModal} />
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
  );
};

export default JobListTable;