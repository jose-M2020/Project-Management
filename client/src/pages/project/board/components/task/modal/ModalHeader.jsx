import React from 'react'
import { Box, IconButton, useTheme } from '@mui/material'
import MoreIcon from '@mui/icons-material/MoreVert';
import { useMutation } from '@apollo/client';
import Dropdown from '../../../../../../components/Dropdown'
import { tokens } from '../../../../../../theme';
import { DELETE_TASK } from '../../../../../../graphql/mutations/taskMutations';
import { GET_BOARDBYPROJECT } from '../../../../../../graphql/queries/boardQueries';
import { useBoard } from '../../../context/BoardContext';
import { useModal } from '../../../context/ModalContext';

const ModalHeader = ({ task }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { projectId  } = useBoard();
  const { closeTaskModal } = useModal();

  const [ deleteTask ] = useMutation(DELETE_TASK, {
    refetchQueries: [{ 
      query: GET_BOARDBYPROJECT, variables: { projectId } 
    }]
  });

  const handleDelete = () => {
    console.log('deleting...')
    deleteTask({
			variables: { id: task._id },
		})
    closeTaskModal();
  }

  return (
    <Box
      px={4}
      py={2}
      bgcolor={colors.primary[400]}
      display='flex'
      justifyContent='space-between'
      alignItems='center'
    >
      <Box>
        Header
      </Box>
      <Box>
        <Dropdown
          button={
            <IconButton>
              <MoreIcon />
            </IconButton>
          }
          options={[
            {
              title: 'Delete',
              onClick: handleDelete
            }
          ]}
        />
      </Box>
    </Box>
  )
}

export default ModalHeader