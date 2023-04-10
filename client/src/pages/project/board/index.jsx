import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useMutation, useQuery } from '@apollo/client';
import Header from '../../../components/Header'
import { GET_PROJECTS } from '../../../graphql/queries/projectQueries';
import { GET_BOARDBYPROJECT } from '../../../graphql/queries/boardQueries'
import { UPDATE_COLUMN, UPDATE_COLUMNPOSITION } from '../../../graphql/mutations/columnMutations'
import { GET_TASKS } from '../../../graphql/queries/taskQueries';
import { CREATE_TASK, UPDATE_TASK, UPDATE_TASKPOSITION } from '../../../graphql/mutations/taskMutations';
import Column from './components/Column'
import TaskModal from './components/TaskModal';

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

const sortData = (items) => {
  let sortedItems = items.sort((a, b) => a.order - b.order);
  return sortedItems;
};

const Board = () => {
  const { id: projectId } = useParams();
  const [taskDetailsModal, setTaskDetailsModal] = useState({
    isOpen: false,
    data: {}
  });
  const [columns, setColumns] = useState([]);
  const { loading: loadingBoard, data: board } = useQuery(
    GET_BOARDBYPROJECT,
    { variables: { projectId } }
  );
  const [
    updateTask,
    { loadingTaskUpdate, taskUpdateError }
  ] = useMutation(UPDATE_TASK, {
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
  const [
    updateTaskPosition,
    { loadingTaskPositionUpdate, taskUpdatePositionError }
  ] = useMutation(UPDATE_TASKPOSITION, {
    update: (cache, { data }) => {
      
    },
	});
  const [
    updateColumnPosition,
    { loadingColumnUpdate, columnUpdateError }
  ] = useMutation(UPDATE_COLUMNPOSITION, {
    update: (cache, { data }) => {
      // TODO: Find out if there's a better way to update board cache
      cache.writeQuery({
        query: GET_BOARDBYPROJECT,
        variables: { projectId },
        data: {
          boardByProject: {
            ...board?.boardByProject,
            columns
          }
        }
      })
    },
	});

  useEffect(() => {
    if(!loadingBoard && !columns.length){
      console.log('ordering: ', columns)
      const sortedColums = sortData([...board?.boardByProject?.columns]);
      setColumns(sortedColums)
    }
  }, [board])

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
      type
    } = result;
    
    const message = result.destination
      ? `You have moved the ${type} from position
        ${source.index} to ${destination.index}`
      : `The ${type} has been returned to its starting position of
        ${source.index}`;
    provided.announce(message);

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    
    const newColumns = [...columns];

    if (type === 'column') {
      const [sourceRemoved] = newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, sourceRemoved)
      setColumns(newColumns);

      updateColumnPosition({ variables: {
        sourceColumnPosition: destination.index,
        destinationColumnPosition: source.index,
        sourceColumnId: draggableId,
        destinationColumnId: columns[destination.index]._id
      }})

      return;
    }

    // Handling positioning of column cards

    const sourceColumnIndex = columns.findIndex(
      column => column._id === source.droppableId
    )
    const destColumnIndex = columns.findIndex(
      column => column._id === destination.droppableId
    )
    const sourceColumn = columns[sourceColumnIndex]
    const destColumn = columns[destColumnIndex]
    
    if (source.droppableId === destination.droppableId) {
      const newItems = [...sourceColumn.tasks];
      const [removed] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, removed);

      const newColumn = {
        ...sourceColumn,
        tasks: newItems,
      };      
      newColumns.splice(sourceColumnIndex, 1, newColumn);

      setColumns(newColumns);
      return;
    }

    // moving from one list to another
    const sourceColumnItems = [...sourceColumn.tasks];
    const [removed] = sourceColumnItems.splice(source.index, 1);
    const newSource = {
      ...sourceColumn,
      tasks: sourceColumnItems,
    };

    const destColumnItems = [...destColumn.tasks];
    destColumnItems.splice(destination.index, 0, removed);
    const newForeign = {
      ...destColumn,
      tasks: destColumnItems,
    };

    newColumns.splice(sourceColumnIndex, 1, newSource);
    newColumns.splice(destColumnIndex, 1, newForeign);

    setColumns(newColumns);

    updateTaskPosition({variables: {
      _id: draggableId,
      newPosition: destination.index,
      sourceColumnId: source.droppableId,
      destinationColumnId: destination.droppableId
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
                    {columns.map((column, index) => (
                      <Column
                        key={column._id}
                        column={column}
                        index={index}
                        setTaskDetailsModal={setTaskDetailsModal}
                        projectId={projectId}
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

export default Board