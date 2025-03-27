'use client';

import { Box, Stack, Typography } from '@mui/material';
import InterviewAlertsTable from './components/table';
import JobApplicationsPanel from '../applications/components/panel';
import PaginationControl from '../applications/components/pagination-control';
import { useState } from 'react';
import { Person, Badge } from '@mui/icons-material';

export default function TalentProfilePage() {
  const [activeTab, setActiveTab] = useState(0);

  const hoverTabStyle = {
    backgroundColor: '#F5F0F0',
    color: '#E61C31',
  };

  return (
    <main>
      <Stack flexGrow={1} gap={1}>
        <Typography
          sx={{ fontWeight: 600, color: '#39353D', fontSize: '20px' }}
        >
          Interviews
        </Typography>
        <Typography sx={{ fontSize: '13px', mb: '14px' }}>
          See interview schedules you have
        </Typography>
      </Stack>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: '#FFFFFF',
          mb: '20px',
          width: 'fit-content',
        }}
      >
        {[
          // {
          //   icon: <Person />,
          //   name: 'All Interviews',
          // },
          // {
          //   icon: <Badge />,
          //   name: 'Upcoming Interviews',
          // },
        ].map((tab, index) => (
          <Box
            onClick={() => setActiveTab(index)}
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#98A2B3',
              border: '1px solid #EEEEEE',
              px: '10px',
              py: '5px',
              cursor: 'pointer',
              '&:hover': hoverTabStyle,
              ...(activeTab == index && hoverTabStyle),
            }}
          >
        
          </Box>
        ))}
      </Box>
      <Stack gap={2}>
        <JobApplicationsPanel />
        <Stack gap={2}>
          <PaginationControl />
          <InterviewAlertsTable />
        </Stack>
      </Stack>
    </main>
  );
}
