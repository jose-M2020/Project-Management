import { Box, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme';
import ProfileAvatar from './ProfileAvatar';

const ProfileRow = ({ user, ...props }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  
  return (
    <Box
      display='flex'
      gap='10px'
      alignItems='center'
      {...props}
    >
      <ProfileAvatar name={user?.firstname} />
      <Box>
        <Typography mb='4px'>{user?.firstname} {user?.lastname}</Typography>
        <Typography 
          fontSize='12px'
          color={colors.greenAccent[400]}
        >
          {user?.position}
        </Typography>
      </Box>
    </Box>
  )
}

export default ProfileRow