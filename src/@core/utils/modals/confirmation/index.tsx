import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import React, { ReactNode } from 'react';

interface Props {
  open: boolean;
  closeFn: () => void;
  title: string;
  message?: string;
  customComponentsAsMessage?: ReactNode;
  buttonOneText: string;
  buttonTwoText: string;
  widthXS?: string;
  widthSM?: string;
  widthMD?: string;
  widthLG?: string;
  buttonOneClick: (data?: any) => any;
  buttonTwoClick: (data?: any) => any;
}

export const ConfirmationModal: React.FC<Props> = ({
  open,
  closeFn,
  title,
  message,
  customComponentsAsMessage,
  buttonOneText,
  buttonTwoText,
  buttonOneClick,
  buttonTwoClick,
  widthXS,
  widthSM,
  widthMD,
  widthLG,
}) => {
  return (
    <Dialog open={open} onClose={closeFn}>
      <Box
        sx={{
          width: {
            xs: `${widthXS}`,
            sm: `${widthSM}`,
            md: `${widthMD}`,
            lg: `${widthLG}`,
          },
        }}
      >
        <DialogTitle>
          <Box
            sx={{
              display: 'flex',
              position: 'relative',
              mb: '10px',
              mt: '10px',
            }}
          >
            <Box
              sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}
            >
              <Typography
                sx={{
                  color: '#0D0A0B',
                  fontSize: '24px',
                  fontWeight: 700,
                  textAlign: 'center',
                }}
              >
                {title}
              </Typography>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', sm: 'block' },
                position: 'absolute',
                right: 0,
                top: 4,
              }}
            >
              <Close
                onClick={() => closeFn()}
                sx={{ color: '#0D0A0B', cursor: 'pointer' }}
              />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          {customComponentsAsMessage ? (
            customComponentsAsMessage
          ) : (
            <Box sx={{ mb: '20px', width: { xs: 'auto', sm: '500px' } }}>
              <Typography
                sx={{ color: '#0D0A0B', fontSize: '16px', textAlign: 'center' }}
              >
                {message}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            mb: '50px',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'center', sm: 'none' },
          }}
        >
          <Box>
            <Button
              onClick={() => buttonOneClick()}
              variant={'outlined'}
              sx={{
                fontSize: '14px',
                py: '10px',
                px: { xs: '45px', sm: '40px' },
                ml: { xs: 1, sm: 0 },
                mr: { xs: 0, sm: 1 },
                mb: { xs: '20px', sm: '0px' },
                textTransform: 'none',
                fontWeight: 'bold',
                border: '2px solid',
                '&:hover': {
                  border: '2px solid',
                },
              }}
            >
              {buttonOneText}
            </Button>
          </Box>
          <Box>
            <Button
              onClick={() => buttonTwoClick()}
              variant={'contained'}
              sx={{
                fontSize: '14px',
                py: '10px',
                px: '40px',
                ml: { xs: 0, sm: 1 },
                textTransform: 'none',
                fontWeight: 'bold',
              }}
            >
              {buttonTwoText}
            </Button>
          </Box>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ConfirmationModal;
