// * React Import
import { useState } from "react";

// * Icon Imports
import Icon from "@/@core/component/icon";

// * Type Import
import { MockData } from "./Admins";

// * Utility Imports
import { getInitials } from "@/@core/utils/getIntials";

// * Custom Components Imports
import { TableCellStyled } from "@/@core/component/mui/tableStyled";
import CustomAvatar from "@/@core/component/mui/avatar";
import CustomChip from "@/@core/component/mui/chip";

//* MUI Imports
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme } from "@mui/material/styles";

const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(4),
  justifyContent: "space-between",
}));

interface PermissionProps {
  title: string;
  text: string;
}

const permission: PermissionProps[] = [
  {
    title: "User Management",
    text: "Add, remove, and manage user accounts and permissions across the system.",
  },
  {
    title: "Access Control",
    text: "Manage access levels and security settings for various system resources and applications.",
  },
  {
    title: "Service Management",
    text: "Start, stop, and manage system services and processes as needed.",
  },
  {
    title: "Security Management",
    text: "Implement and manage firewalls, antivirus, and other security measures to protect the system.",
  },
];

interface PermissionCardProps {
  permission: PermissionProps;
}

const PermissionCard: React.FC<PermissionCardProps> = ({ permission }) => {
  return (
    <>
      <Box
        sx={{
          p: 3,
          mb: 1,
          mt: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: 600,
              color: "#39353D",
              fontSize: "1rem",
            }}
          >
            {permission.title}
          </Typography>
          <Typography sx={{ fontSize: "13px", mb: "10px" }}>
            {permission.text}
          </Typography>
        </Box>
        <Switch color="primary" size="medium" />
      </Box>
      <Divider variant="inset" />
    </>
  );
};

interface Props {
  open: boolean;
  close: () => void;
  editModal: () => void;
  activeAdmin: MockData | null;
}

const renderClient = (row: MockData) => {
  const initials = `${row?.name}`;

  if (row?.avatar && row?.avatar.length) {
    return (
      <CustomAvatar
        src={row.avatar}
        sx={{ mr: 2.5, width: 50, height: 50 }}
        skin="light"
      />
    );
  } else {
    return (
      <CustomAvatar
        skin="light"
        color={row?.avatarColor || "primary"}
        sx={{
          mr: 2.5,
          width: 100,
          height: 100,
          fontWeight: 500,
          fontSize: (24 / 100) * 100,
        }}
      >
        {getInitials(row?.name || "John Doe")}
      </CustomAvatar>
    );
  }
};

const ViewAdmin = ({ open, close, activeAdmin, editModal }: Props) => {
  return (
    <Drawer
      open={open}
      anchor="right"
      variant="temporary"
      ModalProps={{ keepMounted: true }}
      sx={{ "& .MuiDrawer-paper": { width: { xs: 800, sm: 800 } } }}
    >
      <Header>
        <Button onClick={close} sx={{ color: "#111" }}>
          <Icon icon="basil:caret-left-solid" fontSize={30} />
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
          Admin Details
        </Typography>
      </Header>

      <Box>
        <DialogContent
          sx={{
            pb: (theme) => `${theme.spacing(8)}  !important`,
            px: (theme) => [
              `${theme.spacing(4)} !important`,
              `${theme.spacing(8)} !important`,
            ],
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            {activeAdmin && <Box>{renderClient(activeAdmin)}</Box>}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography sx={{ fontWeight: 600, fontSize: "1.4rem" }}>
                {activeAdmin?.name}
              </Typography>
              {activeAdmin?.status ? (
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
            </Box>
          </Box>
          <Box
            sx={{ background: "#f7f7f7", borderRadius: 3, px: 3, py: 1, my: 4 }}
          >
            <Stack direction="row" sx={{ mt: 4, gap: 3 }}>
              <Box>
                <Typography
                  sx={{
                    color: "#858585",
                    fontVariant: "small-caps",
                    mb: 2,
                  }}
                >
                  Role
                </Typography>
                <Typography sx={{ fontSize: "1rem" }}>
                  System Administrator
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    color: "#858585",
                    fontVariant: "small-caps",
                    mb: 2,
                  }}
                >
                  Level
                </Typography>
                <Typography sx={{ fontSize: "1rem" }}>Mid-Level</Typography>
              </Box>
            </Stack>

            <Grid container spacing={4} sx={{ mt: 2, gap: 3, display: "flex" }}>
              <Grid item xs={6} md={5}>
                <Typography
                  sx={{
                    color: "#858585",
                    fontVariant: "small-caps",
                    mb: 2,
                  }}
                >
                  Admin ID:
                </Typography>
                <Typography sx={{ fontSize: "1rem" }}>
                  System Administrator
                </Typography>
              </Grid>

              <Grid item xs={6} md={5}>
                <Typography
                  sx={{
                    color: "#858585",
                    fontVariant: "small-caps",
                    mb: 2,
                  }}
                >
                  Email Address:
                </Typography>
                <Typography sx={{ fontSize: "1rem" }}>Mid-Level</Typography>
              </Grid>

              <Grid item xs={6} md={5}>
                <Typography
                  sx={{
                    color: "#858585",
                    fontVariant: "small-caps",
                    mb: 2,
                  }}
                >
                  Date Joined
                </Typography>
                <Typography sx={{ fontSize: "1rem" }}>
                  System Administrator
                </Typography>
              </Grid>

              <Grid item xs={6} md={5}>
                <Typography
                  sx={{
                    color: "#858585",
                    fontVariant: "small-caps",
                    mb: 2,
                  }}
                >
                  Last Login
                </Typography>
                <Typography sx={{ fontSize: "1rem" }}>Mid-Level</Typography>
              </Grid>
            </Grid>

            <Box sx={{ my: 4 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "#39353D",
                  fontSize: { xs: "1rem", sm: "1.2rem" },
                }}
              >
                Permissions
              </Typography>

              <Stack sx={{ width: { xs: "100%", md: "90%" } }}>
                {permission.map((permission, i) => (
                  <Box key={i}>
                    <PermissionCard permission={permission} />
                  </Box>
                ))}
              </Stack>
            </Box>

            <Paper sx={{ p: 3, borderRadius: 4 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "#39353D",
                  fontSize: { xs: "1rem", sm: "1.2rem" },
                  mb: 2,
                }}
              >
                Activity Log
              </Typography>
              <TableContainer
                component={Paper}
                elevation={0}
                sx={{ borderRadius: 2 }}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow
                      sx={{
                        background: (theme) => theme.palette.secondary.dark,
                      }}
                    >
                      <TableCellStyled align={"left"}>Date</TableCellStyled>
                      <TableCellStyled align="left" sx={{ minWidth: 150 }}>
                        Activity
                      </TableCellStyled>
                      <TableCellStyled align="left">
                        Description
                      </TableCellStyled>
                    </TableRow>
                  </TableHead>
                  <TableBody></TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "center",

            pb: (theme) => `${theme.spacing(8)} !important`,
            mt: (theme) => `${theme.spacing(4)} !important`,
          }}
        >
          <Button
            type="button"
            variant="contained"
            sx={{
              textTransform: "capitalize",
              minWidth: 120,
            }}
            onClick={editModal}
          >
            Edit
          </Button>
          <Button
            type="button"
            variant="outlined"
            sx={{
              textTransform: "capitalize",
              minWidth: 120,
            }}
          >
            Deactivate
          </Button>
          <Button type="submit" variant="text" sx={{ mr: 2 }}>
            <Icon icon="fluent:delete-24-regular" fontSize={25} />
          </Button>
        </DialogActions>
      </Box>
    </Drawer>
  );
};

export default ViewAdmin;
