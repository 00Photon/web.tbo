import React from 'react';
import { Modal, Box, Typography, Button, Divider, IconButton, Grid } from '@mui/material';
import { ClientData } from "@/@core/services/ClientService";
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  client: ClientData | null;
}

const ClientModal: React.FC<ModalProps> = ({ open, onClose, client }) => {
  if (!client) return null;

  return (
    <Modal 
      open={open} 
      onClose={onClose}
      aria-labelledby="client-modal-title"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          p: 3,
          outline: 'none'
        }}
      >
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3
        }}>
          <Typography variant="h5" component="h2" id="client-modal-title">
            {client.company_name}
          </Typography>
          <IconButton 
            onClick={onClose} 
            aria-label="close"
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        
        {/* Divider */}
        <Divider sx={{ mb: 3 }} />
        
        {/* Content */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Company Information
          </Typography>
          <Typography paragraph sx={{ mb: 2 }}>
            <strong>Industry:</strong> {client.industry}
          </Typography>
          <Typography paragraph sx={{ mb: 2 }}>
            <strong>Employees:</strong> {client.number_of_employees}
          </Typography>
          <Typography paragraph sx={{ mb: 2 }}>
            <strong>Address:</strong> {client.company_address}
          </Typography>
          
          <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
            Contact Information
          </Typography>
          <Typography paragraph sx={{ mb: 2 }}>
            <strong>Email:</strong> {client.email}
          </Typography>
          <Typography paragraph sx={{ mb: 2 }}>
            <strong>Company Email:</strong> {client.company_email_address}
          </Typography>
          <Typography paragraph sx={{ mb: 2 }}>
            <strong>Website:</strong> {client.company_website}
          </Typography>
          
          <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
            Account Details
          </Typography>
          <Typography paragraph sx={{ mb: 2 }}>
            <strong>Type:</strong> {client.type_of_employer}
          </Typography>
          <Typography paragraph>
            <strong>Account Type:</strong> {client.account_type}
          </Typography>
        </Box>
        
        {/* Divider */}
        <Divider sx={{ mb: 3 }} />
        
        {/* Footer buttons */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between'
        }}>
          <Button 
            variant="outlined" 
            color="error"
            onClick={() => {/* Add deactivate functionality here */}}
          >
            Deactivate
          </Button>
          <Box>
            <Button 
              onClick={onClose} 
              variant="outlined" 
              sx={{ mr: 1 }}
            >
              Close
            </Button>
            <Button 
              variant="contained"
              onClick={() => {/* Add edit functionality here */}}
            >
              Edit
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ClientModal;