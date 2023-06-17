import { Box, Typography, useTheme } from "@mui/material";
// import ProgressCircle from "./ProgressCircle";
import { tokens } from "../../../../theme";

const StatusCard = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box mb={3}>
        <Typography
          variant="span"
          fontWeight="bold"
          sx={{ 
            color: colors.primary[200]
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box display="flex" gap={2}>
        <Box>
          {icon}
        </Box>
        <Box>
          <Typography variant="h5" mb={1} sx={{ color: colors.greenAccent[500] }}>
            {subtitle}
          </Typography>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          {/* <ProgressCircle progress={progress} /> */}
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatusCard;