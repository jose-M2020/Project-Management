import { useState } from 'react'
import { Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation } from '@apollo/client';
import CustomButton from '../../../../components/CustomButton';
import CustomModal from '../../../../components/CustomModal';
import { DELETE_CLIENT } from '../../../../graphql/mutations/clientMutations';

const DeleteButton = ({ selectedItems }) => {
  const [open, setOpen] = useState(false);

  const [
    deleteUser,
    {loading: deleting }
  ] = useMutation(DELETE_CLIENT, {
    refetchQueries: ["getClients"],
  });

  const handleModal = () => setOpen(!open);

  const handleDelete = () => {
    deleteUser({
			variables: { ids: selectedItems },
		});
  }

  return (
    <div>
      <IconButton
            disabled={selectedItems.length > 0 ? false: true}
            onClick={ handleModal }
          >
            <DeleteIcon />
          </IconButton>
      <CustomModal
        open={open}
        handleClose={handleModal}
      >
        <Box mb={2}>
          <Typography variant="h4" component="h2" mb={1}>
            Are you sure you want to delete?
          </Typography>
          <Typography variant="span">
            This action cannot be undone. Please confirm your decision before proceeding.
          </Typography>
        </Box>
        <Box display='flex' justifyContent='end'>
          <CustomButton
            text='Accept'
            btnstyle='danger'
            loading={deleting}
            onClick={ handleDelete }
          />
        </Box>
      </CustomModal>
    </div>
  )
}

export default DeleteButton