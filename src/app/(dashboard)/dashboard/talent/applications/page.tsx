'use client';
import { Stack, Typography } from '@mui/material';
import JobApplicationsTable from './components/table';
import JobApplicationsPanel from './components/panel';
import PaginationControl from './components/pagination-control';
import { useState } from 'react';
import ApplicationFormModal from '../job-vacancies/components/modals/application-form';
import ConfirmationModal from '@/@core/utils/modals/confirmation';

export default function TalentApplicationsPage() {
  const [openApplicationModal, setOpenApplicationModal] = useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <main>
      <Stack flexGrow={1} gap={1}>
        <Typography
          sx={{ fontWeight: 600, color: '#39353D', fontSize: '20px' }}
        >
          Job Applications
        </Typography>
        <Typography sx={{ fontSize: '13px', mb: '14px' }}>
          See jobs past jobs you have applied for
        </Typography>
      </Stack>
      <Stack gap={2}>
        <JobApplicationsPanel />
        <Stack gap={1}>
          <PaginationControl />
          <JobApplicationsTable
            setOpenApplicationModal={() => setOpenApplicationModal(true)}
            setOpenWithdrawModal={() => setOpenWithdrawModal(true)}
          />
        </Stack>
      </Stack>
      <ApplicationFormModal
        open={openApplicationModal}
        onClose={() => setOpenApplicationModal(false)}
        onDeleteClick={() => setOpenDeleteModal(true)}
      />
      <ConfirmationModal
        title='Withdraw Application'
        message={`Are you sure you want to withdraw your application? \n \n The Job will be deleted from your list and a notification would be sent to the Job Poster`}
        buttonOneText='No, Cancel'
        buttonTwoText='Yes, Continue'
        buttonOneClick={() => setOpenWithdrawModal(false)}
        buttonTwoClick={() => {}}
        open={openWithdrawModal}
        closeFn={() => setOpenWithdrawModal(false)}
      />
      <ConfirmationModal
        open={openDeleteModal}
        closeFn={() => setOpenDeleteModal(false)}
        title='Delete Application'
        message='Are you sure you want to delete your application? Your record will be deleted from the job poster database, and will no longer have access to your record'
        buttonOneText='Cancel'
        buttonTwoText='Yes, Continue'
        buttonOneClick={() => setOpenDeleteModal(false)}
        buttonTwoClick={() => {}}
      />
    </main>
  );
}
