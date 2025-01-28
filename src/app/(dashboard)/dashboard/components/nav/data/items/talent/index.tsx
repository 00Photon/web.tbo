import { CasesOutlined, Dashboard, List, Person } from "@mui/icons-material";

export const talentNavItemsData = [
    {
        icon: <Dashboard />,
        name: 'Dashboard',
        path: '/dashboard/talent'
    },
    {
        icon: <CasesOutlined />,
        name: 'Interview Alerts',
        path: '/dashboard/talent/interview-alerts'
    },
    {
        icon: <List />,
        name: 'Job Vacancies',
        path: '/dashboard/talent/job-vacancies'
    },
    {
        icon: <Dashboard />,
        name: 'Applications',
        path: '/dashboard/talent/applications'
    },
    {
        icon: <Person />,
        name: 'Profile',
        path: '/dashboard/talent/profile'
    }
]