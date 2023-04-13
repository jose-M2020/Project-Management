import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useMutation } from '@apollo/client';
import Header from '../../../../components/Header'
import { GET_BOARDBYPROJECT } from '../../../../graphql/queries/boardQueries'
import { UPDATE_COLUMNPOSITION } from '../../../../graphql/mutations/columnMutations'
import { UPDATE_TASKPOSITION } from '../../../../graphql/mutations/taskMutations';
import Column from './Column'
import taskReorderer from '../../../../helpers/taskReorderer';

const sortData = (items) => {
  let sortedItems = items.sort((a, b) => a.order - b.order);
  return sortedItems;
};

const BoardContainer = ({board, projectId}) => {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  console.log('rendering boardContainer')
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
            ...board,
            columns
          }
        }
      })
    },
	});

  useEffect(() => {
    if(!columns.length){
      const sortedColums = sortData([...board?.columns]);
      setColumns(sortedColums)
    }

    setTasks(board.tasks);
  }, [board])
  
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
    
    if (type === 'column') {
      const newColumns = [...columns];
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

    const {updatedTask, newTasks} = taskReorderer(
      tasks,
      destination,
      source,
      draggableId
    );

    console.log({updatedTask})
    
    setTasks(newTasks);
    updateTaskPosition({variables: {
      _id: draggableId,
      columnId: updatedTask.columnId,
      newPosition: updatedTask.order
    }});
  };
  
  return (
    <Box mx="20px" mt="20px">
      <Header title="BOARD" subtitle="All project tasks" />
      {board && (
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
                  {columns.map((column, index) => {
                    const orderedTasks = tasks.filter(task => task.columnId === column._id)
                                       .sort((a, b) => a.order - b.order);
                    return (
                      <Column
                        key={column._id}
                        column={column}
                        tasks={orderedTasks}
                        index={index}
                        projectId={projectId}
                        boardId={board._id}
                      />
                    )
                  })}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      )}
    </Box>
  )
}

export default BoardContainer