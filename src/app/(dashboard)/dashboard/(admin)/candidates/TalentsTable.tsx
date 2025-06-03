import React, { useEffect, useState } from "react";
import CustomTextField from "@/@core/component/mui/text-field";
import { TableCellStyled } from "@/@core/component/mui/tableStyled";
import CustomChip from "@/@core/component/mui/chip";
import { CandidateData, getCandidates, activateCandidate, deactivateCandidate, deleteCandidate } from "@/@core/services/CandidateService";
import { useMediaQuery } from "@mui/material";
import { Theme } from "@mui/material/styles";
import {
  Box,
  Card,
  CardContent,
  InputAdornment,
  Checkbox,
  IconButton,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
  Paper,
  Grid,
  FormControl,
  Select,
  MenuItem as SelectMenuItem,
  SelectChangeEvent,
} from "@mui/material";
import Icon from "@/@core/component/icon";

const TalentTable = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [anchorEl, setAnchorEl] = useState<(HTMLElement | null)[]>([]);
  const [candidates, setCandidates] = useState<CandidateData[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<CandidateData[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [candidateToDelete, setCandidateToDelete] = useState<CandidateData | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState<boolean>(false);
  const [candidateToView, setCandidateToView] = useState<CandidateData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const smallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  // Fetch candidates
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await getCandidates();
        setCandidates(data);
        setFilteredCandidates(data);
        setAnchorEl(new Array(data.length).fill(null));
      } catch (error) {
        setError("Failed to load candidates.");
      }
    };
    fetchCandidates();
  }, []);

  // Apply search and filter
  useEffect(() => {
    const filtered = candidates.filter((candidate) => {
      const matchesSearch = searchValue
        ? (candidate.name?.toLowerCase() || "").includes(searchValue.toLowerCase()) ||
          (candidate.email?.toLowerCase() || "").includes(searchValue.toLowerCase()) ||
          (candidate.phone_number?.toLowerCase() || "").includes(searchValue.toLowerCase())
        : true;

      const matchesStatus = filterStatus === "all" ||
        (filterStatus === "active" && candidate.status.toLowerCase() === "active") ||
        (filterStatus === "inactive" && candidate.status.toLowerCase() === "inactive");

      return matchesSearch && matchesStatus;
    });
    setFilteredCandidates(filtered);
    setPage(0);
  }, [searchValue, filterStatus, candidates]);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowOptionsClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    const newAnchorEl = [...anchorEl];
    newAnchorEl[index] = event.currentTarget;
    setAnchorEl(newAnchorEl);
  };

  const handleRowOptionsClose = (index: number) => {
    const newAnchorEl = [...anchorEl];
    newAnchorEl[index] = null;
    setAnchorEl(newAnchorEl);
  };

  const handleView = (candidate: CandidateData) => {
    setCandidateToView(candidate);
    setViewDialogOpen(true);
    handleRowOptionsClose(candidates.indexOf(candidate));
  };

  const handleToggleActivation = async (candidate: CandidateData) => {
    try {
      if (candidate.status.toLowerCase() === "active") {
        await deactivateCandidate(candidate.id);
        setCandidates(
          candidates.map((c) =>
            c.id === candidate.id ? { ...c, status: "inactive" } : c
          )
        );
      } else {
        await activateCandidate(candidate.id);
        setCandidates(
          candidates.map((c) =>
            c.id === candidate.id ? { ...c, status: "active" } : c
          )
        );
      }
    } catch (error) {
      setError("Failed to update candidate status.");
    }
    handleRowOptionsClose(candidates.indexOf(candidate));
  };

  const handleDelete = (candidate: CandidateData) => {
    setCandidateToDelete(candidate);
    setDeleteDialogOpen(true);
    handleRowOptionsClose(candidates.indexOf(candidate));
  };

  const confirmDelete = async () => {
    if (!candidateToDelete) return;
    try {
      await deleteCandidate(candidateToDelete.id);
      setCandidates(candidates.filter((c) => c.id !== candidateToDelete.id));
      setDeleteDialogOpen(false);
      setCandidateToDelete(null);
    } catch (error) {
      setError("Failed to delete candidate.");
    }
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setCandidateToDelete(null);
  };

  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
    setCandidateToView(null);
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilterStatus(event.target.value);
  };

  return (
    <Card sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, my: 4, background: "#fff" }}>
      <CardContent sx={{ p: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        {!smallScreen && <Typography variant="h6">Talents</Typography>}

        {/* Search and Filter Section */}
        <Box sx={{ my: 3, mx: 1, display: "flex", justifyContent: { xs: "flex-end", md: "space-between" }, alignItems: "center" }}>
          {smallScreen && <Typography variant="h6">Talents</Typography>}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, minWidth: 400 }}>
            <CustomTextField
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              size="small"
              placeholder="Company name, email"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon="lets-icons:search-duotone" />
                  </InputAdornment>
                ),
              }}
            />
            <Button onClick={toggleDropdown} variant={showDropdown ? "contained" : "outlined"} size="medium" sx={{ minWidth: "40px" }}>
              <Icon icon="basil:filter-outline" />
              {smallScreen && <Typography sx={{ fontSize: ".857rem", ml: 1 }}>Filter</Typography>}
            </Button>
            {showDropdown && (
              <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={filterStatus}
                  onChange={handleFilterChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Status filter" }}
                  sx={{ ml: 2 }}
                >
                  <SelectMenuItem value="all">All</SelectMenuItem>
                  <SelectMenuItem value="active">Active</SelectMenuItem>
                  <SelectMenuItem value="inactive">Inactive</SelectMenuItem>
                </Select>
              </FormControl>
            )}
          </Box>
        </Box>

        {/* Candidate Table */}
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ background: (theme) => theme.palette.secondary.dark }}>
                <TableCellStyled>
                  <Checkbox size="small" />
                </TableCellStyled>
                <TableCellStyled>User ID</TableCellStyled>
                <TableCellStyled>Name</TableCellStyled>
                <TableCellStyled>Email</TableCellStyled>
                <TableCellStyled align="center">Phone</TableCellStyled>
                <TableCellStyled align="center">Status</TableCellStyled>
                <TableCellStyled align="center">Actions</TableCellStyled>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCandidates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No candidates found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCandidates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Checkbox size="small" />
                    </TableCell>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell align="center">{item.phone_number}</TableCell>
                    <TableCell align="center">
                      <CustomChip
                        label={item.status}
                        color={item.status.toLowerCase() === "active" ? "success" : "error"}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label={`Actions for ${item.name}`}
                        onClick={(e) => handleRowOptionsClick(e, index)}
                      >
                        <Icon icon="mdi:dots-vertical" />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl[index]}
                        open={Boolean(anchorEl[index])}
                        onClose={() => handleRowOptionsClose(index)}
                      >
                        <MenuItem onClick={() => handleView(item)}>View</MenuItem>
                        <MenuItem onClick={() => handleToggleActivation(item)}>
                          {item.status.toLowerCase() === "active" ? "Deactivate" : "Activate"}
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete(item)}>Delete</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredCandidates.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="delete-dialog-title"
        >
          <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete {candidateToDelete?.name}? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
            <Button onClick={confirmDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* View Candidate Dialog */}
        <Dialog
          open={viewDialogOpen}
          onClose={handleCloseViewDialog}
          aria-labelledby="view-dialog-title"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle id="view-dialog-title">Candidate Details</DialogTitle>
          <DialogContent>
            {candidateToView && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">User ID</Typography>
                  <Typography variant="body2" color="text.secondary">{candidateToView.id}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Name</Typography>
                  <Typography variant="body2" color="text.secondary">{candidateToView.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Email</Typography>
                  <Typography variant="body2" color="text.secondary">{candidateToView.email}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Phone</Typography>
                  <Typography variant="body2" color="text.secondary">{candidateToView.phone_number}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Status</Typography>
                  <CustomChip
                    label={candidateToView.status}
                    color={candidateToView.status.toLowerCase() === "active" ? "success" : "error"}
                  />
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseViewDialog} variant="contained">Close</Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default TalentTable;