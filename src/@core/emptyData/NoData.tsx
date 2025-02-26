import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import CustomChip from "@/@core/component/mui/chip";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import NoData from "./NoData";
import { fetchInterviews } from "@/@core/services/interviewService";

interface Interview {
  id: number;
  job: string;
  interview_date: string;
  interview_time: string;
  interview_location: string;
  status: string;
  qualified_user: {
    id: number;
    name: string;
    email: string;
  };
  interviewer: {
    name: string;
    department: string;
    email: string;
    phone: string;
  };
}

const Interviews = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInterviews = async () => {
      try {
        const data = await fetchInterviews();
        setInterviews(data);
      } catch (err) {
        setError("Failed to fetch interviews.");
      } finally {
        setLoading(false);
      }
    };

    loadInterviews();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error" align="center">{error}</Typography>;
  }

  if (interviews.length === 0) {
    return <NoData />;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Interviews
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Job</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Candidate</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Interview Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Time</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Interviewer</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {interviews.map((interview) => (
              <TableRow key={interview.id}>
                <TableCell>{interview.job}</TableCell>
                <TableCell>{interview.qualified_user.name}</TableCell>
                <TableCell>{interview.interview_date}</TableCell>
                <TableCell>{interview.interview_time}</TableCell>
                <TableCell>{interview.interview_location}</TableCell>
                <TableCell>{interview.interviewer.name}</TableCell>
                <TableCell align="center">
                    <CustomChip
                      label={interview.status}
                      color={interview.status === "completed" ? "success" : "error"}
                    />
                  </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Interviews;
