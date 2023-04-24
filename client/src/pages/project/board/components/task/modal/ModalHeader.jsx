import React from 'react'
import { Box, IconButton, useTheme } from '@mui/material'
import MoreIcon from '@mui/icons-material/MoreVert';
import { useMutation } from '@apollo/client';
import Dropdown from '../../../../../../components/Dropdown'
import { tokens } from '../../../../../../theme';
import { DELETE_TASK } from '../../../../../../graphql/mutations/taskMutations';
import { GET_BOARDBYPROJECT } from '../../../../../../graphql/queries/boardQueries';
import { useBoard } from '../../../context/BoardContext';
import { useTaskModal } from '../../../context/TaskModalContext';
import { useDeleteModal } from '../../../context/DeleteModalContext';

const ModalHeader = ({ task }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { projectId  } = useBoard();
  const { closeTaskModal } = useTaskModal();
  const { openDeleteModal  } = useDeleteModal();

  const [ deleteTask ] = useMutation(DELETE_TASK, {
    update: (cache, { data }) => {
      const { boardByProject } = cache.readQuery({
        query: GET_BOARDBYPROJECT,
        variables: {
          projectId
        },
      })
      const filteredTasks = boardByProject.tasks.filter(item => (
        item._id !== data.deleteTask._id
      ))

      cache.writeQuery({
        query: GET_BOARDBYPROJECT,
        variables: { projectId },
        data: {
          boardByProject: {
            ...boardByProject,
            tasks: filteredTasks
          }
        }
      })
    }
  });

  const handleDelete = () => {
    closeTaskModal();
    openDeleteModal({
      item: task.title,
      onAccept: () => (
        deleteTask({
          variables: { id: task._id },
        })
      )
    })
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