import { createContext, useContext, useState } from "react";
import TaskModal from "../components/task/modal/TaskModal";

const TaskModalContext = createContext();

const TaskModalProvider = ({ value, children, ...props }) => {
  const [taskModal, setTaskModal] = useState();
  
  const openTaskModal = (modalProps) => {
    setTaskModal(modalProps)
  };
  const closeTaskModal = () => setTaskModal(undefined);

  return (
    <TaskModalContext.Provider value={{ openTaskModal, closeTaskModal }} {...props} >
      {children}
      {taskModal && (
        <TaskModal task={taskModal} closeTaskModal={closeTaskModal} />
      )}
    </TaskModalContext.Provider>
  )
}

const useTaskModal = () => {
  const context = useContext(TaskModalContext)
  if (context === undefined) {
    throw new Error('useTaskModal must be used within a TaskModalProvider')
  }

  return context
}

export { TaskModalProvider, useTaskModal }