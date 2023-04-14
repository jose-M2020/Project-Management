import { Avatar, AvatarGroup, Box, Chip, Stack, Typography, useTheme } from '@mui/material'
import { Draggable } from 'react-beautiful-dnd'
import { tokens } from '../../../../../theme';
import { useBoard } from '../../../../../context/BoardContext';

const TaskCard = ({ task, index }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { openTaskModal } = useBoard();
  
  return (
    <Draggable
      draggableId={task._id}
      index={index}
    >
      {(provided, snapshot) => (
        <Stack
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          // isDragging={snapshot.isDragging}
          spacing={1}
          aria-roledescription="Press space bar to lift the task"
          sx={{
            boxShadow: `0 0 2px ${colors.blueAccent[100]}`,
            borderRadius: '5px',
            padding: '10px',
            backgroundColor: snapshot.isDragging ? colors.blueAccent[600] : colors.blueAccent[700],
          }}
          onClick={() => openTaskModal(task)}
        >
          <Box>
            <Chip
              label={`${task.priority} priority`}
              size="small"
              sx={{ backgroundColor: colors.blueAccent[800] }}
            />
          </Box>
          <Box>
            <Typography
              component='div'
              variant='h5'
              fontWeight='bold'
            >
              {task.title}
            </Typography>
            <Typography
              component='div'
              variant='p'
              sx={{
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
              }}
            >
              {task.description}
            </Typography>
          </Box>
          <AvatarGroup max={3}>
            <Avatar 
              sx={{
                bgcolor: colors.blueAccent[500],
                width: 24, height: 24
              }}
            >
              N
            </Avatar>
            <Avatar 
              sx={{
                bgcolor: colors.blueAccent[500],
                width: 24, height: 24
              }}
            >
              JM
            </Avatar>

          </AvatarGroup>
        </Stack>
      )}
    </Draggable>
  )
}

export default TaskCard