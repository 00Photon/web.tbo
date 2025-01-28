import { Box, Checkbox } from '@mui/material';

const JobFilter: React.FC<{
  title: string;
  options?: { label: string; checkState: boolean }[];
}> = ({ title, options }) => {
  return (
    <Box sx={{ backgroundColor: 'white', padding: '20px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', px: '12px', gap: 2 }}>
        <Box sx={{ flexGrow: 1 }}>{title}</Box>
        <Box>{options ? 'Clear' : 'Clear All'}</Box>
      </Box>
      {options?.map((option, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox />
          {option.label}
        </Box>
      ))}
    </Box>
  );
};

export default JobFilter;
