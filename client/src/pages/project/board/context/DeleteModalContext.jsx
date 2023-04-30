import { createContext, useContext, useState } from "react";
import Modal from "../components/Modal";

const DeleteModalContext = createContext();

const DeleteModalProvider = ({ value, children }) => {
  const [deleteModal, setDeleteModal] = useState();
  
  const openDeleteModal = (modalProps) => {
    setDeleteModal(modalProps)
  };
  const closeDeleteModal = () => setDeleteModal(undefined);

  return (
    <DeleteModalContext.Provider value={{ openDeleteModal, closeDeleteModal }} >
      {children}
      {deleteModal && (
        <Modal data={deleteModal} closeModal={closeDeleteModal} />
      )}
    </DeleteModalContext.Provider>
  )
}

const useDeleteModal = () => {
  const context = useContext(DeleteModalContext)
  if (context === undefined) {
    throw new Error('useDeleteModal must be used within a DeleteModalProvider')
  }

  return context
}

export { DeleteModalProvider, useDeleteModal }