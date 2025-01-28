// *React Imports
import React from "react";

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

interface MockData {
  id: number;
  title: string;
  applications: number;
  postingDate: string;
  expirationDate: string;
  status: string;
}

const data: MockData[] = [
  {
    id: 1,
    title: "Software Engineer",
    applications: 213,
    postingDate: "12-05-2022",
    expirationDate: "2022-01-01",
    status: "Active",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    applications: 144,
    postingDate: "12-05-2022",
    expirationDate: "2021-01-01",
    status: "Active",
  },
  {
    id: 3,
    title: "Product Designer",
    applications: 189,
    postingDate: "12-05-2022",
    expirationDate: "2024-02-01",
    status: "Expired",
  },
  {
    id: 4,
    title: "Machine Learning Engineer",
    applications: 1280,
    postingDate: "12-05-2022",
    expirationDate: "2024-02-01",
    status: "rejected",
  },
  {
    id: 5,
    title: "Cloud Engineer",
    applications: 1280,
    postingDate: "12-05-2022",
    expirationDate: "2024-02-01",
    status: "rejected",
  },
  {
    id: 6,
    title: "Backend Developer",
    applications: 1280,
    postingDate: "12-05-2022",
    expirationDate: "2024-02-01",
    status: "rejected",
  },
];

const JobListTable: React.FC = () => {
  const [openFilter, setOpenFilter] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("");
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [anchorEl, setAnchorEl] = React.useState<(HTMLElement | null)[]>(
    Array(data?.length)?.fill(null)
  );

  const smallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("md")
  );

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
        <CardHeader title="Job List" />

        <Collapse
          easing={"ease-in-out"}
          in={openFilter}
          timeout={500}
          unmountOnExit
          sx={{ mb: 3, boxShadow: 2 }}
        >
          <Paper
            sx={{
              px: 3,
              py: 3,
            }}
          >
            <Typography
              sx={{
                mb: 3,
                fontSize: { xs: "1rem", sm: "1.25rem" },
              }}
            >
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
              <Grid item xs={6} sm={3}>
                <CustomTextField
                  select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  size="small"
                  placeholder="Senior, mid-level, entry..."
                  fullWidth
                  label="Level of Experience"
                >
                  <MenuItem value="0">Select Level</MenuItem>
                  <MenuItem value="1">Entry Level</MenuItem>
                  <MenuItem value="2">Intermediate</MenuItem>
                  <MenuItem value="3">Mid-Level</MenuItem>
                  <MenuItem value="4">Senior</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item xs={6} sm={3}>
                <CustomTextField
                  select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  size="small"
                  placeholder="less than 3..."
                  fullWidth
                  label="Years of Experience"
                >
                  <MenuItem value="0">Select Years of Experience</MenuItem>
                  <MenuItem value="1">Less than 1</MenuItem>
                  <MenuItem value="2">Less than 3</MenuItem>
                  <MenuItem value="3">More than 3</MenuItem>
                  <MenuItem value="4">More than 5</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item xs={6} sm={3}>
                <CustomTextField
                  select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  size="small"
                  placeholder="Month and Year..."
                  fullWidth
                  label="Date Applied"
                >
                  <MenuItem value="0">Date of Application</MenuItem>
                  <MenuItem value="1">11, July 2023</MenuItem>
                  <MenuItem value="2">11, Aug 2024</MenuItem>
                  <MenuItem value="3">11, Sept 2021</MenuItem>
                  <MenuItem value="4">11, Jan 2022</MenuItem>
                </CustomTextField>
              </Grid>
              {/* <Grid item xs={6} sm={2}>
                <CustomTextField
                  select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  size="small"
                  placeholder="Senior, mid-level, entry..."
                  fullWidth
                  label="Comment"
                >
                  <MenuItem value="0">Good</MenuItem>
                  <MenuItem value="1">Satifactory</MenuItem>
                  <MenuItem value="2">11, Aug 2024</MenuItem>
                  <MenuItem value="3">11, Sept 2021</MenuItem>
                  <MenuItem value="4">11, Jan 2022</MenuItem>
                </CustomTextField>
              </Grid> */}
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
                  <Typography sx={{ fontSize: ".857rem" }}> Filter</Typography>
                )}
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
              >
                <Icon icon="fa6-solid:user-pen" fontSize="1.257rem" />
                {smallScreen && (
                  <Typography sx={{ fontSize: ".857rem" }}>
                    Post&nbsp;Job
                  </Typography>
                )}
              </Button>
            </Box>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow
                sx={{ background: (theme) => theme.palette.secondary.dark }}
              >
                <TableCellStyled align={"left"}>Job&nbsp;ID</TableCellStyled>
                <TableCellStyled align={"left"}>Title</TableCellStyled>
                <TableCellStyled align={"left"}>Applications</TableCellStyled>
                <TableCellStyled align={"left"}>
                  Posting&nbsp;Date
                </TableCellStyled>
                <TableCellStyled align={"left"}>
                  Expiration&nbsp;Date
                </TableCellStyled>
                <TableCellStyled align={"left"}>Status</TableCellStyled>
                <TableCellStyled align={"left"}>Actions</TableCellStyled>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.applications}</TableCell>
                    <TableCell>{item.postingDate}</TableCell>
                    <TableCell>{item.expirationDate}</TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        textTransform: "capitalize",
                        fontWeight: "semibold",
                      }}
                    >
                      {item.status === "Active" ? (
                        <CustomChip
                          label="Active"
                          color="success"
                          skin="light"
                          size="small"
                          sx={{ width: "100%", borderRadius: "5px" }}
                        />
                      ) : (
                        <CustomChip
                          color="error"
                          label="Expired"
                          skin="light"
                          size="small"
                          sx={{ width: "100%", borderRadius: "5px" }}
                        />
                      )}
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
                            <MenuItem
                              sx={{ fontSize: ".85rem", "& svg": { mr: 2 } }}
                            >
                              <Icon icon="tabler:edit" fontSize={20} />
                              Edit
                            </MenuItem>
                            <MenuItem
                              sx={{ fontSize: ".85rem", "& svg": { mr: 2 } }}
                            >
                              <Icon icon="tabler:eye" fontSize={20} />
                              <Link href={`/dashboard/applications/${item.id}`}>
                                View
                              </Link>
                            </MenuItem>
                            <MenuItem
                              sx={{ fontSize: ".85rem", "& svg": { mr: 2 } }}
                            >
                              <Icon
                                icon="fluent:delete-24-regular"
                                fontSize={20}
                              />
                              Delete
                            </MenuItem>
                          </Menu>
                        </Avatar>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
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
    </Card>
  );
};

export default JobListTable;
