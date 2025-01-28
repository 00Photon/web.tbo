// *Icon Import
import Icon from "@/@core/component/icon";

// *MUI Imports
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
// import Button from "@mui/material/Button"

interface Activity {
  icon: string;
  activity: string;
  timeline: string;
}

interface ActivityProps {
  activity: Activity;
}

const activities: Activity[] = [
  {
    icon: "tabler:user",
    activity: "user24 updated their status",
    timeline: "5 min ago",
  },
  {
    icon: "tabler:user",
    activity: "user24 updated their status",
    timeline: "5 min ago",
  },
  {
    icon: "tabler:user",
    activity: "user24 updated their status",
    timeline: "5 min ago",
  },
  {
    icon: "tabler:user",
    activity: "user24 updated their status",
    timeline: "5 min ago",
  },
  {
    icon: "tabler:user",
    activity: "user24 updated their status",
    timeline: "5 min ago",
  },
  {
    icon: "tabler:user",
    activity: "user24 updated their status",
    timeline: "5 min ago",
  },
  {
    icon: "tabler:user",
    activity: "user24 updated their status",
    timeline: "5 min ago",
  },
  {
    icon: "tabler:user",
    activity: "user24 updated their status",
    timeline: "5 min ago",
  },
  {
    icon: "tabler:user",
    activity: "user24 updated their status",
    timeline: "5 min ago",
  },
  {
    icon: "tabler:user",
    activity: "user24 updated their status",
    timeline: "5 min ago",
  },
  {
    icon: "tabler:user",
    activity: "user24 updated their status",
    timeline: "5 min ago",
  },
  {
    icon: "tabler:user",
    activity: "user24 updated their status",
    timeline: "5 min ago",
  },
];

const ActivityLog: React.FC<ActivityProps> = ({ activity }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#767F8C",
        background: "#EFF5F5",
        p: 3,
        borderRadius: 1,
        my: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Icon icon={activity.icon} />
        <Typography>{activity.activity}</Typography>
      </Box>
      <Typography sx={{ fontSize: ".875rem" }}>{activity.timeline}</Typography>
    </Box>
  );
};

const ActivityLogs = () => {
  return (
    <Paper sx={{ p: 3, width: "100%", my: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontWeight: 600 }}>Recent Activities</Typography>
        <Button
          variant="text"
          size="small"
          sx={{ textTransform: "capitalize" }}
        >
          View more
        </Button>
      </Box>

      <Box
        sx={{
          maxHeight: "60vh",
          overflowY: "scroll",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {activities.map((activity, i) => (
          <ActivityLog key={i} activity={activity} />
        ))}
      </Box>
    </Paper>
  );
};

export default ActivityLogs;
