import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Box, IconButton, Stack, useTheme } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import MoreIcon from '@mui/icons-material/MoreVert';
import { tokens } from "../../../../../theme";
import { hexToRgba } from "../../../../../helpers/colors";

import TasksContainer from "../task/TasksContainer";
import EditableText from "../../../../../components/EditableText";
import Dropdown from "../../../../../components/Dropdown";
import { DELETE_COLUMN, UPDATE_COLUMN } from "../../../../../graphql/mutations/columnMutations";
import { useMutation } from "@apollo/client";
import { GET_BOARDBYPROJECT } from "../../../../../graphql/queries/boardQueries";
import { useBoard } from "../../context/BoardContext";
import { useDeleteModal } from "../../context/DeleteModalContext";

const Column = ({
  index,
  column,
  tasks,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { projectId  } = useBoard();
  const { openDeleteModal  } = useDeleteModal();
  
  const [ updateColumn ] = useMutation(UPDATE_COLUMN, {
    refetchQueries: [{ 
      query: GET_BOARDBYPROJECT, variables: { projectId } 
    }]
  });
  const [ deleteColumn ] = useMutation(DELETE_COLUMN, {
    update: (cache, { data }) => {
      const { boardByProject } = cache.readQuery({
        query: GET_BOARDBYPROJECT,
        variables: {
          projectId
        },
      })
      const filteredColumns = boardByProject.columns.filter(item => (
        item._id !== data.deleteColumn._id
      ))

      cache.writeQuery({
        query: GET_BOARDBYPROJECT,
        variables: { projectId },
        data: {
          boardByProject: {
            ...boardByProject,
            columns: filteredColumns
          }
        }
      })
    }
  });
  
  const handleUpdate = async (value) => {
    await updateColumn({variables: {
      id: column?._id,
      title: value
    }})

    return true;
  }

  const handleDelete = () => {
    openDeleteModal({
      item: column.title,
      onAccept: () => (
        deleteColumn({
          variables: { id: column._id },
        })
      )
    })
  }

  return (
    <Draggable
      index={index}
      draggableId={column?._id}
      category={column?.category}
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
                text={column?.title}
                onAccept={handleUpdate}
                textComplement={column?.category === 'done' && (
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
                    onClick: handleDelete
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
                {column?.items.length}
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
