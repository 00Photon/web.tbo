// *React Imports
import { SetStateAction, useState } from "react";

// * Icon Imports
import Icon from "@/@core/component/icon";

// * Custom Component Imports
import CustomTextField from "@/@core/component/mui/text-field";
import { TableCellStyled } from "@/@core/component/mui/tableStyled";
import CustomChip from "@/@core/component/mui/chip";

// * Component Import
import EditAdmin from "./EditAdmin";
import ViewAdmin from "./ViewAdmin";

// ** Third Party Imports
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InputAdornment from "@mui/material/InputAdornment";
import { Avatar, Menu } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
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

export type MockData = {
  id: number;
  name: string;
  email: string;
  level: string;
  role: string;
  status: boolean;
  avatarColor?: string;
  avatar?: string | undefined;
  sx?: object;
};

const data: MockData[] = [
  {
    id: 1289,
    name: "John Doe",
    email: "DqkR8@example.com",
    level: "Senior",
    role: "Human Resource",
    status: true,
  },
  {
    id: 2412,
    name: "Sarah Doe",
    email: "sara@example.com",
    level: "Mid-Level",
    role: "Lead Dev",
    status: true,
  },
  {
    id: 2129,
    name: "Rizzy Elesius",
    email: "sara@example.com",
    level: "Mid-Level",
    role: "System Admin",
    status: false,
  },
  {
    id: 2129,
    name: "Rizzy Elesius",
    email: "sara@example.com",
    level: "Junior",
    role: "System Admin",
    status: true,
  },
  {
    id: 2129,
    name: "Rizzy Elesius",
    email: "sara@example.com",
    level: "Mid-Level",
    role: "System Admin",
    status: false,
  },
  {
    id: 2129,
    name: "Rizzy Elesius",
    email: "sara@example.com",
    level: "Junior",
    role: "Manager",
    status: false,
  },
];

const AdminsTable = () => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState<(HTMLElement | null)[]>(
    Array(data?.length)?.fill(null)
  );
  const [editAdminModal, setEditAdminModal] = useState<boolean>(false);
  const [viewAdminDrawer, setViewAdminDrawer] = useState<boolean>(false);
  const [activeAdmin, setActiveAdmin] = useState<MockData | null>(null);

  const smallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("md")
  );

  const toggleEditAdminModal = () => setEditAdminModal(!editAdminModal);

  const setAdminView = (admin: MockData) => {
    setViewAdminDrawer(true);
    setActiveAdmin(admin);
  };

  const closeAdminDrawer = () => {
    setViewAdminDrawer(false);
    setActiveAdmin(null);
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
      <CardContent sx={{ p: (theme) => theme.spacing(3) }}>
        {!smallScreen && <Typography variant="h6">Admins</Typography>}

        <Collapse
          easing={"ease-in-out"}
          in={openFilter}
          timeout={500}
          unmountOnExit
          sx={{ mb: 3, boxShadow: 4 }}
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
                fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
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

        <Box
          sx={{
            my: 3,
            mx: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "flex-end", md: "space-between" },
          }}
        >
          {smallScreen && <Typography variant="h6">Admins</Typography>}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              minWidth: 400,
            }}
          >
            <CustomTextField
              value={value}
              onChange={(e) => setValue(e.target.value)}
              size="small"
              placeholder="Name, Role, Level"
              fullWidth
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
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow
                sx={{ background: (theme) => theme.palette.secondary.dark }}
              >
                <TableCellStyled align="left" sx={{ minWidth: 50 }}>
                  <Checkbox
                    size="small"
                    // name={"all-checked"}
                    // onChange={() => {
                    //   if (allChecked) {
                    //     setAllChecked(false)
                    //     setChecked([])
                    //   } else {
                    //     setAllChecked(true)
                    //     setChecked(PayrollData?.map(p => p?.id))
                    //   }
                    // }}
                  />
                </TableCellStyled>
                <TableCellStyled align={"left"}>Admin ID</TableCellStyled>
                <TableCellStyled align="left" sx={{ minWidth: 150 }}>
                  Name
                </TableCellStyled>
                <TableCellStyled align="left">Email</TableCellStyled>
                <TableCellStyled align="center">Level</TableCellStyled>
                <TableCellStyled align="left">Role</TableCellStyled>
                <TableCellStyled align="center">Status</TableCellStyled>
                <TableCellStyled align="left">Actions</TableCellStyled>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell align="left">
                      <Checkbox
                        size="small"
                        // name={`${payroll?.id}-checked`}
                        // checked={checked.includes(payroll?.id)}
                        // onChange={() => {
                        //   if (checked.includes(payroll.id)) {
                        //     const restChecked = checked.filter(c => c !== payroll?.id)
                        //     setChecked(restChecked)
                        //     setAllChecked(false)
                        //   } else {
                        //     if (checked.length + 1 === payroll?.length) {
                        //       setAllChecked(true)
                        //     }
                        //     setChecked([...checked, payroll?.id])
                        //   }
                        // }}
                      />
                    </TableCell>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell align="center">{item.level}</TableCell>
                    <TableCell>{item.role}</TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        textTransform: "capitalize",
                        fontWeight: "semibold",
                      }}
                    >
                      {item.status ? (
                        <CustomChip
                          size="small"
                          skin="light"
                          label="Active"
                          color="success"
                          sx={{ width: "100%", borderRadius: "5px" }}
                        />
                      ) : (
                        <CustomChip
                          size="small"
                          skin="light"
                          label="Inactive"
                          color="default"
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
                              onClick={() => setAdminView(item)}
                              sx={{ fontSize: ".85rem", "& svg": { mr: 2 } }}
                            >
                              <Icon icon="tabler:eye" fontSize={20} />
                              View
                            </MenuItem>
                            <MenuItem
                              sx={{ fontSize: ".85rem", "& svg": { mr: 2 } }}
                            >
                              <Icon icon="carbon:pause-outline" fontSize={20} />
                              Deactivate
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

      <EditAdmin
        open={editAdminModal}
        close={toggleEditAdminModal}
        activeAdmin={activeAdmin}
      />

      <ViewAdmin
        open={viewAdminDrawer}
        close={closeAdminDrawer}
        activeAdmin={activeAdmin}
        editModal={toggleEditAdminModal}
      />
    </Card>
  );
};

export default AdminsTable;
