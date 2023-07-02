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
  position,
  data,
  popoverChildren,
  children
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  const [anchorEl, setAnchorEl] = useState(null);

  const positions = {
    bottom: {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'right',
      }
    },
    left: {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'left',
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'right',
      }
    },
  }

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
          {...positions[position]}
          sx={{ marginTop: '10px' }}
        >
          <Box
            sx={{
              bgcolor: colors.primary[400],
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              minWidth: '290px',
            }}
          >
            <Box
              p={2}
              sx={{
                display: 'flex',
                gap: 1,
                borderRadius: '5px',
                backgroundImage: `linear-gradient(to bottom, ${colors.blueAccent[400]} 0%, ${colors.blueAccent[400]} 100%)`,
                backgroundSize: '100% 63%',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <ProfileAvatar
                userData={data}
                sx={{
                  width: '85px',
                  height: '85px',
                  fontSize: '2.4rem',
                }}
              />
              <Box mt={1} color={colors.blueAccent[900]}>
                <Typography fontWeight={700} fontSize='18px'>
                  {data.firstname} {data.lastname}
                </Typography>
                <Typography fontWeight={600} fontSize='12px'>
                  {data.email}
                </Typography>
              </Box>
            </Box>
            <Box px={2} pb={2}>
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
  popoverPos = 'bottom',
  children,
  ...props
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  const nameArray = userData?.firstname?.split(' ');
  const name = (`${ nameArray[0][0] }${nameArray.length > 1 ? nameArray[1][0] : ''}`).toUpperCase();

  const sizes = {
    sm: {
      width: 30,
      height: 30,
      fontSize: '14px',
    },
    md: {
      width: 40,
      height: 40,
      fontSize: '14px',
    },
    lg: {
      width: 70,
      height: 70,
      fontSize: '35px',
    },
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
          position={popoverPos}
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
            { name }
          </Box>
        </ProfilePopover>
      </Avatar>
    </>
  );
}

export default ProfileAvatar