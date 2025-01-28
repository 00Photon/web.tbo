// *React Imports
import React from "react";

// * Icon Imports
import Icon from "@/@core/component/icon";

// * Image Imports
import Google from "../../../../../../../../public/google.png";

// * Next Imports
import Link from "next/link";

// * Custom Component Imports
import CustomTextField from "@/@core/component/mui/text-field";
import { TableCellStyled } from "@/@core/component/mui/tableStyled";
import StyledImage from "@/@core/component/mui/image";

// ** Third Party Imports
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CustomChip from "@/@core/component/mui/chip";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme } from "@mui/material/styles";

interface ClientProps {
  data: MockData;
}
interface MockData {
  logo: string;
  company: string;
  type: string;
  vacancies: number;
  applications: number;
}

const data: MockData[] = [
  {
    logo: Google.src,
    company: "Google LLC",
    type: "IT Corporation",
    vacancies: 23,
    applications: 3440,
  },
  {
    logo: Google.src,
    company: "Google LLC",
    type: "IT Corporation",
    vacancies: 23,
    applications: 3440,
  },
  {
    logo: Google.src,
    company: "Google LLC",
    type: "IT Corporation",
    vacancies: 23,
    applications: 3440,
  },
  {
    logo: Google.src,
    company: "Google LLC",
    type: "IT Corporation",
    vacancies: 23,
    applications: 3440,
  },
  {
    logo: Google.src,
    company: "Google LLC",
    type: "IT Corporation",
    vacancies: 23,
    applications: 3440,
  },
  {
    logo: Google.src,
    company: "Google LLC",
    type: "IT Corporation",
    vacancies: 23,
    applications: 3440,
  },
  {
    logo: Google.src,
    company: "Google LLC",
    type: "IT Corporation",
    vacancies: 23,
    applications: 3440,
  },
  {
    logo: Google.src,
    company: "Google LLC",
    type: "IT Corporation",
    vacancies: 23,
    applications: 3440,
  },
  {
    logo: Google.src,
    company: "Google LLC",
    type: "IT Corporation",
    vacancies: 23,
    applications: 3440,
  },
  {
    logo: Google.src,
    company: "Google LLC",
    type: "IT Corporation",
    vacancies: 23,
    applications: 3440,
  },
  {
    logo: Google.src,
    company: "Google LLC",
    type: "IT Corporation",
    vacancies: 23,
    applications: 3440,
  },
  {
    logo: Google.src,
    company: "Google LLC",
    type: "IT Corporation",
    vacancies: 23,
    applications: 3440,
  },
  {
    logo: Google.src,
    company: "Google LLC",
    type: "IT Corporation",
    vacancies: 23,
    applications: 3440,
  },
];

const ClientCard: React.FC<ClientProps> = ({ data }) => {
  return (
    <Paper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          px: 2,
          py: 4,
        }}
      >
        <Box sx={{ maxWidth: 70, maxHeight: 70 }}>
          <StyledImage src={data.logo} alt={data.company} />
        </Box>
        <Typography
          sx={{ fontSize: ".85rem", mb: "-10px", fontWeight: "bold" }}
        >
          {data.company}
        </Typography>
        <Typography sx={{ fontSize: ".685rem" }}>IT Corporation</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography sx={{ fontSize: ".6rem", fontWeight: "bold" }}>
            {data.vacancies} Vacancies
          </Typography>
          <Divider />
          <Typography sx={{ fontSize: ".6rem", fontWeight: "bold" }}>
            {data.applications} Applications
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

const ClientsTable: React.FC = () => {
  const [value, setValue] = React.useState<string>("");
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const smallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up("md")
  );

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

  return (
    <Card
      sx={{
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        my: (theme) => theme.spacing(4),
        background: "#fff",
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            my: 2,
          }}
        >
          <CardHeader title="Client List" sx={{ minWidth: 150 }} />

          <CustomTextField
            fullWidth
            value={value}
            onChange={(e) => setValue(e.target.value)}
            size="small"
            placeholder="Client, Company name..."
            sx={{ maxWidth: 400 }}
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
        </Box>
        {/* Place boxes here */}
        <Grid container spacing={3}>
          {data.map((item, i) => {
            return (
              <Grid item xs={6} sm={3} md={2.4} key={i}>
                <ClientCard data={item} />
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
      <TablePagination
        component="div"
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

export default ClientsTable;
