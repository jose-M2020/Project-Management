import React from 'react'
import CustomModal from '../../../../components/CustomModal'
import { Box, Typography } from '@mui/material'
import CustomButton from '../../../../components/CustomButton'

const Modal = ({ closeModal, data }) => {
  const handleClick = () => {
    data?.onAccept();
    closeModal();
  }
  
  return (
    <CustomModal
      open={!!data}
      handleClose={closeModal}
    >
      <Box mb={2}>
        <Typography variant="h4" component="h2" mb={1}>
          Are you sure you want to delete<b> {data?.item}</b>?
        </Typography>
        <Typography variant="span">
          This action cannot be undone. Please confirm your decision before proceeding.
        </Typography>
      </Box>
      <Box display='flex' justifyContent='end'>
        <CustomButton
          text='Accept'
          btnstyle='danger'
          type='submit'
          onClick={handleClick}
          // loading={deleting}
        />
      </Box>
    </CustomModal>
  )
}

export default Modal