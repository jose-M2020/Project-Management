import { getNewItemPos } from "./itemPosition";
import { isTooClose, resetItemsOrder } from "./reorderer";

const columnReorderer = (
  columns,
  source,
  destination
) => {
  const newColumns = [...columns];
  const [draggedColumn] = newColumns.splice(source.index, 1);
  newColumns.splice(destination.index, 0, draggedColumn)
  
  const updatedColumn = {
    ...draggedColumn,
    order: getNewItemPos(newColumns, destination.index),
  };

  const updatedColumns = isTooClose(updatedColumn.order)
    ? resetItemsOrder(newColumns)
    : newColumns;

  return { updatedColumn, updatedColumns }
}

export default columnReorderer;