import { createContext, useContext } from "react";

const ProjectContext = createContext();

const ProjectProvider = ({ value, children, ...props }) => {
  return (
    <ProjectContext.Provider value={value} {...props} >
      {children}
    </ProjectContext.Provider>
  )
}

const useProject = () => {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider')
  }

  return context
}

export { ProjectProvider, useProject }