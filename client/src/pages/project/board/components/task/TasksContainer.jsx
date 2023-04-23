import React, { useRef, useState } from 'react'
import { Box, IconButton, TextField, useTheme } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useMutation } from '@apollo/client';
import { CREATE_TASK } from '../../../../../graphql/mutations/taskMutations';
import { GET_BOARDBYPROJECT } from '../../../../../graphql/queries/boardQueries';
import { getAppendedItemPos } from '../../../../../helpers/itemPosition';
import CustomButton from '../../../../../components/CustomButton';
import TaskCard from './TaskCard';
import { Droppable } from 'react-beautiful-dnd';
import { tokens } from '../../../../../theme';
import { hexToRgba } from '../../../../../helpers/colors';
import { useBoard } from '../../context/BoardContext';

const TasksContainer = ({ tasks, column }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); 

  const [addTaskActivated, setAddTaskActivated] = useState(false);
  const taskTitleRef = useRef();
  const { projectId, boardId } = useBoard();

  const [createTask, { postLoading, postError }] = useMutation(CREATE_TASK, {
    update: (cache, { data }) => {
      // const { _id } = data.createTask?.project || {};

      const {boardByProject: { tasks }} = cache.readQuery({
        query: GET_BOARDBYPROJECT,
        variables: {
          projectId
        },
      })

      const newTasks = [...tasks, data.createTask]

      // const { projects } = cache.readQuery({
      //   query: GET_PROJECTS
      // }) || {}

      cache.writeQuery({
        query: GET_BOARDBYPROJECT,
        variables: { projectId },
        data: {
          boardByProject: {
            tasks: newTasks
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
        boardId: boardId,
        columnId: column._id,
        done: column.category === 'done' ? true : false,
        order: getAppendedItemPos(tasks),
      }});
    }

    e.target.reset();
  }

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
      <Box padding='10px'>
        {addTaskActivated ? (
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
    </>
  )
}

export default TasksContainer