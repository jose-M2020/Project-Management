import { Box, Stack, Typography } from "@mui/material";

const ModalSection = ({icon, title, children}) => (
  <Stack gap={1} direction='row' >
    <Typography>
      {icon}
    </Typography>
    <Box flexGrow={1} minWidth={0} >
      <Box>
        {title && (
          <Typography mb={1} >
              {title}
          </Typography>
        )}
      </Box>
      {children}
    </Box>
  </Stack>
);

export default ModalSection;