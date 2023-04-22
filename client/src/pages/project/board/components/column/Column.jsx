import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import MoreIcon from '@mui/icons-material/MoreVert';
import { tokens } from "../../../../../theme";
import { hexToRgba } from "../../../../../helpers/colors";

import TasksContainer from "../task/TasksContainer";
import EditableText from "../../../../../components/EditableText";
import Dropdown from "../../../../../components/Dropdown";
import { UPDATE_COLUMN } from "../../../../../graphql/mutations/columnMutations";
import { useMutation } from "@apollo/client";
import { GET_BOARDBYPROJECT } from "../../../../../graphql/queries/boardQueries";
import { useBoard } from "../../context/BoardContext";

const Column = ({
  index,
  column,
  tasks,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { projectId  } = useBoard();

  const [ updateColumn ] = useMutation(UPDATE_COLUMN, {
    refetchQueries: [{ 
      query: GET_BOARDBYPROJECT, variables: { projectId } 
    }]
  });
  
  const handleUpdate = async (value) => {
    await updateColumn({variables: {
      id: column._id,
      title: value
    }})

    return true;
  }

  return (
    <Draggable
      index={index}
      draggableId={column._id}
      category={column.category}
    >
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          sx={{
            backgroundColor: hexToRgba(colors.primary[400], .7),
            // backdropFilter: 'blur(20px)',
            borderRadius: '5px',
            // boxShadow: `0 0 4px ${colors.blueAccent[400]}`,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            flexShrink: 0,
            minWidth: '290px',
            maxWidth: '290px',
            // flexBasis: '96%'
          }}
        >
          <Stack
            padding='10px'
            spacing={1}
            direction="row"
            justifyContent='space-between'
            alignItems='center'
            borderBottom={`.5px solid ${colors.blueAccent[400]}`}
            mb='8px'
            position='sticky'
            top='0'
            sx={{
              backdropFilter: 'blur(20px)',
            }}
            zIndex={100}
          >
            <Box
              {...provided.dragHandleProps}
              width='100%'
              display='flex'
              alignItems='center'
              gap='3px'
            >
              <EditableText
                text={column.title}
                onAccept={handleUpdate}
                textComplement={column.category === 'done' && (
                  <DoneIcon
                    sx={{
                      color: colors.greenAccent[300]
                    }}
                  />
                )}
                padding="12px 5px"
              />
              <Dropdown
                button={
                  <IconButton>
                    <MoreIcon />
                  </IconButton>
                }
                options={[
                  {
                    title: 'Delete',
                    onClick: () => console.log('click')
                  }
                ]}
              />
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
          </Stack>
          <TasksContainer tasks={tasks} column={column} />
        </Box>
      )}
    </Draggable>
      
  );
};

export default Column;
