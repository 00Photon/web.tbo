import { Box, Button } from '@mui/material';
import Image from 'next/image';
import { Job } from '../../../../../../../../../types';

const JobCard: React.FC<Job & { setOpenApplicationFormModal: () => void }> = ({
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
}) => {
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
          {[
            { variant: 'outlined', label: 'Save Job' },
            { variant: 'contained', label: 'Apply Job' },
          ].map((button, index) => (
            <Button
              {...(index == 1 && { onClick: setOpenApplicationFormModal })}
              key={index}
              variant={button.variant as 'outlined' | 'contained'}
              sx={{ textTransform: 'none' }}
            >
              {button.label}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default JobCard;
