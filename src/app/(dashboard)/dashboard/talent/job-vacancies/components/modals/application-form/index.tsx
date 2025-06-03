"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { applyJob } from "@/@core/services/jobVanciesService";
import axios from "axios";

interface ApplicationFormModalProps {
  open: boolean;
  onClose: () => void;
  newApplication: boolean;
  jobId?: number;
}

export default function ApplicationFormModal({
  open,
  onClose,
  newApplication,
  jobId,
}: ApplicationFormModalProps) {
  const [step, setStep] = useState<"choice" | "submitting" | "submitted" | "alreadyApplied">("choice");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Auto-close modal after 3 seconds for submitted or alreadyApplied steps
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "submitted" || step === "alreadyApplied") {
      timer = setTimeout(() => {
        handleClose();
      }, 3000);
    }
    return () => clearTimeout(timer); // Cleanup timer
  }, [step]);

  const submitApplication = async () => {
    if (!jobId) {
      setError("Job ID is missing");
      setStep("choice");
      return;
    }

    setStep("submitting");
    try {
      await applyJob(jobId); // Call the provided applyJob service
      setStep("submitted");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        setStep("alreadyApplied");
      } else {
        setError("Failed to submit application. Please try again.");
        setStep("choice");
      }
    }
  };

  const handleUseCurrentProfile = () => {
    submitApplication();
  };

  const handleEditProfile = () => {
    router.push("/dashboard/talent/profile"); // Redirect to profile page
    onClose(); // Close the modal
  };

  const handleClose = () => {
    setStep("choice");
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      {step === "choice" && (
        <>
          <DialogTitle sx={{ color: "#333", fontWeight: 600, textAlign: "center" }}>
            Apply for Job
          </DialogTitle>
          <DialogContent>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Typography sx={{ textAlign: "center" }}>
              Would you like to use your current profile or edit your profile before applying?
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button
              onClick={handleUseCurrentProfile}
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: "#E61C31",
                "&:hover": { backgroundColor: "#C8102E" },
              }}
              aria-label="Apply with current profile"
            >
              Use Current Profile
            </Button>
            <Button
              onClick={handleEditProfile}
              variant="outlined"
              sx={{
                textTransform: "none",
                color: "#E61C31",
                borderColor: "#E61C31",
                "&:hover": { borderColor: "#C8102E", backgroundColor: "#FFF5F5" },
              }}
              aria-label="Edit profile"
            >
              Edit Profile
            </Button>
            <Button
              onClick={handleClose}
              variant="text"
              sx={{ textTransform: "none", color: "#6B7280" }}
              aria-label="Cancel application"
            >
              Cancel
            </Button>
          </DialogActions>
        </>
      )}

      {step === "submitting" && (
        <>
          <DialogTitle sx={{ color: "#333", fontWeight: 600, textAlign: "center" }}>
            Submitting Application
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress sx={{ color: "#E61C31" }} />
            </Box>
          </DialogContent>
        </>
      )}

      {step === "submitted" && (
        <>
          <DialogTitle sx={{ color: "#333", fontWeight: 600, textAlign: "center" }}>
            Application Submitted
          </DialogTitle>
          <DialogContent>
            <Alert severity="success">
              Your profile has been successfully sent to the employer!
            </Alert>
          </DialogContent>
        </>
      )}

      {step === "alreadyApplied" && (
        <>
          <DialogTitle sx={{ color: "#333", fontWeight: 600, textAlign: "center" }}>
            Application Status
          </DialogTitle>
          <DialogContent>
            <Alert severity="info">
              You have already applied. Please wait to be contacted by the employer.
            </Alert>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}