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
          path: '/dashboard/inbox',
      },
  {
    icon: <CasesOutlined />,
    name: "Job List",
    path: "/dashboard/applications",
  },
 
];
