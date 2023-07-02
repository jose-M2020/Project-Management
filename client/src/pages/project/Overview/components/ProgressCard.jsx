import { Box, Typography, useTheme } from "@mui/material";
// import ProgressCircle from "./ProgressCircle";
import { tokens } from "../../../../theme";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const ProgressCard = ({
  progress: { value, text },
  title,
  subtitle
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box bgcolor={colors.primary[400]} p='12px' >
      <Box display="flex" alignItems='center' gap='12px' >
        <Box maxWidth='60px'>
          <CircularProgressbar
            value={value}
            text={text}
            styles={buildStyles({ 
              textSize: '1.9rem',
              textColor: colors.blueAccent[100],
              pathColor:  colors.greenAccent[400],
              trailColor: '#3a4760'
            })} />
        </Box>
        <Box>
          <Typography
            variant="h4"
            fontSize='1.3rem'
            fontWeight='bold'
          >
            { title }
          </Typography>
          <Typography sx={{ color: colors.grey[100] }}>{ subtitle }</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ProgressCard