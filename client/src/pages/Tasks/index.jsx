import { Box, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import CustomModal from '../../components/CustomModal'
import Header from '../../components/Header'
import Column from './components/Column'
import Input from '../../components/form/Input';
import AutoComplete from '../../components/form/AutoComplete';
import CustomButton from '../../components/CustomButton';
import useAsyncAutocomplete from '../../hooks/useAsyncAutocomplete';
import { GET_PROJECT, GET_PROJECTNAMES, GET_PROJECTS } from '../../graphql/queries/projectQueries';
import { GET_TASKS } from '../../graphql/queries/taskQueries';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TASK, UPDATE_TASK } from '../../graphql/mutations/taskMutations';

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  status: yup.string().required(),
  projectId: yup.string().required(),
  date: yup.date()
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

const taskData = [
  { 
    id: 'task-1',
    title: 'Take out the garbage',
    description: 'This is a description of the task. Lorem ipsum dolor sit amet, consectetur. lorem ipsum dolor sit am',
    status: 'Not Started',
  },
  { 
    id: 'task-2',
    title: 'Watch my favorite show',
    description: 'This is a description of the task. Lorem ipsum dolor sit amet, consectetur',
    status: 'Not Started',
  },
  { 
    id: 'task-3',
    title: 'Charge my phone',
    description: 'This is a description of the task. Lorem ipsum dolor sit amet, consectetur',
    status: 'Not Started',
  },
  { 
    id: 'task-4',
    title: 'Cook dinner',
    description: 'This is a description of the task. Lorem ipsum dolor sit amet, consectetur',
    status: 'In Progress',
  },
  {
    id: 'task-5',
    title: 'Cook dinner',
    description: 'This is a description of the task. Lorem ipsum dolor sit amet, consectetur',
    status: 'In Progress',
  },
  { 
    id: 'task-6',
    title: 'Cook dinner',
    description: 'This is a description of the task. Lorem ipsum dolor sit amet, consectetur',
    status: 'Completed',
  },
  { 
    id: 'task-7',
    title: 'Cook dinner',
    description: 'This is a description of the task. Lorem ipsum dolor sit amet, consectetur',
    status: 'Completed',
  }
]

const Tasks = () => {
  const [addTaskModal, setAddTaskModal] = useState({
    isOpen: false,
    taskStatus: ''
  });
  const [columns, setColumns] = useState(columnData);
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
        const project = projects.find(item => item._id === _id);
        console.log(project)

        // const tasks = [...project.tasks];
        // const taskIndex = tasks.findIndex(item => item._id === data.createTask._id)

        // tasks.splice(taskIndex, 0, {
        //   _id: data.createTask._id,
        //   status: data.createTask.status
        // });

        // console.log('new tasks:', tasks)
        
        const updatedProjects = projects.reduce((acc, project) => {
          if(project._id === _id){
            const tasks = [
              ...project.tasks,
              {
                _id: data.createTask._id,
                status: data.createTask.status
              }
            ];
            // const taskIndex = project.tasks.findIndex(item => item._id === data.createTask._id)
            // tasks.splice(taskIndex, 0, {
            //   _id: data.createTask._id,
            //   status: data.createTask.status
            // });

            return [
              ...acc,
              {
                ...project,
                tasks
              }
            ]
          }

          return [...acc, project]
        }, [])

        console.log('updatedProjects: ', updatedProjects)
        // const newProjects = [...projects];
        // newProjects.splice(taskIndex, 0, {
        //   _id: data.createTask._id,
        //   status: data.createTask.status
        // });



        // const updatedProject = {
        //   ...project,
        //   tasks : [
        //     ...tasks,
        //     {
        //       _id: data.createTask._id,
        //       status: data.createTask.status
        //     }
        //   ]
        // }

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
    refetchQueries: [
      {
				// query: GET_PROJECT,
			},
			// "getTasks",
		],
    update: (cache, { data }) => {
      const projectId = data.updateTask.project._id;
      cache.modify({
        fields: {
          getProjects: (existingProjects, { readField }) => {
            console.log(existingProjects);
            if (data) {
              return existingProjects.filter(
                (projectRef) => projectId !== readField('_id', projectRef)
              );
            }
          },
          getTasks: (existingTasks, { readField }) => {
            if (data) {
              // return existingTasks.filter(
              //   (projectRef) => projectId !== readField('_id', projectRef)
              // );

              return existingTasks.reduce((acc, task) => {
                if(data.updateTask._id === readField('_id', task)){
                  return [
                    ...acc,
                    {
                      ...task,
                      status: data.updateTask.status
                    }
                  ]
                }

                return [...acc, task]
              })
            }
          },
        },
      });
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
    createTask({ variables: values});
    actions.resetForm();
  }

  return (
    <Box m="20px">
      <Header title="TASKS" subtitle="All project tasks" />
      {loadingTasks ? (
        <h5>Loading Tasks...</h5>
      ) : (
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
              >
                {Object.entries(columns).map(([columnId, column], index) => (
                  <Column
                    key={columnId}
                    column={column}
                    index={index}
                    setAddTaskModal={setAddTaskModal}
                  />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
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
                <Input label="Date" name="date" type='date' />
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
    </Box>
  )
}

export default Tasks