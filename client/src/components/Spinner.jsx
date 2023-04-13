import { Stack, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

const Spinner = () => {
  return (
    <Stack
      spacing={2}
      alignItems='center'
      mt={5}
    >
      <CircularProgress />
      <Typography>Loading</Typography>
    </Stack>
  );
}

export default Spinner;