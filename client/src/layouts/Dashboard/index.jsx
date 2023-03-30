import { useState } from 'react'
import { Box, Drawer, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar'

const DashboardLayout = () => {
    const isMobil = useMediaQuery('(max-width:600px)');
    const [stateMobile, setStateMobile] = useState(false);
  
    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setStateMobile(open);
    };
  
    return (
      <>
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
      </>
    )
}

export default DashboardLayout