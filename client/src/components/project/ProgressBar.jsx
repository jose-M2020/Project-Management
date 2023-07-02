import { Box, LinearProgress, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';

const ProgressBar = ({ tasks }) => {
  const totalTask = tasks.length;
  const totalCompletedTask = tasks.reduce((acc, item) => (
    item.done ? acc+=1 : acc
  ), 0);
  const percentageCompletedTask = Math.round(100*(totalCompletedTask/totalTask)) || 0;
  
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '5px'
      }}
    >
      <Box display='flex' alignItems='center' gap='3px'>
        <AssignmentIcon fontSize="small" />
        <Typography variant="span" >
          {totalCompletedTask}/{totalTask}
        </Typography>
      </Box>
      <Box sx={{ width: '100%'}}>
        <LinearProgress variant="determinate" value={percentageCompletedTask} />
      </Box>
      <Typography variant="span" >
        {percentageCompletedTask}%
      </Typography>
    </Box>
  )
}

export default ProgressBar