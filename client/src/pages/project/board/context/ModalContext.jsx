import { createContext, useContext, useState } from "react";
import TaskModal from "../components/task/modal/TaskModal";

const ModalContext = createContext();

const ModalProvider = ({ value, children, ...props }) => {
  const [taskModal, setTaskModal] = useState();
  
  const openTaskModal = (modalProps) => {
    console.log('openTaskModal; ', modalProps)
    setTaskModal(modalProps)
  };
  const closeTaskModal = () => setTaskModal(undefined);

  return (
    <ModalContext.Provider value={{ openTaskModal, closeTaskModal }} {...props} >
      {children}
      {taskModal && (
        <TaskModal task={taskModal} closeTaskModal={closeTaskModal} />
      )}
    </ModalContext.Provider>
  )
}

const useModal = () => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }

  return context
}

export { ModalProvider, useModal }