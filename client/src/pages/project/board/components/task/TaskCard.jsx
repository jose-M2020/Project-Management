import { Avatar, AvatarGroup, Box, Chip, Stack, Typography, useTheme } from '@mui/material'
import AlarmOffIcon from '@mui/icons-material/AlarmOff';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Draggable } from 'react-beautiful-dnd'
import { tokens } from '../../../../../theme';
import { useBoard } from '../../../../../context/BoardContext';
import ProfileAvatar from '../../../../../components/user/ProfileAvatar';
import { formatDate } from '@fullcalendar/core';
import { hexToRgba } from '../../../../../helpers/colors';

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
            boxShadow: `0 0 5px ${colors.primary[800]}`,
            borderRadius: '5px',
            backdropFilter: 'blur(20px)',
            padding: '10px',
            backgroundColor: snapshot.isDragging ? hexToRgba(colors.primary[500], .4)  : hexToRgba(colors.primary[500], .8),
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
          </Box>
          { (task.dueDate || task.members) && (
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              gap={1}
            >
              <Box
                display='flex'
                alignItems='center'
                gap='2px'
              >
                {!!task?.dueDate ? (
                  <ScheduleIcon />
                ) : (
                  <AlarmOffIcon />
                )}
                <Typography component='span'>
                  {formatDate(+task?.dueDate, {
                    month: "short",
                    day: "numeric",
                  })}
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
            </Box>
          )}
        </Stack>
      )}
    </Draggable>
  )
}

export default TaskCard