import { useTheme } from '@emotion/react';
import { Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { tokens } from '../theme';

const CustomButton = ({text, link, loading = false , ...props}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const mainStyles = {
    fontSize: "14px",
    fontWeight: "bold",
    padding: "8px 15px",
  }

  const styles = {
    primary: {
      ...mainStyles,
      backgroundColor: colors.blueAccent[600],
      color: '#e0e0e0',
      '&:hover': {
        backgroundColor: colors.blueAccent[700],
        boxShadow: `0 0 8px ${colors.blueAccent[600]}`,
      },
    },
    secondary: {
      ...mainStyles,
      backgroundColor: colors.primary[400],
      color: colors.grey[100],
      '&:hover': {
        color: colors.grey[100],
        boxShadow: `0 0 8px ${colors.blueAccent[600]}`,
      },
    },
    danger: {
      ...mainStyles,
      backgroundColor: colors.redAccent[500],
      color: '#e0e0e0',
      '&:hover': {
        backgroundColor: colors.redAccent[600],
        boxShadow: `0 0 8px ${colors.redAccent[600]}`,
      },
    }
  }
  
  return (
    <Button
      sx={styles[props.btnstyle]}
      {...props}
      {...(loading) && {
        disabled: true,
        startIcon: <CircularProgress color="inherit" size={20} thickness={6}  />
      }}
      {...(link && {
        component: Link,
        to: link
      })}
    >
      {loading ? 'Submitting' : text}
    </Button>
  )
}

export default CustomButton