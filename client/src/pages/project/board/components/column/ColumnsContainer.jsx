import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Box, Fab, useTheme } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Column from "./Column";
import { tokens } from "../../../../../theme";

const padding = {
  xs: '20px',
  md: '40px'
}

const ColumnsContainer = ({
  columns,
  tasks
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    // <Box display='flex' minWidth='fit-content'>
      // <Box px={padding}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {provided => (
              <Box
                  width='100%'
                  maxHeight='100%'
                  height='100%'
                  overflow='auto'
                  position='relative'
              >
                <Box display='flex' minWidth='fit-content' >
                  <Box 
                    width={padding}
                    bgcolor={colors.primary[500]}
                    position='sticky'
                    left='0'
                    zIndex={200}
                  ></Box>
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
                    </Box>
                  </Box>
                  <Fab size="small" color="secondary" aria-label="add">
                    <AddIcon />
                  </Fab>
                  <Box 
                    width='28px'
                    bgcolor={colors.primary[500]}
                    position='sticky'
                    right='0'
                    zIndex={200}
                  ></Box>
                </Box>
              </Box>
          )}
        </Droppable>
    //   </Box>
    // </Box>
  );
};

export default ColumnsContainer;
