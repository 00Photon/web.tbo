// * React Imports
import React, { useEffect, useState } from "react";

// * Next.js & Router Imports
import { useRouter } from "next/router";

// * Custom Component Imports
import CustomTextField from "@/@core/component/mui/text-field";
import { TableCellStyled } from "@/@core/component/mui/tableStyled";
import CustomChip from "@/@core/component/mui/chip";
import { CandidateData, getCandidates } from "@/@core/services/CandidateService";

// ** Third Party Imports
import { useMediaQuery } from "@mui/material";
import { Theme } from "@mui/material/styles";

// ** MUI Imports
import {
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  InputAdornment,
  Checkbox,
  MenuItem,
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
} from "@mui/material";

// ** Icon Imports
import Icon from "@/@core/component/icon";

const TalentTable = () => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [experienceFilter, setExperienceFilter] = useState<string>("");
  const [yearsFilter, setYearsFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("");

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [anchorEl, setAnchorEl] = useState<(HTMLElement | null)[]>([]);

  const [candidates, setCandidates] = useState<CandidateData[]>([]);

  const smallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("md")
  );

  // Fetch candidate data
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await getCandidates();
        setCandidates(data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };
    fetchCandidates();
  }, []);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => setPage(newPage);

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
    <Card sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, my: 4, background: "#fff" }}>
      <CardContent sx={{ p: 3 }}>
        {!smallScreen && <Typography variant="h6">Talents</Typography>}

        {/* Search and Filter Section */}
        <Box sx={{ my: 3, mx: 1, display: "flex", justifyContent: { xs: "flex-end", md: "space-between" } }}>
          {smallScreen && <Typography variant="h6">Talents</Typography>}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, minWidth: 400 }}>
            <CustomTextField
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              size="small"
              placeholder="Search by name, email, phone"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon="lets-icons:search-duotone" />
                  </InputAdornment>
                ),
              }}
            />
            <Button onClick={toggleFilter} variant={openFilter ? "contained" : "outlined"} size="medium">
              <Icon icon="basil:filter-outline" />
              {smallScreen && <Typography sx={{ fontSize: ".857rem", ml: 1 }}>Filter</Typography>}
            </Button>
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
              {candidates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                <TableRow key={index}>
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
                      color={item.status === "active" ? "success" : "error"}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={(e) => handleRowOptionsClick(e, index)}>
                      <Icon icon="mdi:dots-vertical" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={candidates.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
  );
};

export default TalentTable;
