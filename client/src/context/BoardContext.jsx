import { createContext, useContext, useState } from "react";
import TaskModal from "../pages/project/board/components/task/TaskModal";

const BoardContext = createContext();

const BoardProvider = ({ value, children, ...props }) => {
  const [taskModal, setTaskModal] = useState();
  
  const openTaskModal = (modalProps) => setTaskModal(modalProps);
  const closeTaskModal = () => setTaskModal(undefined);
  
  const values = {
    openTaskModal,
    closeTaskModal,
    ...value
  }

  return (
    <BoardContext.Provider value={values} {...props} >
      {children}
      {taskModal && (
        <TaskModal task={taskModal} closeTaskModal={closeTaskModal} />
      )}
    </BoardContext.Provider>
  )
}

const useBoard = () => {
  const context = useContext(BoardContext)
  if (context === undefined) {
    throw new Error('useBoard must be used within a BoardProvider')
  }

  return context
}

export { BoardProvider, useBoard }