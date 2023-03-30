import { useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
// import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../theme";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SettingsIcon from '@mui/icons-material/Settings';

const Item = ({ title, path, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === path}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(path)}
      icon={icon}
      component={<Link to={path} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Sidebar = () => {
  const { pathname } = useLocation();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState(pathname);
  const { collapseSidebar, collapsed } = useProSidebar();

  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 1000,
      }}
    >
      <ProSidebar 
        backgroundColor={colors.primary[400]}
        rootStyles={{
          border: 'none'
        }}
      >
        <Menu iconShape="square"
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
                return {
                  color: active && '#3e91d3 !important',
                  backgroundColor: 'transparent',
                  '&:hover': {
                    color: '#868dfb !important',
                    backgroundColor: 'transparent'
                  }
                };
            }
          }}
        >
          {/*  CARD AND MENU ICON */}
          <Box position='relative'>
            {!collapsed && (
              <>
                <Box
                  sx={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translate(0,-50%)'
                  }}
                >
                  <IconButton 
                    onClick={() => collapseSidebar(!collapsed)}
                    sx={{ backgroundColor: colors.primary[600] }}
                  >
                      <ArrowBackIosIcon />
                    </IconButton>
                </Box>
                <Box 
                  my="15px"              
                  paddingLeft={"10%"}
                >
                  <Box paddingX='20px' >
                    <Box
                      backgroundColor={colors.blueAccent[700]}
                      padding={1}
                      borderRadius={2}
                    >
                      <Typography
                        variant="h2"
                        fontSize='1.2rem'
                        color={colors.grey[100]}
                        fontWeight="bold"
                        noWrap={true}
                      >
                        Ecommerce Project
                      </Typography>
                      <Typography variant="h5" color={colors.greenAccent[500]}>
                        Front-end
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </>
            )}
            {collapsed && (
              <MenuItem
                icon={ <MenuOutlinedIcon onClick={() => collapseSidebar(!collapsed)} /> }
                style={{
                  margin: "10px 0 10px 0",
                  color: colors.grey[100],
                }}
              />
            )}
          </Box>

          <Box paddingLeft={collapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              path="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Activity
            </Typography>
            <Item
              title="Tasks"
              path="/tasks"
              icon={<FormatListBulletedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              path="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Bugs"
              path="/bugs"
              icon={<BugReportIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title="Settings"
              path="/settings"
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Statistics 
            </Typography>
            <Item
              title="Bar Chart"
              path="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              path="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              path="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              path="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Box sx={{marginTop: 2}}>
                <Item
                title="Profile"
                path="/profile"
                icon={<AccountCircleIcon />}
                selected={selected}
                setSelected={setSelected}
                />
            </Box> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;