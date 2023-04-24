import { useRef, useState } from 'react'
import { Box, IconButton, TextField } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import { useMutation } from '@apollo/client';

import CustomButton from '../../../../../components/CustomButton'
import { CREATE_TASK } from '../../../../../graphql/mutations/taskMutations';
import { GET_BOARDBYPROJECT } from '../../../../../graphql/queries/boardQueries';
import { useBoard } from '../../context/BoardContext';
import { getAppendedItemPos } from '../../../../../helpers/itemPosition';

const NewTask = ({ tasks, column }) => {
  const [addTaskActivated, setAddTaskActivated] = useState(false);
  const taskTitleRef = useRef();
  const { projectId, boardId } = useBoard();

  const [createTask, { postLoading, postError }] = useMutation(CREATE_TASK, {
    update: (cache, { data }) => {
      const { boardByProject } = cache.readQuery({
        query: GET_BOARDBYPROJECT,
        variables: {
          projectId
        },
      })
      const newTasks = [
        ...boardByProject?.tasks,
        {...data.createTask, members: []}
      ];

      cache.writeQuery({
        query: GET_BOARDBYPROJECT,
        variables: { projectId },
        data: {
          boardByProject: {
            ...boardByProject,
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
  )
}

export default NewTask