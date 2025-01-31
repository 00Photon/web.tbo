import { TextOnlyPill } from "@/@core/utils/pills";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const JobApplicationsTable: React.FC<{
  setOpenApplicationModal: () => void;
  setOpenWithdrawModal: () => void;
}> = ({ setOpenApplicationModal, setOpenWithdrawModal }) => {
  const headerFields = [
    "Company Name",
    "Salary Range",
    "No of Application",
    "Date  of Posted",
    "Application Status",
    "",
  ];

  const companyNameField = (image: string, name: string) => {
    return (
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ marginRight: "12px" }}>
            <Box
              sx={{
                backgroundImage: `url(${image})`,
                backgroundSize: "100% 100%",
                borderRadius: "20%",
                width: "30px",
                height: "30px",
                backgroundColor: "#E7E7E7",
              }}
            />
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: "600", color: "#101828", fontSize: "14px" }}
            >
              {name}
            </Typography>
          </Box>
        </Box>
      </TableCell>
    );
  };

  const textOnlyField = (data: string) => {
    return (
      <TableCell>
        <Typography sx={{ fontSize: "14px" }}>{data}</Typography>
      </TableCell>
    );
  };

  const applicationStatusField = (status: string) => {
    switch (status) {
      case "Accepted":
        return (
          <TableCell>
            <TextOnlyPill variant="success" text={status} />
          </TableCell>
        );
      case "Not Opened":
        return (
          <TableCell>
            <TextOnlyPill variant="grey" text={status} />
          </TableCell>
        );
      case "Declined":
        return (
          <TableCell>
            <TextOnlyPill variant="error" text={status} />
          </TableCell>
        );
    }
  };

  const buttonsField = () => {
    return (
      <TableCell>
        {[
          { variant: "outlined", label: "Withdraw" },
          { variant: "contained", label: "View" },
        ].map((button, index) => (
          <Button
            {...(index === 1
              ? { onClick: setOpenApplicationModal }
              : { onClick: setOpenWithdrawModal })}
            key={index}
            variant={button.variant as "outlined" | "contained"}
            sx={{
              textTransform: "none",
              ...(index == 0 && { mr: { xs: 0, sm: 3 }, mb: { xs: 3, lg: 0 } }),
            }}
          >
            {button.label}
          </Button>
        ))}
      </TableCell>
    );
  };

  const rowsData = [
    {
      image: "/icons/google.png",
      name: "Google",
      salaryRange: "$20,000 - $25,000",
      noOfApplications: 45,
      datePosted: "09-12-2024",
      status: "Not Opened",
    },
  ];

  return (
    <TableContainer sx={{ backgroundColor: "white", padding: "20px" }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
            {headerFields.map((field, index) => (
              <TableCell key={index}>{field}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array(10)
            .fill(rowsData[0])
            .map((row, index) => (
              <TableRow key={index}>
                {companyNameField(row.image, row.name)}
                {[
                  row.salaryRange,
                  `${row.noOfApplications} Applications`,
                  row.datePosted,
                ].map((field) => textOnlyField(field))}
                {applicationStatusField(row.status)}
                {buttonsField()}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JobApplicationsTable;
