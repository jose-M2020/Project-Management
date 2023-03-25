import { useEffect, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import CustomModal from '../../components/CustomModal'
import Header from '../../components/Header'
import Column from './components/Column'
import Input from '../../components/form/Input';
import AutoComplete from '../../components/form/AutoComplete';
import CustomButton from '../../components/CustomButton';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import TocIcon from '@mui/icons-material/Toc';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import useAsyncAutocomplete from '../../hooks/useAsyncAutocomplete';
import { GET_PROJECTNAMES, GET_PROJECTS } from '../../graphql/queries/projectQueries';
import { GET_TASKS } from '../../graphql/queries/taskQueries';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TASK, UPDATE_TASK } from '../../graphql/mutations/taskMutations';

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  status: yup.string().required(),
  projectId: yup.string().required(),
});

const columnData = {
  'column-1': {
    id: 'column-1',
    title: 'To do',
    status: 'Not Started',
    items: []
  },
  'column-2': {
    id: 'column-2',
    title: 'In progress',
    status: 'In Progress',
    items: [],
  },
  'column-3': {
    id: 'column-3',
    title: 'Completed',
    status: 'Completed',
    items: [],
  }
}

const FormItem = ({icon, input}) => (
  <Box display='flex' >
    <Typography variant='span' mr='8px'>
      {icon}
    </Typography>
    <Box flexGrow={1} >
      {input}
    </Box>
  </Box>
);

const Tasks = () => {
  const [addTaskModal, setAddTaskModal] = useState({
    isOpen: false,
    taskStatus: ''
  });
  const [taskDetailsModal, setTaskDetailsModal] = useState({
    isOpen: false,
    data: {}
  });
  const [columns, setColumns] = useState(columnData);
  const [date, setDate] = useState();
  const { loading: loadingTasks, data: tasks } = useQuery(GET_TASKS);
  const {
    data: projectData,
    loading: loadingProjects,
    open,
    setOpen
  } = useAsyncAutocomplete(GET_PROJECTNAMES)
  
  const [createTask, { postLoading, postError }] = useMutation(CREATE_TASK, {
    update: (cache, { data }) => {
      const { _id } = data.createTask.project;
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

      if(projects){
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
  
  const [updateTask, { updateLoading, updateError }] = useMutation(UPDATE_TASK, {
    update: (cache, { data }) => {
      // const projectId = data.updateTask.project._id;
      const { tasks } = cache.readQuery({
        query: GET_TASKS
      })

      const updatedTasks = tasks.reduce((acc, task) => {
        if(data.updateTask._id === task._id){
          return [
            ...acc,
            {
              ...task,
              status: data.updateTask.status
            }
          ]
        }

        return [...acc, task]
      }, [])

      cache.writeQuery({
        query: GET_TASKS,
        data: {
          tasks: updatedTasks,
        }
      })

      // cache.modify({
      //   fields: {
      //     getProjects: (existingProjects, { readField }) => {
      //       console.log(existingProjects);
      //       if (data) {
      //         return existingProjects.filter(
      //           (projectRef) => projectId !== readField('_id', projectRef)
      //         );
      //       }
      //     }
      //   },
      // });
    },
	});

  useEffect(() => {
    if(!loadingTasks){
      const orderedTasks = tasks.tasks.reduce((acc, item) => {
        acc[item.status]?.push(item);
        return acc;
      }, {
        'Not Started': [],
        'In Progress': [],
        'Completed': [],
      })
        
      const columData = {
        'column-1': {
          ...columns['column-1'],
          items: orderedTasks['Not Started']
        },
        'column-2': {
          ...columns['column-2'],
          items: orderedTasks['In Progress']
        },
        'column-3': {
          ...columns['column-3'],
          items: orderedTasks['Completed']
        },
      }
    
      setColumns(columData)
    }
  }, [tasks])
  
  const onDragStart = (start, provided) => {
    provided.announce(
      `You have lifted the task in position ${start.source.index + 1}`,
    );
  };

  const onDragUpdate = (update, provided) => {
    const message = update.destination
      ? `You have moved the task to position ${update.destination.index + 1}`
      : `You are currently not over a droppable area`;

    provided.announce(message);
  };

  const handleDragEnd = (result, provided) => {
    const {
      destination,
      source,
      draggableId,
    } = result;

    const message = result.destination
      ? `You have moved the task from position
        ${result.source.index + 1} to ${result.destination.index + 1}`
      : `The task has been returned to its starting position of
        ${result.source.index + 1}`;

    provided.announce(message);

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    
    if (sourceColumn === destColumn) {
      const newItems = [...sourceColumn.items];
      const [removed] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, removed);

      const newHome = {
        ...sourceColumn,
        items: newItems,
      };

      const newState = {
        ...columns,
        [newHome.id]: newHome,
      };
      setColumns(newState);
      return;
    }

    // moving from one list to another
    const sourceColumnItems = [...sourceColumn.items];
    const [removed] = sourceColumnItems.splice(source.index, 1);
    const newHome = {
      ...sourceColumn,
      items: sourceColumnItems,
    };

    const destColumnItems = [...destColumn.items];
    destColumnItems.splice(destination.index, 0, removed);
    const newForeign = {
      ...destColumn,
      items: destColumnItems,
    };

    const newState = {
      ...columns,
      [newHome.id]: newHome,
      [newForeign.id]: newForeign,
    };
    setColumns(newState);

    updateTask({variables: {
      _id: draggableId,
      status: columnData[destination.droppableId].status
    }});
  };

  const handleSubmit = (values, actions) => {
    createTask({ variables: {
      ...values,
      date
    }});
    actions.resetForm();

    setAddTaskModal(options => ({
      ...options,
      isOpen: false
    }))
  }

  return (
    <Box mx="20px" mt="20px">
      <Header title="TASKS" subtitle="All project tasks" />
      {loadingTasks ? (
        <h5>Loading Tasks...</h5>
      ) : (
        <Box sx={{ overflow: 'hidden' }}>
          <DragDropContext
            onDragStart={onDragStart}
            onDragUpdate={onDragUpdate}
            onDragEnd={handleDragEnd}
          >
            <Droppable
              droppableId="all-columns"
              direction="horizontal"
              type="column"
            >
              {provided => (
                <Box
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  display='flex'
                  gap={2}
                  sx={{
                    overflowX: 'auto',
                    paddingBottom: '15px'
                  }}
                >
                  {Object.entries(columns).map(([columnId, column], index) => (
                    <Column
                      key={columnId}
                      column={column}
                      index={index}
                      setAddTaskModal={setAddTaskModal}
                      setTaskDetailsModal={setTaskDetailsModal}
                    />
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      )}
      <CustomModal
        title='Add new task'
        open={addTaskModal.isOpen}
        handleClose={
          () => setAddTaskModal(options => ({
            ...options,
            isOpen: false
          }))
        }
      >
        <Formik
          initialValues={{
            title: '',
            description: '',
            status: addTaskModal.taskStatus,
            projectId: '',
            date: '',
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <Stack spacing={2}
              >
                <Input label="Title*" name="title" />
                <Input label="Description" name="description" multiline rows={4} />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      sx={{ width: '100%'}}
                      label="Due date"
                      onChange={(newDate) => setDate(newDate)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <AutoComplete
                  label="Project" 
                  name="projectId" 
                  options={projectData?.projects}
                  valueField='_id'
                  setLabel={option => option?.name}
                  async={true}
                  open={open}
                  setOpen={setOpen}
                  loading={loadingProjects}
                />
                <CustomButton 
                  text='Create task' 
                  type="submit"
                  btnstyle="primary"
                  loading={postLoading}
                />
              </Stack>
            </Form>
          )}
        </Formik>
      </CustomModal>
      <CustomModal
        title='Task details'
        open={taskDetailsModal.isOpen}
        handleClose={
          () => setTaskDetailsModal({
            isOpen: false,
            data: {}
          })
        }
      >
        <Formik
          initialValues={{
            title: '',
            description: '',
            status: addTaskModal.taskStatus,
            projectId: '',
            date: '',
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <Stack component="div" spacing={3}
              >
                <FormItem
                  icon={<SubtitlesIcon />}
                  input={
                    <Input
                      label='Title'
                      name="title"
                      variant="standard"
                      value={taskDetailsModal.data.title} />
                  }
                />
                <FormItem
                  icon={<TocIcon />}
                  input={
                    <Input
                      label='Description'
                      name="description"
                      variant="standard"
                      value={taskDetailsModal.data.description} />
                  }
                />
                <FormItem
                  icon={<PeopleAltIcon />}
                  input={
                    <Input
                      label='Description'
                      name="description"
                      variant="standard"
                      value={taskDetailsModal.data.description} />
                  }
                />

                {/* <CustomButton 
                  text='Create task' 
                  type="submit"
                  btnstyle="primary"
                  loading={postLoading}
                /> */}
              </Stack>
            </Form>
          )}
        </Formik>
      </CustomModal>
    </Box>
  )
}

export default Tasks