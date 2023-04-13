import { createContext, useState } from 'react'
import { Box, Drawer, useMediaQuery } from '@mui/material';
import { useQuery } from '@apollo/client';
import { Outlet, useParams } from 'react-router-dom';
import Sidebar from './components/Sidebar'
import { GET_PROJECTOVERVIEW } from '../../graphql/queries/projectQueries';
import Spinner from '../../components/Spinner';
import { ProjectProvider } from '../../context/ProjectContext';

const DashboardLayout = () => {
  const { id } = useParams();
  const isMobil = useMediaQuery('(max-width:600px)');
  const [stateMobile, setStateMobile] = useState(false);
  
  const { loading, data } = useQuery(
    GET_PROJECTOVERVIEW,
    { variables: { id } }
  );

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setStateMobile(open);
  };

  if(loading) return <Spinner />
  
  return (
    <ProjectProvider value={data?.project}>
      <Box sx={{display: 'flex', position: 'relative'}}>
        {isMobil ? (
          <>
            <Drawer
              anchor='left'
              open={stateMobile}
              onClose={toggleDrawer(false)}
            >
              <Sidebar />
            </Drawer>
          </>
        ) : (
          <Sidebar />
        )}
        <main>
          <Box>
            <Outlet />
          </Box>
        </main>
      </Box>
    </ProjectProvider>
  )
}

export default DashboardLayout