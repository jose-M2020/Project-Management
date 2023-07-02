import { useEffect, useState } from 'react'
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
  const [sidebarWidth, setSidebarWidth] = useState()
  const { loading, data } = useQuery(
    GET_PROJECTOVERVIEW,
    { variables: { id } }
  );

  useEffect(() => {
    isMobil && setSidebarWidth(0);
  }, [isMobil])
  
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
        <Box>
          {isMobil ? (
            <>
              <Drawer
                anchor='left'
                open={stateMobile}
                onClose={toggleDrawer(false)}
              >
                <Sidebar setSidebarWidth={setSidebarWidth} />
              </Drawer>
            </>
          ) : (
            <Sidebar setSidebarWidth={setSidebarWidth} />
          )}
          
        </Box>
        <Box
          component='main'
          height='100%'
          width={`calc(100vw - ${sidebarWidth}px)`}
        >
          <Outlet />
        </Box>
      </Box>
    </ProjectProvider>
  )
}

export default DashboardLayout