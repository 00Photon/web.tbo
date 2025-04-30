import { Box, Button, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import Image from 'next/image';
import { Job } from '../../../../../../../../../types';
import { saveJob, applyJob } from '@/@core/services/jobVanciesService';
import { useState } from 'react';
import { styled } from '@mui/system';
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
    background-color: #5cb85c;
    color: white;
    &:hover {
      background-color: #4cae4c;
    }
  }
  &.MuiButton-outlined {
    background-color: #f8f9fa;
    color: #5cb85c;
    border: 1px solid #5cb85c;
    &:hover {
      background-color: #d9d9d9;
    }
  }
`;
const JobCard: React.FC<
  Job & {
    setOpenApplicationFormModal: () => void;
  }
> = ({
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
 
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [saved, setSaved] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('error');

  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [actionType, setActionType] = useState<'save' | 'apply'>('save'); // Track action type (save or apply)

  const handleDialogOpen = (action: 'save' | 'apply') => {
    setActionType(action);
    setOpenDialog(true); // Open dialog for confirmation
  };

  const handleDialogClose = () => {
    setOpenDialog(false); // Close the dialog without performing any action
  };

  const handleConfirmAction = async () => {
    if (actionType === 'save') {
      handleSaveJob();
    } else if (actionType === 'apply') {
      handleApplyJob();
    }
    setOpenDialog(false); // Close dialog after action
  };

  const handleSaveJob = async () => {
    if (!id) {
      setSnackbarMessage('Job ID is missing');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      setIsSaving(true);
      await saveJob(id); 
      setSaved(true);
      setSnackbarMessage('Job saved successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Could not save job. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleApplyJob = async () => {
    if (!id) {
      setSnackbarMessage('Job ID is missing');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      setIsApplying(true); 
      await applyJob(id); 
      setSnackbarMessage('Applied to job successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Could not apply to job. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setIsApplying(false); 
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); 
  };

  return (
    <Box
      sx={{
        border: '1px solid #E4E5E8',
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box
          sx={{
            backgroundColor: '#EDEFF5',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'flex-start',
          }}
        >
          <Image src={logo} width={18} height={18} alt={`${name} Logo`} />
        </Box>
        <Box>
          <Box>{name}</Box>
          <Box>{location}</Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Box>
            <Image
              src='/icons/bookmark.svg'
              width={18}
              height={18}
              alt='Bookmark Icon'
            />
          </Box>
          <Box>{postedAt}</Box>
        </Box>
      </Box>
      <Box>{title}</Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Box>{commitment}</Box>
        <Box>Salary: {salary}</Box>
      </Box>
      <Box>{description}</Box>
      <Box sx={{ display: 'flex', gap: 3 }}>
        {[commitment, `${noOfApplied} Applied`, `${daysLeft} Days Left`].map(
          (item, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
              <Image
                src='/icons/location_marker.svg'
                width={18}
                height={18}
                alt='Location Marker Icon'
              />
              {item}
            </Box>
          )
        )}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Button
            variant='outlined'
            sx={{ textTransform: 'none' }}
            onClick={() => handleDialogOpen('save')}
            disabled={saved || isSaving}
          >
            {saved ? 'Saved' : isSaving ? 'Saving...' : 'Save Job'}
          </Button>
          <Button
            variant='contained'
            sx={{ textTransform: 'none' }}
            onClick={() => handleDialogOpen('apply')}
            disabled={isApplying}
          >
            {isApplying ? 'Applying...' : 'Apply Job'}
          </Button>
        </Box>
      </Box>

      {/* Confirmation Dialog */}
      <StyledDialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitleStyled>Confirm Action</DialogTitleStyled>
        <DialogContentStyled>
          <Typography variant="body1">
            Are you sure you want to {actionType === 'save' ? 'save' : 'apply for'} this job?
          </Typography>
        </DialogContentStyled>
        <DialogActionsStyled>
          <ButtonStyled onClick={handleDialogClose} variant="outlined">Cancel</ButtonStyled>
          <ButtonStyled onClick={handleConfirmAction} variant="contained">Confirm</ButtonStyled>
        </DialogActionsStyled>
      </StyledDialog>

      {/* Snackbar to show success or error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default JobCard;
