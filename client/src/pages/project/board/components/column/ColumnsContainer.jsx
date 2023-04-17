import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Box, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Column from "./Column";

const ColumnsContainer = ({
  columns,
  tasks
}) => {

  return (
    <Droppable
      droppableId="all-columns"
      direction="horizontal"
      type="column"
    >
      {provided => (
        <Box>
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            display='flex'
            gap={2}
          >
            {columns.map((column, index) => {
              const orderedTasks = tasks.filter(task => task.columnId === column._id)
                                .sort((a, b) => a.order - b.order);
              return (
                <Column
                  key={column._id}
                  index={index}
                  column={column}
                  tasks={orderedTasks}
                />
              )
            })}
            {provided.placeholder}
            {/* <Fab size="small" color="secondary" aria-label="add">
              <AddIcon />
            </Fab> */}
          </Box>
        </Box>
      )}
    </Droppable>
  );
};

export default ColumnsContainer;
