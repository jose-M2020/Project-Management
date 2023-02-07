import { useEffect, useRef, useState } from 'react'
import { Box, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';

const CircularProgressWithLabel = ({label, progress, ...props}) => {
  const [parentSize, setParentSize] = useState(0);
  const parentRef = useRef(null);

  useEffect(() => {
    const { clientWidth } = parentRef.current;
    setParentSize(Math.min(clientWidth));
  }, []);

  return (
    <Box display='flex' justifyContent='center' alignItems='center' {...props}>
      <CircularProgress thickness={2} size={2 * parentSize} variant="determinate" value={progress} />
      <Box 
        ref={parentRef}
        position='absolute'
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Typography 
          sx={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '5px'}}
          variant='span'
        >
          {progress}%
        </Typography>
        <Typography variant='span'>{label}</Typography>
      </Box>
    </Box>
  )
}

export default CircularProgressWithLabel