import { createContext, useContext } from "react";

const BoardContext = createContext();

const BoardProvider = ({ value, children, ...props }) => {
  return (
    <BoardContext.Provider value={{ ...value }} {...props} >
      {children}
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