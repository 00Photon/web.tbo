// *React Imports
import React, { useEffect, useState } from "react";

// * Icon Imports
import Icon from "@/@core/component/icon";

// * Next Imports
import Link from "next/link";

// * Custom Component Imports
import CustomTextField from "@/@core/component/mui/text-field";
import { TableCellStyled } from "@/@core/component/mui/tableStyled";

// ** Third Party Imports
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** MUI Imports
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
import { fetchJobs, deactivateJob, deleteJob   } from "@/@core/services/jobService"; 
// * Component Imports
import JobDialog from "./JobDialog";
import NewJob from "./NewJob";

interface Job {
  id: number;
  title: string;
  // applications: number;
  application_deadline: string;
  applicant_count: number; 
  created_at : string;
  postingDate: string;
  expirationDate: string;
  status: string;
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
    setSelectedJobId(id); // Set selected job ID
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

  const handleDeleteJob = async (jobId: number) => {
    try {
      await deleteJob(jobId); // Call the deleteJob service to delete the job
      console.log("Job deleted:", jobId);

      // After deleting, remove the job from the local state
      const updatedJobs = jobs.filter(job => job.id !== jobId);
      setJobs(updatedJobs); // Update the state to reflect the deletion
    } catch (error) {
      console.error("Failed to delete job:", error instanceof Error ? error.message : error);
    }
  };

    // Function to handle deactivate job
    const handleDeactivateJob = async (jobId: number) => {
      try {
        const result = await deactivateJob(jobId); // Call the deactivateJob service
        console.log("Job deactivated:", result); // Optionally log or use the response data
    
        // After deactivating, update the job status in the local state
        const updatedJobs = jobs.map(job =>
          job.id === jobId ? { ...job, status: "inactive" } : job
        );
        setJobs(updatedJobs); // Update the state with the new job data
      } catch (error: unknown) { // Explicitly type 'error' as 'unknown'
        if (error instanceof Error) { // Check if the error is an instance of the Error class
          console.error("Failed to deactivate job:", error.message);
        } else {
          console.error("Failed to deactivate job: Unknown error");
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
            {/* Add other filters here */}
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
              {smallScreen && <Typography sx={{ fontSize: ".857rem" }}>Post&nbsp;Job</Typography>}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Job Listing Table */}
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={{ background: (theme) => theme.palette.secondary.dark }}>
              <TableCellStyled align={"left"}>Job ID</TableCellStyled>
              <TableCellStyled align={"left"}>Title</TableCellStyled>
              <TableCellStyled align={"left"}>Applications</TableCellStyled>
              <TableCellStyled align={"left"}>Posting Date</TableCellStyled>
              <TableCellStyled align={"left"}>Expiration Date</TableCellStyled>
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
                  ) : job.status === "inactive" ? (
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
                         <MenuItem
                              sx={{ fontSize: ".85rem", "& svg": { mr: 2 } }}
                              onClick={() => toggleViewJobModal(job.id)} // Use job.id instead of id
                            >
                              <Icon icon="tabler:eye" fontSize={20} />
                              View
                            </MenuItem>

                            <MenuItem
                            sx={{ fontSize: ".85rem", "& svg": { mr: 2 } }}
                            onClick={() => handleDeactivateJob(job.id)} // Call the deactivate function
                          >
                            <Icon icon="tabler:eye-off" />
                            Deactivate
                          </MenuItem>

                           <MenuItem 
                              sx={{ fontSize: ".85rem", "& svg": { mr: 2 } }} 
                              onClick={() => handleDeleteJob(job.id)} // Call delete when clicked
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
    {/* <JobDialog open={viewJobModal} close={toggleViewJobModal} jobId=job.id /> */}
      {/* Job Dialog */}
      {viewJobModal && (
        <JobDialog
          open={viewJobModal}
          close={() => toggleViewJobModal(null)} // Close and reset job ID
          jobId={selectedJobId ? selectedJobId.toString() : ''} 
        />
      )}
    <NewJob open={postJobModal} close={togglePostJobModal} />
  </Card>
);

};
export default JobListTable;
