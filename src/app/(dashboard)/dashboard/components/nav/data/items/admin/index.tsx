import {
  CasesOutlined,
  Dashboard,
  Person,
  Settings,
  SupportAgent,
  StorageRounded,
  People,
  TodayTwoTone,
} from "@mui/icons-material";

export const adminNavItemsData = [
  {
    icon: <Dashboard />,
    name: "Dashboard",
    path: "/dashboard/admin",
  },
  {
    icon: <CasesOutlined />,
    name: "Jobs",
    path: "/dashboard/jobs",
  },
  {
    icon: <StorageRounded />,
    name: "Clients",
    path: "/dashboard/clients",
  },
  {
    icon: <People />,
    name: "Candidates",
    path: "/dashboard/candidates",
  },
  {
    icon: <Person />,
    name: "Admin",
    path: "/dashboard/admin-management",
  },
  {
    icon: <TodayTwoTone />,
    name: "Interviews",
    path: "/dashboard/interviews",
  },
  {
    icon: <Settings />,
    name: "Settings",
    path: "/dashboard/settings",
  },
  // {
  //   icon: <SupportAgent />,
  //   name: "Help & Support",
  //   path: "/dashboard/support",
  // },
];
