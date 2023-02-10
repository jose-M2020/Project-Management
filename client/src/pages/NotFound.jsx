import { Box } from '@mui/material';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' mt={10}>
      <FaExclamationTriangle className='text-danger' size='5em' />
      <h1>404</h1>
      <p className='lead'>Sorry, this page does not exist</p>
      <Link to='/' className='btn btn-primary'>
        Go Back
      </Link>
    </Box>
  );
}