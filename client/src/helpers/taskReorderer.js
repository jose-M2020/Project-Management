import { getNewItemPos } from "./itemPosition";
import { isTooClose, resetItemsOrder } from "./reorderer";

const taskReorderer = (
  tasks,
  columns,
  destination,
  source,
  draggableId
) => {
  const targetColumnId = destination.droppableId;
  const sourceColumnId = source.droppableId;

  const destColumn = columns.find(column => column._id === targetColumnId)

  let targetTasks = tasks.filter(task => task.columnId === targetColumnId);
  let sourceTasks = tasks.filter(task => task.columnId === sourceColumnId);
  const restTasks = tasks.filter(task => (
    task.columnId !== targetColumnId && task.columnId !== sourceColumnId
  ));

  const draggedCard = tasks.find(task => task._id === draggableId);

  const isDraggingInSameColumn = targetColumnId === sourceColumnId;

  if (!isDraggingInSameColumn) {
    sourceTasks.splice(source.index, 1);
  } else {
    targetTasks.splice(source.index, 1);
  }

  targetTasks.splice(destination.index, 0, draggedCard);

  const updatedTask = {
    ...draggedCard,
    order: getNewItemPos(targetTasks, destination.index),
    columnId: targetColumnId,
    done: destColumn.category === 'done' ? true : false
  };

  targetTasks.splice(destination.index, 1, updatedTask);

  const processedTasks = isTooClose(updatedTask.order)
    ? resetItemsOrder(targetTasks)
    : targetTasks;

  if (isDraggingInSameColumn) {
    return { newTasks: [...restTasks, ...processedTasks], updatedTask };
  }

  return {
    newTasks: [...restTasks, ...sourceTasks, ...processedTasks],
    updatedTask,
  };
}

export default taskReorderer;