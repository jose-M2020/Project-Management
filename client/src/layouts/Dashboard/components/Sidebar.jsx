import { useEffect, useRef, useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Box, IconButton, Tooltip, Typography, styled, tooltipClasses, useTheme } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
// import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import { useProject } from "../../../context/ProjectContext";
import ProfileAvatar from "../../../components/user/ProfileAvatar";
import useProjectStatus from "../../../hooks/useProjectStatus";
import { hexToRgba } from "../../../helpers/colors";

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

const ProjectTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    fontSize: '14px'
  },
}));

const Sidebar = ({setSidebarWidth, ...props}) => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState(pathname);
  const { collapseSidebar, collapsed } = useProSidebar();
  
  const project = useProject();
  const { color: statusColor, icon } = useProjectStatus(project.status)
  
  const sidebarRef = useRef();

  useEffect(() => {
    // setTimeout(() => {
    //   setSidebarWidth(sidebarRef?.current?.clientWidth);
    // }, 300);
    collapsed ? setSidebarWidth(80) : setSidebarWidth(250);
  }, [collapsed])

  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "calc(100vh - 70.28px)",
        top: '70.28px',
        bottom: 0,
        zIndex: 900,
      }}
      {...props}
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
          ref={sidebarRef}
        >
          {/*  CARD AND MENU ICON */}
          <Box position='relative'>
            {!collapsed && (
              <Box paddingX='20px'>
                <Box textAlign='right' marginTop='15px' position='absolute' right='0'>
                  <IconButton 
                    onClick={() => collapseSidebar(!collapsed)}
                    sx={{ backgroundColor: colors.blueAccent[900] }}
                  >
                      <FirstPageIcon />
                    </IconButton>
                </Box>
                {/* APP INFO */}
                <Box my="15px" >
                  <Box mb='12px' display='flex' justifyContent='center' >
                    <ProfileAvatar userData={{firstname: project.name}} size='lg' />
                  </Box>
                  <Box>
                    <Box
                      padding='12px'
                      borderRadius={2}
                      boxShadow={`0 0 7px ${colors.primary[700]}`}
                    >

                      <Box display='flex' alignItems='center' justifyContent='space-between' gap='3px' mb='8px'>
                        <Typography 
                          variant="span"
                          color={statusColor}
                          bgcolor={hexToRgba(statusColor, .2)}
                          p='5px'
                          borderRadius='7px'
                          display='flex'
                          alignItems='center'
                        >
                          { icon }
                          <strong>{ project.status }</strong>
                        </Typography>
                        <ProjectTooltip title={ project?.description } sx={{ marginLeft: '6px' }} >
                          <InfoIcon sx={{ color: colors.grey[100] }} />
                        </ProjectTooltip>
                      </Box>
                      <Typography
                        variant="h2"
                        fontSize='1.2rem'
                        color={colors.grey[100]}
                        fontWeight="bold"
                        // noWrap={true}
                      >
                        {project?.name}
                      </Typography>
                      <Typography variant="h5" color={colors.greenAccent[500]} >
                        {project?.type}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
            {collapsed && (
              <MenuItem
                icon={ <LastPageIcon sx={{fontSize: '25px'}} onClick={() => collapseSidebar(!collapsed)} /> }
                style={{
                  margin: "10px 0 10px 0",
                  color: colors.grey[100],
                }}
              />
            )}
          </Box>

          <Box>
            <Item
              title="Overview"
              path={`projects/${id}/overview`}
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Activity
            </Typography> */}
            <Item
              title="Board"
              path={`projects/${id}/board`}
              icon={<FormatListBulletedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              path={`projects/${id}/calendar`}
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Users"
              path={`projects/${id}/users`}
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
              path={`projects/${id}/settings`}
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Typography
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
            /> */}
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