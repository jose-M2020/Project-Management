import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CachedIcon from '@mui/icons-material/Cached';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';

const useProjectStatus = (status) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const projectStatus = {
    'Not Started': {
      id: 1,
      name: 'Not Started',
      icon: <AccessTimeOutlinedIcon />,
      color: colors.grey[400]
    },
    'In Progress': {
      id: 2,
      name: 'In Progress',
      icon: <CachedIcon />,
      color: colors.blueAccent[400]
    },
    'Completed': {
      id: 3,
      name: 'Completed',
      icon: <CheckOutlinedIcon />,
      color: colors.greenAccent[400]
    },
  }

  return status ? projectStatus[status] : projectStatus;
}

export default useProjectStatus;