import { useTheme } from '@emotion/react';
import { Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { tokens } from '../theme';

const CustomButton = ({
  text,
  link,
  loading = false,
  btnstyle = 'primary',
  sx,
  ...props
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  // const btnSize = {
  //   small: {
  //     fontSize: "13px",
  //     fontWeight: "bold",
  //     padding: "5px 12px",
  //   },
  //   medium: {
  //     fontSize: "14px",
  //     fontWeight: "bold",
  //     padding: "8px 15px",
  //   },
  // }

  const styles = {
    primary: {
      // ...btnSize[size],
      backgroundColor: colors.blueAccent[600],
      fontWeight: "bold",
      color: '#e0e0e0',
      '&:hover': {
        backgroundColor: colors.blueAccent[700],
        boxShadow: `0 0 8px ${colors.blueAccent[600]}`,
      },
      ...sx
    },
    secondary: {
      // ...btnSize[size],
      backgroundColor: colors.primary[400],
      fontWeight: "bold",
      color: colors.grey[100],
      '&:hover': {
        color: colors.grey[100],
        boxShadow: `0 0 8px ${colors.blueAccent[600]}`,
      },
      ...sx
    },
    danger: {
      // ...btnSize[size],
      backgroundColor: colors.redAccent[500],
      fontWeight: "bold",
      color: '#e0e0e0',
      '&:hover': {
        backgroundColor: colors.redAccent[600],
        boxShadow: `0 0 8px ${colors.redAccent[600]}`,
      },
      ...sx
    },
    transparent: {
      // ...btnSize[size],
      backgroundColor: 'transparent',
      fontWeight: "bold",
      color: colors.blueAccent[100],
      '&:hover': {
        backgroundColor: 'transparent',
        boxShadow: `0 0 8px ${colors.primary[700]}`,
      },
      ...sx
    }
  }
  
  return (
    <Button
      sx={styles[btnstyle]}
      {...(loading) && {
        disabled: true,
        startIcon: <CircularProgress color="inherit" size={20} thickness={6}  />
      }}
      {...(link && {
        component: Link,
        to: link
      })}
      {...props}
    >
      {loading ? 'Submitting' : text}
    </Button>
  )
}

export default CustomButton