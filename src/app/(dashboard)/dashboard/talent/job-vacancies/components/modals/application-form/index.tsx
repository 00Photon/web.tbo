import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import PictureSection from '../../../../profile/tabs/my-profile/sections/picture';
import PersonalInformation from '../../../../profile/tabs/my-profile/sections/personal-information';
import OtherInformationTab from '../../../../profile/tabs/my-profile/sections/other-information';
import { Close, Delete } from '@mui/icons-material';
import PastExperienceFormSection from '@/@core/utils/form/sections/past-experience';

const ApplicationFormModal: React.FC<{
  open: boolean;
  onClose: () => void;
  newApplication?: boolean;
  onDeleteClick?: () => void;
}> = ({ open, onClose, newApplication, onDeleteClick }) => {
  return (
    <Dialog sx={{ maxWidth: 'none' }} open={open} onClose={onClose}>
      {/** Global style created to remove max width of dialog. This allows the width to be properly adjusted */}
      <Box sx={{ width: '100%', pb: '15px', px: '20px' }}>
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
                  fontSize: '20px',
                  fontWeight: 700,
                  textAlign: 'center',
                }}
              >
                {'Job Application Form'}
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
                onClick={() => onClose()}
                sx={{ color: '#0D0A0B', cursor: 'pointer' }}
              />
            </Box>
          </Box>
        </DialogTitle>
        <Stack gap={4}>
          <Divider />
          {newApplication ? (
            <Stack direction='row' justifyContent='center'>
              <Button
                sx={{
                  textTransform: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
                variant='contained'
              >
                Automatically Apply with Existing Job Profile Details
              </Button>
            </Stack>
          ) : (
            <Stack direction='row' justifyContent='flex-end'>
              <Stack direction='row' alignItems='center' gap={3}>
                {[
                  {
                    icon: <Delete sx={{ marginRight: '5px' }} />,
                    label: 'Delete',
                    variant: 'outlined',
                  },
                  {
                    icon: null,
                    label: 'Edit Application',
                    variant: 'contained',
                  },
                ].map((button, index) => (
                  <Button
                    key={index}
                    {...(index == 0 && { onClick: onDeleteClick })}
                    variant={button.variant as 'outlined' | 'contained'}
                    sx={{ textTransform: 'none' }}
                  >
                    {button.icon}
                    {button.label}
                  </Button>
                ))}
              </Stack>
            </Stack>
          )}
          <Divider />
        </Stack>
        <DialogContent>
          {newApplication && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: '20px' }}>
              <Typography
                sx={{
                  color: '#0D0A0B',
                  fontSize: '20px',
                  fontWeight: 700,
                  textAlign: 'center',
                }}
              >
                {'Or Apply Manually (Fill Form Below)'}
              </Typography>
            </Box>
          )}
          <Grid rowSpacing={3} columnSpacing={5} container>
            <Grid lg={2.5} item>
              <PictureSection />
            </Grid>
            <Grid lg={9.5} item>
              <PersonalInformation />
            </Grid>
          </Grid>
          <Divider sx={{ mt: '35px', mb: '20px' }} />
          <PastExperienceFormSection />
          <Divider sx={{ mt: '35px' }} />
          <Stack gap={4}>
            <OtherInformationTab />
            <Stack direction='row' justifyContent='center'>
              <Button
                sx={{
                  textTransform: 'none',
                  paddingX: { xs: '', sm: '150px' },
                  paddingY: { xs: '10px', sm: '10px' },
                  width: { xs: '100%', sm: 'auto' },
                  fontWeight: 600,
                }}
                variant='contained'
              >
                Send Application
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default ApplicationFormModal;
