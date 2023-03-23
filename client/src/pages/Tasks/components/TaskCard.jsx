import { Box, Typography, useTheme } from '@mui/material'
import { Draggable } from 'react-beautiful-dnd'
import { tokens } from '../../../theme';

const TaskCard = ({ task, index }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          // isDragging={snapshot.isDragging}
          aria-roledescription="Press space bar to lift the task"
          sx={{
            boxShadow: `0 0 2px ${colors.blueAccent[100]}`,
            borderRadius: '5px',
            padding: '8px',
            backgroundColor: snapshot.isDragging ? colors.blueAccent[500] : colors.blueAccent[600]
          }}
        >
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
      )}
    </Draggable>
  )
}

export default TaskCard