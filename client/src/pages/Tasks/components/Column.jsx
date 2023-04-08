import React, { useRef, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Box, Fab, IconButton, Stack, TextField, Typography, useTheme } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import TaskCard from "./TaskCard";
import { tokens } from "../../../theme";
import CustomButton from "../../../components/CustomButton";
import AutoComplete from "../../../components/form/AutoComplete";
import { hexToRgba } from "../../../helpers/helpers";
import useAsyncAutocomplete from "../../../hooks/useAsyncAutocomplete";
import { GET_PROJECTNAMES, GET_PROJECTS } from "../../../graphql/queries/projectQueries";
import { Form, Formik } from "formik";
import { schema } from "../TaskValidation";
import Input from "../../../components/form/Input";
import { useMutation } from "@apollo/client";
import { CREATE_TASK } from "../../../graphql/mutations/taskMutations";
import { GET_TASKS } from "../../../graphql/queries/taskQueries";

const Column = ({
  column,
  index,
  setTaskDetailsModal
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [addTaskActivated, setAddTaskActivated] = useState(false);  
  const {
    data: projectData,
    loading: loadingProjects,
    open,
    setOpen
  } = useAsyncAutocomplete(GET_PROJECTNAMES)

  const [createTask, { postLoading, postError }] = useMutation(CREATE_TASK, {
    update: (cache, { data }) => {
      const { _id } = data.createTask?.project || {};
      const { tasks } = cache.readQuery({
        query: GET_TASKS
      })
      const { projects } = cache.readQuery({
        query: GET_PROJECTS
      }) || {}

      cache.writeQuery({
        query: GET_TASKS,
        data: {
          tasks: [
            data.createTask,
            ...tasks
          ]
        }
      })

      if(projects && _id){
        // const project = projects.find(item => item._id === _id);
        const updatedProjects = projects.reduce((acc, project) => {
          if(project._id === _id){
            const tasks = [
              ...project.tasks,
              {
                _id: data.createTask._id,
                status: data.createTask.status
              }
            ];

            return [
              ...acc,
              { ...project, tasks }
            ]
          }

          return [...acc, project]
        }, [])

        cache.writeQuery({
          query: GET_PROJECTS,
          data: {
            projects: updatedProjects
          }
        })
      }
    }
	});

  const handleSubmit = (values, actions) => {
    createTask({ variables: values});
    actions.resetForm();
  }

  return (
    <Draggable
      draggableId={column._id}
      index={index}
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
            <Box {...provided.dragHandleProps} width='100%'>
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
              type="task"
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
                  {column.tasks.map((task, index) => (
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
              <Formik
                initialValues={{
                  title: '',
                  projectId: '',
                  priority: 'Low'
                }}
                validationSchema={schema}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form>
                    <Stack
                      spacing={2}
                      sx={{
                        backgroundColor: colors.blueAccent[800],
                        borderRadius: '5px',
                        padding: '10px',
                      }}
                    >
                      <Input 
                        label='Title'
                        name='title'
                      />
                      {/* <TextField 
                        label='Title'
                        name='title'
                        inputRef={taskTitleRef}
                        sx={{ marginBottom: '8px' }}
                        fullWidth
                      /> */}
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
                    </Stack>
                  </Form>
                )}
              </Formik>
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
