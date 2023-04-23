import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Box, Fab, useTheme } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Column from "./Column";
import { tokens } from "../../../../../theme";
import { hexToRgba } from "../../../../../helpers/colors";
import EditableText from "../../../../../components/EditableText";
import { CREATE_COLUMN } from "../../../../../graphql/mutations/columnMutations";
import { useMutation } from "@apollo/client";
import { GET_BOARDBYPROJECT } from "../../../../../graphql/queries/boardQueries";
import { useBoard } from "../../context/BoardContext";

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
  const [newColumn, setNewColumn] = useState(false)
  const { projectId } = useBoard();

  const [createColumn, { loading, error }] = useMutation(CREATE_COLUMN, {
    refetchQueries: [{ 
      query: GET_BOARDBYPROJECT, variables: { projectId } 
    }],  
  });

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
                      {newColumn && (
                        <Box
                          sx={{
                            backgroundColor: hexToRgba(colors.primary[400], .7),
                            borderRadius: '5px',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '220px',
                            flexShrink: 0,
                            minWidth: '290px',
                            maxWidth: '290px',
                          }}
                        >
                          <Box
                            padding='10px'
                            borderBottom={`.5px solid ${colors.blueAccent[400]}`}
                            mb='8px'
                            sx={{
                              backdropFilter: 'blur(20px)',
                            }}
                            zIndex={100}
                          >
                            <EditableText
                              onAccept={() => console.log('accept')}
                              onCancel={() => setNewColumn(false)}
                              mode="input"
                              padding="12px 5px"
                            />
                          </Box>
                        </Box>
                      )}
                      {provided.placeholder}
                    </Box>
                  </Box>
                  {!newColumn && (
                    <Fab 
                      onClick={() => setNewColumn(true)}
                      size="small"
                      color="secondary"
                      aria-label="add"
                      sx={{ marginLeft: 2 }}
                    >
                      <AddIcon />
                    </Fab>
                  )}
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
