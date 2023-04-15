import { Avatar, useTheme } from '@mui/material';
import React from 'react'
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

const ProfileAvatar = ({ name, sx }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  const nameArray = name.split(' ');

  return (
    <Avatar
      sx={{
        // bgcolor: stringToColor(name),
        bgcolor: colors.blueAccent[600],
        color: colors.blueAccent[200],
        ...sx
      }}
    >
      { nameArray[0][0] }{ nameArray.length > 1 && nameArray[1][0] }
    </Avatar>
  );
}

export default ProfileAvatar