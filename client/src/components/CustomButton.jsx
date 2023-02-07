import { useTheme } from '@emotion/react';
import { Button, CircularProgress } from '@mui/material';
import { tokens } from '../theme';

const CustomButton = ({text, ...props}) => {
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
      backgroundColor: colors.blueAccent[700],
      color: colors.grey[100],
      '&:hover': {
        color: colors.grey[100],
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
    }
  }
  
  return (
    <Button
      sx={styles[props.btnstyle]}
      {...props}
      {...(props.loading) && {
        disabled: 'true',
        startIcon: <CircularProgress size={20} thickness={6}  />
      }}
    >
      {props.loading ? 'Submitting' : text}
    </Button>
  )
}

export default CustomButton