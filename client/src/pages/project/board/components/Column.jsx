import React, { useRef, useState } from "react";
import { Form, Formik } from "formik";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Box, IconButton, Stack, TextField, Typography, useTheme } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import { useMutation } from "@apollo/client";
import TaskCard from "./TaskCard";
import { tokens } from "../../../../theme";
import CustomButton from "../../../../components/CustomButton";
import { hexToRgba } from "../../../../helpers/colors";
import { GET_PROJECTS } from "../../../../graphql/queries/projectQueries";
import { schema } from "../TaskValidation";
import Input from "../../../../components/form/Input";
import { CREATE_TASK } from "../../../../graphql/mutations/taskMutations";
import { GET_TASKS } from "../../../../graphql/queries/taskQueries";
import { GET_BOARDBYPROJECT } from "../../../../graphql/queries/boardQueries";
import { getAppendedItemPos } from "../../../../helpers/itemPosition";

const Column = ({
  index,
  column,
  tasks,
  setTaskDetailsModal,
  projectId
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [addTaskActivated, setAddTaskActivated] = useState(false);
  const taskTitleRef = useRef();
  const [createTask, { postLoading, postError }] = useMutation(CREATE_TASK, {
    update: (cache, { data }) => {
      // const { _id } = data.createTask?.project || {};

      const {boardByProject: { columns }} = cache.readQuery({
        query: GET_BOARDBYPROJECT,
        variables: {
          projectId
        },
      })

      const newColumns = columns.map(item => {
        if(item._id !== data.createTask?.column._id){
          return item;
        }

        return {
          ...item,
          tasks: [
            ...item.tasks,
            data.createTask
          ]
        }
      })

      // const { projects } = cache.readQuery({
      //   query: GET_PROJECTS
      // }) || {}

      cache.writeQuery({
        query: GET_BOARDBYPROJECT,
        variables: { projectId },
        data: {
          boardByProject: {
            columns: newColumns
          }
        }
      })

      // if(projects && _id){
      //   // const project = projects.find(item => item._id === _id);
      //   const updatedProjects = projects.reduce((acc, project) => {
      //     if(project._id === _id){
      //       const tasks = [
      //         ...project.tasks,
      //         {
      //           _id: data.createTask._id,
      //           status: data.createTask.status
      //         }
      //       ];

      //       return [
      //         ...acc,
      //         { ...project, tasks }
      //       ]
      //     }

      //     return [...acc, project]
      //   }, [])

      //   cache.writeQuery({
      //     query: GET_PROJECTS,
      //     data: {
      //       projects: updatedProjects
      //     }
      //   })
      // }
    }
	});

  const handleSubmit = (e) => {
    e.preventDefault();
    const {current: { value }} = taskTitleRef;

    if(value){
      createTask({ variables: {
        title: value,
        projectId,
        done: column.category === 'done' ? true : false,
        columnId: column._id,
        order: getAppendedItemPos(column.tasks),
      }});
    }
    // actions.resetForm();
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
            backgroundColor: hexToRgba(colors.blueAccent[800], .5),
            borderRadius: '5px',
            boxShadow: `0 0 4px ${colors.blueAccent[400]}`,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            flexShrink: 0,
            maxWidth: '290px',
            flexBasis: '96%'   
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            justifyContent='space-between'
            alignItems='center'
            padding='10px'
            borderBottom={`.5px solid ${colors.blueAccent[400]}`}
            mb='8px'
          >
            <Box
              {...provided.dragHandleProps}
              width='100%'
              display='flex'
              alignItems='center'
              gap='3px'
            >
              <Typography
                variant='h4'
              >
                {column.title}
              </Typography>
              {column.category === 'done' && (
                <DoneIcon
                  sx={{
                    color: colors.greenAccent[300]
                  }}
                />
              )}
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
          <Box
            // sx={{
            //   height: 'auto',
            //   maxHeight: '63vh',
            //   overflowY: 'auto',
            // }}
          >
            <Droppable
              droppableId={column._id}
              type="card"
              key={column._id}
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
                    backgroundColor: snapshot.isDraggingOver ? colors.blueAccent[700] : 'inherit',
                    flexGrow: 1,
                    minHeight: '100px',
                    gap: '15px'
                  }}
                >
                  {tasks.map((task, index) => (
                    <TaskCard 
                      key={task._id}
                      task={task}
                      index={index}
                      setTaskDetailsModal={setTaskDetailsModal}
                    />
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </Box>

          <Box padding='10px'>
            { addTaskActivated ? (
              <form onSubmit={handleSubmit}>
                <TextField 
                  label='Title'
                  name='title'
                  inputRef={taskTitleRef}
                  sx={{ marginBottom: '8px' }}
                  fullWidth
                />
                <Box>
                  <CustomButton 
                    text='Add task'
                    type='submit'
                    loading={postLoading}  
                  />
                  <IconButton
                    sx={{ marginLeft: '6px' }}
                    onClick={() => setAddTaskActivated(false)}
                  >
                    <ClearIcon />
                  </IconButton>
                </Box>
              </form>
            ) : (
              <CustomButton 
                text='Add task'
                variant='outlined'
                onClick={() => setAddTaskActivated(true)}
                fullWidth
              />
            )}
          </Box>
        </Box>
      )}
    </Draggable>
      
  );
};

export default Column;
