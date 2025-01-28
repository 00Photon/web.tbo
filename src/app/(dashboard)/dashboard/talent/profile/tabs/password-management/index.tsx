import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const PasswordManagementTab = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const fieldsData = [
    {
      label: 'Old password',
      name: 'oldPassword',
      placeholder: 'Enter Password',
      showState: showOldPassword,
      showStateSetter: setShowOldPassword,
    },
    {
      label: 'New password',
      name: 'newPassword',
      placeholder: 'Enter Password',
      showState: showNewPassword,
      showStateSetter: setShowNewPassword,
    },
    {
      label: 'Confirm password',
      name: 'confirmPassword',
      placeholder: 'Enter Password',
      showState: showConfirmPassword,
      showStateSetter: setShowConfirmPassword,
    },
  ];

  const fieldErrorMessageStyle = {
    fontSize: '11px',
    marginTop: '5px',
    color: '#E61C31',
  };

  return (
    <Box>
      <form
        onSubmit={handleSubmit((data) => {
          alert(JSON.stringify(data));
        })}
      >
        <Box>
          <Typography
            sx={{ fontWeight: 600, color: '#39353D', fontSize: '16px' }}
          >
            Password Management
          </Typography>
          <Typography sx={{ fontSize: '13px', mb: '10px' }}>
            Make changes to your password
          </Typography>
          <Divider sx={{ my: '20px' }} />
          {fieldsData.map((field, index) => (
            <Box
              key={index}
              sx={{ marginBottom: '14px', width: { xs: '100%', md: '50%' } }}
            >
              <Box
                sx={{
                  color: '#101928',
                  fontSize: '12px',
                  fontWeight: 500,
                  marginBottom: '5px',
                }}
              >
                {field.label}
              </Box>
              <TextField
                {...register(field.name, {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must have at least 8 characters',
                  },
                })}
                type={field.showState ? 'text' : 'password'}
                placeholder={field.placeholder}
                sx={{ width: '100%' }}
                inputProps={{ style: { fontSize: '12px' } }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => field.showStateSetter(!field.showState)}
                        edge='end'
                      >
                        {field.showState ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              <p style={fieldErrorMessageStyle}>{`${
                errors[field.name] ? errors[field.name]?.message : ''
              }`}</p>
            </Box>
          ))}
        </Box>
        <Divider sx={{ my: '20px' }} />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant='contained'
            type='submit'
            sx={{ textTransform: 'none', px: '100px', py: '10px' }}
          >
            Save Changes
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default PasswordManagementTab;
