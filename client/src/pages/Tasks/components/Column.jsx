import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Box, Fab, IconButton, Stack, Typography, useTheme } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import TaskCard from "./TaskCard";
import { tokens } from "../../../theme";

const Column = ({column, index, setAddTaskModal}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        backgroundColor: colors.blueAccent[800],
        borderRadius: '5px',
        boxShadow: `0 0 4px ${colors.blueAccent[400]}`,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '300px',     
      }}
    >
      <Stack 
        direction="row"
        spacing={1}
        justifyContent='space-between'
        alignItems='center'
        padding='10px'
      >
        <Box>
          <Typography
            variant='h4'
          >
            {column.title} 
          </Typography>
          {/* <Typography 
            variant="span"
            ml={1}
            sx={{
              padding: '5px',
              backgroundColor: colors.blueAccent[500],
            }}
          >
            {column.items.length}
          </Typography> */}
        </Box>
        <Fab 
          onClick={
            () => setAddTaskModal(options => ({
              taskStatus: column.status,
              isOpen: true
            }))
          }
          aria-label="add" 
          sx={{
            minHeight: 0,
            width: '25px',
            height: '25px'
          }}
        >
          <AddIcon />
        </Fab>
      </Stack>
      <Box
        sx={{
          height: 'auto',
          maxHeight: '65vh',
          overflowY: 'auto',
        }}
      >
        <Droppable droppableId={column.id} type="task" key={column.id}>
          {(provided, snapshot) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                transition: 'background-color 0.2s ease',
                backgroundColor: snapshot.isDraggingOver ? colors.blueAccent[700] : 'inherit',
                flexGrow: 1,
                minHeight: '100px',
                gap: '15px'
              }}
            >
              {column.items.map((task, index) => (
                <TaskCard key={task._id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </Box>
    </Box>
  );
};

export default Column;
