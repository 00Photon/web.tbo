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
} from "@mui/material";
// Assume these services are imported from your API client
import {
  fetchJobsClients,
  fetchJobsclinetsById,
  deleteJobById,
} from "@/@core/services/jobService";


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
  additional_info: string;
  created_by: number;
  client_id: number;
  created_at: string;
  updated_at: string;
  status: string;
  applicant_count: number;
}

// Add this above the JobListTable component
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

const JobListTable: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<(HTMLElement | null)[]>([]);
  const [openPostJobModal, setOpenPostJobModal] = useState(false);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<{ id: number; index: number } | null>(null);

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
        updatedJobs.splice(index, 1);
        setJobs(updatedJobs);
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
  }, [page, rowsPerPage]);

  const handleOpenModal = () => setOpenPostJobModal(true);
  const handleCloseModal = () => setOpenPostJobModal(false);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleDeleteJob = async (jobId: number, index: number) => {
    try {
      // Optional: confirm dialog
      if (!window.confirm("Are you sure you want to delete this job?")) return;
  
      const response = await deleteJobById(jobId); // You must have this API service
      if (response.status) {
        const updatedJobs = [...jobs];
        updatedJobs.splice(index, 1);
        setJobs(updatedJobs);
        handleRowOptionsClose(index);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
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
                  placeholder="Reviewed, Hired, Short..."
                  fullWidth
                  label="Status"
                >
                  <MenuItem value="0">Select Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </CustomTextField>
              </Grid>
              {/* ... other filter fields ... */}
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
                alignItem: "center",
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
                <TableCellStyled align="left">Job ID</TableCellStyled>
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
              ) : jobs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No jobs found
                  </TableCell>
                </TableRow>
              ) : (
                jobs.map((item, i) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
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
                            onBlur={() => handleRowOptionsClose(i)}
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
                            <MenuItem sx={{ fontSize: ".85rem", "& svg": { mr: 2 } }}>
                              <Icon icon="tabler:edit" fontSize={20} />
                              Edit
                            </MenuItem>
                            <MenuItem sx={{ fontSize: ".85rem", "& svg": { mr: 2 } }}>
                              <Icon icon="tabler:eye" fontSize={20} />
                              <Link href={`/dashboard/applications/${item.id}`}>
                                View
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
      <PostJobModal open={openPostJobModal} close={handleCloseModal} />
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

// New component for single job view
export const JobDetail: React.FC<{ jobId: string }> = ({ jobId }) => {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await fetchJobsclinetsById(jobId);
        if (response.status) {
          setJob(response.job);
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!job) {
    return <Typography>Job not found</Typography>;
  }

  return (
    <Card sx={{ m: 4 }}>
      <CardHeader title={job.title} />
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
          
          <Typography variant="h6" sx={{ mt: 2 }}>Additional Info</Typography>
          <Typography>{job.additional_info}</Typography>
        </Box>
      </CardContent>
      
    </Card>
    
  );
};

export default JobListTable;