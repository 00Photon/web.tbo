"use client";
import {
  Box,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { saveJob } from "@/@core/services/jobVanciesService";
import { useState, useEffect } from "react";
import { styled } from "@mui/system";
import axios from "axios";

const StyledDialog = styled(Dialog)`
  & .MuiDialog-paper {
    border-radius: 12px;
    padding: 20px;
    background: #fff;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

const DialogTitleStyled = styled(DialogTitle)`
  text-align: center;
  font-size: 1.25rem;
  color: #333;
  font-weight: 600;
`;

const DialogContentStyled = styled(DialogContent)`
  padding: 20px;
  text-align: center;
`;

const DialogActionsStyled = styled(DialogActions)`
  justify-content: center;
`;

const ButtonStyled = styled(Button)`
  text-transform: none;
  padding: 8px 20px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  margin: 10px;
  &.MuiButton-contained {
    background-color: #E61C31;
    color: white;
    &:hover {
      background-color: #C8102E;
    }
  }
  &.MuiButton-outlined {
    background-color: #f8f9fa;
    color: #E61C31;
    border: 1px solid #E61C31;
    &:hover {
      background-color: #d9d9d9;
    }
  }
`;

interface JobCardProps {
  id: number;
  logo: string;
  name: string;
  location: string;
  title: string;
  commitment: string;
  salary: string;
  description: string;
  noOfApplied: string;
  postedAt: string;
  daysLeft: string;
  setOpenApplicationFormModal: (jobId: number) => void;
  hideSaveButton?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  logo,
  name,
  location,
  title,
  commitment,
  salary,
  description,
  noOfApplied,
  postedAt,
  daysLeft,
  setOpenApplicationFormModal,
  hideSaveButton = false,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info">("error");
  const [openDialog, setOpenDialog] = useState(false);

  // Auto-close snackbar after 3 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (openSnackbar) {
      timer = setTimeout(() => {
        setOpenSnackbar(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [openSnackbar]);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleConfirmSave = async () => {
    if (!id) {
      setSnackbarMessage("Job ID is missing");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      setOpenDialog(false);
      return;
    }

    try {
      setIsSaving(true);
      await saveJob(id);
      setSaved(true);
      setSnackbarMessage("Job saved successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setSnackbarMessage("You have already saved this job.");
        setSnackbarSeverity("info");
        setSaved(true);
      } else {
        setSnackbarMessage("Could not save job. Please try again.");
        setSnackbarSeverity("error");
      }
      setOpenSnackbar(true);
    } finally {
      setIsSaving(false);
      setOpenDialog(false);
    }
  };

  const handleApplyJob = () => {
    if (!id) {
      setSnackbarMessage("Job ID is missing");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }
    setOpenApplicationFormModal(id);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        border: "1px solid #E4E5E8",
        borderRadius: "8px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 3 }}>
        <Box
          sx={{
            backgroundColor: "#EDEFF5",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "flex-start",
          }}
        >
          <Image
            src={logo || "/unknown.png"}
            width={18}
            height={18}
            alt={`${name} Logo`}
          />
        </Box>
        <Box>
          <Box>{name}</Box>
          <Box>{location}</Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Box>
            <Image
              src="/icons/bookmark.svg"
              width={18}
              height={18}
              alt="Bookmark Icon"
            />
          </Box>
          <Box>{postedAt}</Box>
        </Box>
      </Box>
      <Box>{title}</Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Box>{commitment}</Box>
        <Box>Salary: {salary}</Box>
      </Box>
      <Box>{description}</Box>
      <Box sx={{ display: "flex", gap: 3 }}>
        {[commitment, `${noOfApplied} Applied`, `${daysLeft} Days Left`].map(
          (item, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
              <Image
                src="/icons/location_marker.svg"
                width={18}
                height={18}
                alt="Location Marker Icon"
              />
              {item}
            </Box>
          )
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Box sx={{ display: "flex", gap: 3 }}>
          {!hideSaveButton && (
            <ButtonStyled
              variant="outlined"
              onClick={handleDialogOpen}
              disabled={saved || isSaving}
              aria-label="Save job"
            >
              {saved ? "Saved" : isSaving ? "Saving..." : "Save Job"}
            </ButtonStyled>
          )}
          <ButtonStyled
            variant="contained"
            onClick={handleApplyJob}
            aria-label="Apply for job"
          >
            Apply Now
          </ButtonStyled>
        </Box>
      </Box>

      {/* Confirmation Dialog for Save Job */}
      <StyledDialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitleStyled>Confirm Action</DialogTitleStyled>
        <DialogContentStyled>
          <Typography variant="body1">
            Are you sure you want to save this job?
          </Typography>
        </DialogContentStyled>
        <DialogActionsStyled>
          <ButtonStyled
            onClick={handleDialogClose}
            variant="outlined"
            aria-label="Cancel save"
          >
            Cancel
          </ButtonStyled>
          <ButtonStyled
            onClick={handleConfirmSave}
            variant="contained"
            aria-label="Confirm save"
          >
            Confirm
          </ButtonStyled>
        </DialogActionsStyled>
      </StyledDialog>

      {/* Snackbar for success/error/info messages */}
      <Snackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default JobCard;