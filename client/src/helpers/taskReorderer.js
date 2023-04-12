import { getNewItemPos } from "./itemPosition";

const taskReorderer = (columns, destination, source) => {
  // Handling positioning of column cards
  const newColumns = [...columns];

  const sourceColumnIndex = columns.findIndex(
    column => column._id === source.droppableId
  )
  const destColumnIndex = columns.findIndex(
    column => column._id === destination.droppableId
  )

  const sourceColumn = columns[sourceColumnIndex];
  const destColumn = columns[destColumnIndex];
  const destColumnItems = [...destColumn.tasks];
  const isDraggingInSameColumn = source.droppableId === destination.droppableId
  
  const columnItems = [...sourceColumn.tasks];
  const [removed] = columnItems.splice(source.index, 1);
  console.log({removed, columnItems})
  const newSourceColumn = {
    ...sourceColumn,
    tasks: columnItems,
  };
  newColumns.splice(sourceColumnIndex, 1, newSourceColumn);

  console.log({source, destination})
  // if(!isDraggingInSameColumn) {
  //   const newSource = {
  //     ...sourceColumn,
  //     tasks: columnItems,
  //   };
  //   newColumns.splice(sourceColumnIndex, 1, newSource);
  //   console.log('newSource: ', newSource);
  // }
  // destColumnItems.splice(destination.index, 0, removed);
  console.log('destColumnItems: ', destColumnItems);
  
  // Update the task
  const updatedTask = {
    ...removed,
    columnId: destination.droppableId,
    order: getNewItemPos(destColumnItems, destination.index)
  }
  // destColumnItems.splice(destination.index, 1, updatedTask);
  
  // Update columns
  // const newColumn = {
  //   ...destColumn,
  //   tasks: destColumnItems,
  // };
  // newColumns.splice(destColumnIndex, 1, newColumn);
  console.log('newColumns: ', newColumns)

  if (isDraggingInSameColumn) {
    // columnItems.splice(destination.index, 0, removed);

    // const newColumn = {
    //   ...destColumn,
    //   tasks: destColumnItems,
    // };

    // newColumns.splice(sourceColumnIndex, 1, newColumn);
  } else {
    // moving from one list to another
    // const newSource = {
    //   ...sourceColumn,
    //   tasks: columnItems,
    // };
    // TODO: removed throw error when getting new position, because the destcolunsItems is not updated
    // destColumnItems.splice(destination.index, 0, removed);
    
    // const newForeign = {
    //   ...destColumn,
    //   tasks: destColumnItems,
    // };

    // newColumns.splice(sourceColumnIndex, 1, newSource);
    // newColumns.splice(destColumnIndex, 1, newForeign);
  }

  

  return {
    updatedTask,
    newColumns
  }
}

export default taskReorderer;