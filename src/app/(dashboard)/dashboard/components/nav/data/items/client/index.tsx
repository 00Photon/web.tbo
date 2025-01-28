import {
  CasesOutlined,
  Dashboard,
  Person,
  Settings,
  SupportAgent,
} from "@mui/icons-material";

export const clientNavItemsData = [
  {
    icon: <Dashboard />,
    name: "Dashboard",
    path: "/dashboard/client",
  },
  {
    icon: <CasesOutlined />,
    name: "Job Applications",
    path: "/dashboard/applications",
  },
  {
    icon: <Person />,
    name: "Profile",
    path: "/dashboard/profile-setting",
  },
  {
    icon: <Settings />,
    name: "Settings",
    path: "/dashboard/user-settings",
  },
  {
    icon: <SupportAgent />,
    name: "Support",
    path: "/dashboard/help-support",
  },
];
