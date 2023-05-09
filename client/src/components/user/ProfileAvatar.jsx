import { useState } from 'react'
import { Avatar, Box, Popover, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function ProfilePopover({ 
  active,
  data,
  popoverChildren,
  children
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Box
        {...active && {
          onClick: handleClick
        }}
        sx={{ 
          width: '100%',
          height: '100%',
          cursor: active ? 'pointer' : 'cursor',
        }}
      >
        {children}
      </Box>
      {active && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Box
            sx={{
              p: 2,
              bgcolor: colors.primary[400],
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Typography>{data.firstname} {data.lastname}</Typography>
            <Box>
              { popoverChildren }
            </Box>
          </Box>
        </Popover>
      )}
    </>
  );
}

const ProfileAvatar = ({
  userData,
  size,
  showDetails = false,
  children,
  ...props
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  const nameArray = userData?.firstname?.split(' ');

  const sizes = {
    sm: {
      width: 30,
      height: 30,
      fontSize: '14px',
    }
  }

  return (
    <>
      <Avatar sx={{
        bgcolor: colors.blueAccent[600],
        color: colors.blueAccent[200],
        ...(size && sizes[size]),
        ...props.sx
      }}>
        <ProfilePopover
          data={userData}
          active={showDetails}
          popoverChildren={children}
        >
          <Box
            sx={{
              // bgcolor: stringToColor(name),
              fontWeight: 'bold',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              
            }}
          >
            { nameArray[0][0] }{ nameArray.length > 1 && nameArray[1][0] }
          </Box>
        </ProfilePopover>
      </Avatar>
    </>
  );
}

export default ProfileAvatar