// components/ClientModal.tsx
'use client';

import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Divider, IconButton, Tabs, Tab, CircularProgress, Grid, Snackbar, Alert } from '@mui/material';
import { ClientData } from '@/@core/services/ClientService';
import { deactivateClient } from '@/@core/services/ClientService';
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  client: ClientData | null;
}

const ClientModal: React.FC<ModalProps> = ({ open, onClose, client }) => {
  const [activeTab, setActiveTab] = useState<'company' | 'contact' | 'account'>('company');
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  if (!client) return null;

  const handleTabChange = (event: React.SyntheticEvent, newValue: 'company' | 'contact' | 'account') => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveTab(newValue);
      setIsLoading(false);
    }, 300);
  };

  const handleEdit = () => {
    console.log('Edit client:', client);
    // Implement edit logic here
  };

  const handleDeactivate = async () => {
    try {
      setIsLoading(true);
      await deactivateClient(client.id); // Assumes ClientData has an 'id' field
      setSnackbar({
        open: true,
        message: 'Client deactivated successfully',
        severity: 'success',
      });
      setTimeout(onClose, 1500); // Close modal after success
    } catch (error) {
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'Failed to deactivate client',
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Helper to render "Not Available" for missing fields
  const renderField = (value: string | number | undefined | null) => {
    return value ? value.toString() : 'Not Available';
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="client-modal-title"
      aria-describedby="client-modal-description"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box
        sx={{
          position: 'relative',
          width: { xs: '90%', sm: 600, md: 700 },
          maxWidth: '100%',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: { xs: 2, sm: 3 },
          outline: 'none',
          maxHeight: '90vh',
          overflowY: 'auto',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography id="client-modal-title" variant="h5" component="h2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            {renderField(client.company_name)}
          </Typography>
          <IconButton
            onClick={onClose}
            aria-label="close"
            sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
            disabled={isLoading}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="client information tabs"
          sx={{
            mb: 2,
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 'medium',
              '&:hover': { bgcolor: 'action.hover' },
            },
            '& .Mui-selected': { color: 'primary.main', fontWeight: 'bold' },
          }}
        >
          <Tab label="Company Info" value="company" />
          <Tab label="Contact Info" value="contact" />
          <Tab label="Account Details" value="account" />
        </Tabs>

        {/* Content */}
        <Box sx={{ minHeight: 200, position: 'relative', mb: 3 }}>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress size={40} />
            </Box>
          ) : (
            <Grid container spacing={2} id="client-modal-description">
              {activeTab === 'company' && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Industry
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary' }}>
                      {renderField(client.industry)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Employees
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary' }}>
                      {renderField(client.number_of_employees)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Address
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary' }}>
                      {renderField(client.company_address)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Country
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary' }}>
                      {renderField(client.country)}
                    </Typography>
                  </Grid>
                </>
              )}
              {activeTab === 'contact' && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Contact Person
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary' }}>
                      {renderField(client.name)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Work Email
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary' }}>
                      {renderField(client.email)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Company Email
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary' }}>
                      {renderField(client.company_email_address)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Phone Number
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary' }}>
                      {renderField(client.company_phone_number)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Website
                    </Typography>
                    <Typography
                      component="a"
                      href={client.company_website || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: client.company_website ? 'primary.main' : 'text.secondary',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: client.company_website ? 'underline' : 'none' },
                      }}
                    >
                      {renderField(client.company_website)}
                    </Typography>
                  </Grid>
                </>
              )}
              {activeTab === 'account' && (
                <>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Type of Employer
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary' }}>
                      {renderField(client.type_of_employer)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Position in Company
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary' }}>
                      {renderField(client.position_in_company)}
                    </Typography>
                  </Grid>
                </>
              )}
            </Grid>
          )}
        </Box>

        {/* Divider */}
        <Divider sx={{ mb: 3 }} />

        {/* Footer Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDeactivate}
            disabled={isLoading}
            sx={{ textTransform: 'none', fontWeight: 'medium' }}
          >
            Deactivate
          </Button>
          <Box>
            <Button
              onClick={onClose}
              variant="outlined"
              disabled={isLoading}
              sx={{ mr: 1, textTransform: 'none', fontWeight: 'medium' }}
            >
              Close
            </Button>
            {/* <Button
              variant="contained"
              onClick={handleEdit}
              disabled={isLoading}
              sx={{ textTransform: 'none', fontWeight: 'medium' }}
            >
              Edit
            </Button> */}
          </Box>
        </Box>

        {/* Snackbar for Success/Error Messages */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
};

export default ClientModal;