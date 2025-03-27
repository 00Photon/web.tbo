import {
  Message,
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
    icon: <Person />,
    name: "Profile",
    path: "/dashboard/profile-setting",
  },
  {
          icon: <Message />,
          name: 'Inbox',
          path: ''
      },
  {
    icon: <CasesOutlined />,
    name: "Job Applications",
    path: "/dashboard/applications",
  },
 
  {
    icon: <SupportAgent />,
    name: "Support",
    path: "/dashboard/help-support",
  },
];
