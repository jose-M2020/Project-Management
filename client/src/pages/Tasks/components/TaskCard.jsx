import { Box, useTheme } from '@mui/material'
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
            border: '1px solid lightgrey',
            borderRadius: '2px',
            padding: '8px',
            marginBottom: '8px',
            backgroundColor: snapshot.isDragging ? colors.blueAccent[500] : colors.blueAccent[600]
          }}
        >
          {task.content}
        </Box>
      )}
    </Draggable>
  )
}

export default TaskCard