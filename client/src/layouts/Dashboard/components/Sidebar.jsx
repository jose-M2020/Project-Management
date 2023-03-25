import { useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
// import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import BugReportIcon from '@mui/icons-material/BugReport';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
          {/* LOGO AND MENU ICON */}
          <MenuItem
            icon={collapsed && <MenuOutlinedIcon onClick={() => collapseSidebar(!collapsed)} />}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  IT Projects
                </Typography>
                <IconButton onClick={() => collapseSidebar(!collapsed)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!collapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Jhon Klein
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Front-end Developer
                </Typography>
              </Box>
            </Box>
          )}

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
              title="Projects"
              path="/projects"
              icon={<FolderCopyIcon />}
              selected={selected}
              setSelected={setSelected}
            />
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
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Users
            </Typography>
            <Item
              title="Clients"
              path="/clients"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Team"
              path="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="FAQ Page"
              path="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

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