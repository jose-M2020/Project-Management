import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Box, useTheme } from "@mui/material";
import TaskCard from "./TaskCard";
import { tokens } from "../../../theme";

const Column = ({column, tasks, index}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Draggable 
      draggableId={column.id}
      index={index}
    >
      {provided => (
        <Box 
          {...provided.draggableProps}
          ref={provided.innerRef}
          sx={{
            margin: '8px',
            boxShadow: `0 0 6px ${colors.blueAccent[400]}`,
            backgroundColor: colors.blueAccent[800],
            borderRadius: '2px',
            minWidth: '400px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box 
            {...provided.dragHandleProps}
            sx={{ padding: '8px' }}
          >
            {column.title}
          </Box>
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{
                  padding: '8px',
                  transition: 'background-color 0.2s ease',
                  backgroundColor: snapshot.isDraggingOver ? colors.blueAccent[700] : 'inherit',
                  flexGrow: 1,
                  minHeight: '100px',
                }}
              >
                {tasks.map((task, index) => (
                  <TaskCard key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Box>
      )}
    </Draggable>
  );
};

export default Column;
