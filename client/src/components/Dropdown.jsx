import { useState } from 'react'
import { Box, Menu, MenuItem, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { tokens } from '../theme';
import { useNavigate } from 'react-router-dom';

const Dropdown = ({button, options, children, width = 'auto', ...props}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleItemClick = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        onClick={handleClick}
        display='inline-block'
      >
        { button }
      </Box>
      <Menu
        elevation={0}
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleItemClick}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: `drop-shadow(0px 2px 8px rgba(0,0,0,0.32))`,
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: colors.primary[400],
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        sx={{
          '& .MuiPaper-root': {
            boxShadow: `1px 1px 6px ${colors.primary[600]}`,
            width,
            borderRadius: 2,
            padding: 1,
            backgroundColor: colors.primary[400],
            '& .MuiMenu-list': {
            },
            '& .MuiMenuItem-root': {
              '& .MuiSvgIcon-root': {
                fontSize: 18,
                marginRight: 12,
              },
              '&:active': {
                backgroundColor: alpha(
                  colors.primary[400], .5
                ),
              },
            },
          },
        }}
        {...props}
      >
        {children}
        {options && (
          options.map((item, index) => (
            <MenuItem 
              key={index}
              onClick={() => {
                handleItemClick();
                item?.path && navigate(item.path)
              }}
              disableRipple
            >
              {item?.icon}
              {item?.title}
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
}

export default Dropdown