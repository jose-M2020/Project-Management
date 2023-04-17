import { Box, IconButton, MenuItem, Typography, useTheme } from "@mui/material";
import { Fragment, useContext } from "react";
import { ColorModeContext, tokens } from "../../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom";
import Dropdown from "../../../components/Dropdown";

const sectionMenu = [
  { title: 'Projects', path: '/projects' },
  {
    title: 'Users',
    submenu: [
      { title: 'Developers', path: '/team' },
      { title: 'Clients', path: '/clients' }
    ]
  }
]

const toolMenu = (theme, colorMode) => {
  return [
    {icon: (
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
      )
    },
    {icon: (
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
      )
    },
    {icon: (
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
      )
    }
  ]
} 

const Topbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      p={2}
      backgroundColor={colors.primary[500]}
      display="flex"
      justifyContent="space-between"
      position='sticky'
      top='0'
      zIndex={1000}
    >
      {/* LEFT SIDE */}
      <Box display="flex" alignItems='center' gap={1} >
        {/* { isMobil && (
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        ) } */}
        <Box sx={{ display: { xs: 'block', md: 'none' }}}>
          <Dropdown
            button={
              <IconButton>
                <MenuIcon />
              </IconButton>
            }
            options={sectionMenu}          
          />
        </Box>
        <Typography>IT PROJECTS</Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' }}}>
          {sectionMenu.map((item, index) => (
            <Box key={index}>
              {item?.submenu ? (
                <MenuItem>
                  <Dropdown
                    button={<Typography>Users</Typography>}
                    options={item.submenu}
                  />
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => navigate(item.path)}
                  // component={<Link to="/projects" />}
                >
                  {item.title}
                </MenuItem>
              )}
            </Box>
          ))}
        </Box>
      </Box>

      {/* RIGTH SIDE */}
      <Box display="flex">
        {/* SEARCH BAR */}
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }} >
          {toolMenu(theme, colorMode).map((item, index) => (
            <Fragment key={index}>
              {item.icon}
            </Fragment>
          ))}
        </Box>
        <Dropdown
          button={
            <IconButton>
              <PersonOutlinedIcon />
            </IconButton>
          }
        >
          <Box p={2} >
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
        </Dropdown>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <Dropdown
            button={
              <IconButton>
                <MoreIcon />
              </IconButton>
            }
          >
            {toolMenu(theme, colorMode).map((item, index) => (
              <Box key={index}>{item.icon}</Box>
            ))}
          </Dropdown>
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;