import { Avatar, AvatarGroup, Box, Chip, Stack, Typography, useTheme } from '@mui/material'
import { Draggable } from 'react-beautiful-dnd'
import { tokens } from '../../../../../theme';
import { useBoard } from '../../../../../context/BoardContext';
import ProfileAvatar from '../../../../../components/user/ProfileAvatar';

const PriorityLabel = ({priority}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const color = {
    'Low': {
      color: colors.blueAccent[700],
      bgColor: colors.blueAccent[200]
    },
    'Medium': {
      color: colors.greenAccent[700],
      bgColor: colors.greenAccent[200]
    },
    'High': {
      color: colors.redAccent[700],
      bgColor: colors.redAccent[200]
    }
  }

  return (
    <Box>
      <Chip
        label={`${priority} priority`}
        size="small"
        sx={{
          backgroundColor: color[priority].bgColor,
          color: color[priority].color,
          fontWeight: 'bold'
        }}
      />
    </Box>
  )
}

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
          <PriorityLabel priority={task.priority} />
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
          {task?.members?.length && (
            <AvatarGroup max={3}>
              {task.members.map(item => (
                <ProfileAvatar
                  name={item.firstname}
                  sx={{
                    bgcolor: colors.blueAccent[500],
                    width: 28, height: 28,
                    borderColor: `${colors.blueAccent[700]} !important`
                  }}
                />
              ))}
            </AvatarGroup>
          )}
        </Stack>
      )}
    </Draggable>
  )
}

export default TaskCard