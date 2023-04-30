import { Box, useTheme } from '@mui/material';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import NewTask from './NewTask';
import { tokens } from '../../../../../theme';
import { hexToRgba } from '../../../../../helpers/colors';

const TasksContainer = ({ tasks, column }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Droppable
        droppableId={column?._id}
        type="card"
        key={column?._id}
      >
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              transition: 'background-color 0.2s ease',
              backgroundColor: snapshot.isDraggingOver ? hexToRgba(colors.blueAccent[400], .1) : 'inherit',
              flexGrow: 1,
              minHeight: '100px',
              gap: '15px'
            }}
          >
            {tasks?.map((task, index) => (
              <TaskCard
                key={task?._id}
                task={task}
                index={index}
              />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
      <NewTask tasks={tasks} column={column} />
    </>
  )
}

export default TasksContainer