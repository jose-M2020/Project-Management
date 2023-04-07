import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Header from '../../components/Header'
import Column from './components/Column'
import { GET_PROJECTS } from '../../graphql/queries/projectQueries';
import { GET_TASKS } from '../../graphql/queries/taskQueries';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TASK, UPDATE_TASK } from '../../graphql/mutations/taskMutations';
import TaskModal from './components/TaskModal';
import { useParams } from 'react-router-dom'
import { GET_BOARDBYPROJECT } from '../../graphql/queries/boardQueries'

const columnData = {
  'column-1': {
    id: 'column-1',
    title: 'To Do',
    status: 'Not Started',
    items: []
  },
  'column-2': {
    id: 'column-2',
    title: 'In Progress',
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

const Tasks = () => {
  const { id: projectId } = useParams();
  const [taskDetailsModal, setTaskDetailsModal] = useState({
    isOpen: false,
    data: {}
  });
  const [columns, setColumns] = useState(columnData);
  const [date, setDate] = useState();
  const { loading: loadingTasks, data: tasks } = useQuery(GET_TASKS);
  const { loading: loadingBoard, data: board } = useQuery(
    GET_BOARDBYPROJECT,
    { variables: { projectId } }
  );
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

  // useEffect(() => {
  //   if(!loadingTasks){
  //     const orderedTasks = tasks.tasks.reduce((acc, item) => {
  //       acc[item.status]?.push(item);
  //       return acc;
  //     }, {
  //       'Not Started': [],
  //       'In Progress': [],
  //       'Completed': [],
  //     })
        
  //     const columData = {
  //       'column-1': {
  //         ...columns['column-1'],
  //         items: orderedTasks['Not Started']
  //       },
  //       'column-2': {
  //         ...columns['column-2'],
  //         items: orderedTasks['In Progress']
  //       },
  //       'column-3': {
  //         ...columns['column-3'],
  //         items: orderedTasks['Completed']
  //       },
  //     }
    
  //     setColumns(columData)
  //   }
  // }, [tasks])
  
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

  return (
    <Box mx="20px" mt="20px">
      <Header title="BOARD" subtitle="All project tasks" />
      {loadingBoard ? (
        <h5>Loading Board...</h5>
      ) : (
        !board.boardByProject ? (
          <Box>
            <Typography>No board</Typography>
          </Box>
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
                        setTaskDetailsModal={setTaskDetailsModal}
                      />
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
        )
      )}
      <TaskModal taskDetailsModal={taskDetailsModal} setTaskDetailsModal={setTaskDetailsModal}/>
    </Box>
  )
}

export default Tasks