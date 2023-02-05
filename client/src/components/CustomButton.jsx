import { useTheme } from '@emotion/react';
import { Button } from '@mui/material';
import { tokens } from '../theme';

const CustomButton = ({text, ...props}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Button
      sx={{
        backgroundColor: colors.blueAccent[700],
        color: colors.grey[100],
        fontSize: "14px",
        fontWeight: "bold",
        padding: "10px 20px",
        '&:hover': {
          color: colors.grey[100],
          boxShadow: `0 0 8px ${colors.blueAccent[600]}`,
        },
      }}
      {...props}
    >
      {text}
    </Button>
  )
}

export default CustomButton