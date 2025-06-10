'use client';

import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Divider, IconButton, Tabs, Tab, CircularProgress, Grid, Snackbar, Alert, TextField } from '@mui/material';
import { ClientData, editClient } from '@/@core/services/ClientService';
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  client: ClientData | null;
  onClientUpdate?: (updatedClient: ClientData) => void; // Optional callback to update parent state
}

const ClientModal: React.FC<ModalProps> = ({ open, onClose, client, onClientUpdate }) => {
  const [activeTab, setActiveTab] = useState<'company' | 'contact' | 'account'>('company');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<ClientData>>({});
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  if (!client) return null;

  // Initialize form data when entering edit mode
  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      company_name: client.company_name || '',
      industry: client.industry || '',
      number_of_employees: client.number_of_employees || '',
      company_address: client.company_address || '',
      country: client.country || '',
      name: client.name || '',
      email: client.email || '',
      company_email_address: client.company_email_address || '',
      phone_number: client.phone_number || '',
      company_phone_number: client.company_phone_number || '',
      company_website: client.company_website || '',
      type_of_employer: client.type_of_employer || '',
      position_in_company: client.position_in_company || '',
      status: client.status || '',
    });
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const updatedClient = await editClient(client.id, formData);
      setSnackbar({
        open: true,
        message: 'Client updated successfully',
        severity: 'success',
      });
      // Call parent callback to update client list if provided
      if (onClientUpdate) {
        onClientUpdate(updatedClient);
      }
      setIsEditing(false);
      setTimeout(onClose, 1500); // Close modal after success
    } catch (error) {
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'Failed to update client',
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({});
  };

  const handleInputChange = (field: keyof ClientData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: 'company' | 'contact' | 'account') => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveTab(newValue);
      setIsLoading(false);
    }, 300);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Helper to render "Not Available" for missing fields
  const renderField = (value: string | number | undefined | null) => {
    return value ? value.toString() : 'Not Available';
  };

  // Helper to render editable field
  const renderEditableField = (label: string, field: keyof ClientData, value: string | undefined | null) => {
    return isEditing ? (
      <TextField
        label={label}
        value={formData[field] || ''}
        onChange={(e) => handleInputChange(field, e.target.value)}
        fullWidth
        size="small"
        sx={{ mb: 2 }}
        disabled={isLoading}
      />
    ) : (
      <>
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.primary', mb: 2 }}>
          {renderField(value)}
        </Typography>
      </>
    );
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
            {isEditing ? (
              <TextField
                value={formData.company_name || client.company_name || ''}
                onChange={(e) => handleInputChange('company_name', e.target.value)}
                size="small"
                disabled={isLoading}
              />
            ) : (
              renderField(client.company_name)
            )}
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
                    {renderEditableField('Industry', 'industry', client.industry)}
                  </Grid>
                  <Grid item xs={12}>
                    {renderEditableField('Employees', 'number_of_employees', client.number_of_employees)}
                  </Grid>
                  <Grid item xs={12}>
                    {renderEditableField('Address', 'company_address', client.company_address)}
                  </Grid>
                  <Grid item xs={12}>
                    {renderEditableField('Country', 'country', client.country)}
                  </Grid>
                   <Grid item xs={12}>
                    {renderEditableField('Phone Number', 'company_phone_number', client.company_phone_number)}
                  </Grid>
                </>
              )}
              {activeTab === 'contact' && (
                <>
                  <Grid item xs={12}>
                    {renderEditableField('Contact Person', 'name', client.name)}
                  </Grid>
                  <Grid item xs={12}>
                    {renderEditableField('Work Email', 'email', client.email)}
                  </Grid>
                  <Grid item xs={12}>
                    {renderEditableField('Company Email', 'company_email_address', client.company_email_address)}
                  </Grid>
                  <Grid item xs={12}>
                    {renderEditableField('Phone Number', 'phone_number', client.phone_number)}
                  </Grid>
                  
                  <Grid item xs={12}>
                    {isEditing ? (
                      <TextField
                        label="Website"
                        value={formData.company_website || client.company_website || ''}
                        onChange={(e) => handleInputChange('company_website', e.target.value)}
                        fullWidth
                        size="small"
                        sx={{ mb: 2 }}
                        disabled={isLoading}
                      />
                    ) : (
                      <>
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
                            mb: 2,
                          }}
                        >
                          {renderField(client.company_website)}
                        </Typography>
                      </>
                    )}
                  </Grid>
                </>
              )}
              {activeTab === 'account' && (
                <>
                  <Grid item xs={12}>
                    {renderEditableField('Type of Employer', 'type_of_employer', client.type_of_employer)}
                  </Grid>
                  <Grid item xs={12}>
                    {renderEditableField('Position in Company', 'position_in_company', client.position_in_company)}
                  </Grid>
                </>
              )}
              {activeTab === 'account' && (
                <Grid item xs={12}>
                  {renderEditableField('Status', 'status', client.status)}
                </Grid>
              )}
            </Grid>
          )}
        </Box>

        {/* Divider */}
        <Divider sx={{ mb: 3 }} />

        {/* Footer Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {isEditing ? (
            <>
              <Button
                variant="outlined"
                onClick={handleCancel}
                disabled={isLoading}
                sx={{ textTransform: 'none', fontWeight: 'medium' }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={isLoading}
                sx={{ textTransform: 'none', fontWeight: 'medium' }}
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                onClick={handleEdit}
                disabled={isLoading}
                sx={{ textTransform: 'none', fontWeight: 'medium' }}
              >
                Edit
              </Button>
              <Button
                onClick={onClose}
                variant="outlined"
                disabled={isLoading}
                sx={{ textTransform: 'none', fontWeight: 'medium' }}
              >
                Close
              </Button>
            </>
          )}
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
