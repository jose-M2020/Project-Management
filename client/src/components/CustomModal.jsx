import { Box, Fade, Modal, Typography, useTheme } from '@mui/material'
import { tokens } from '../theme';

const CustomModal = ({title, subtitle, open = false, handleClose, children}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const style = {
    borderRadius: '8px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: colors.primary[500],
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            {title && (
              <Box mb={2}>
                <Typography id="transition-modal-title" variant="h4" component="h2">
                  {title}
                </Typography>
                <Typography variant="span">
                  {subtitle}
                </Typography>
              </Box>
            )}
            {children}
          </Box>
        </Fade>
      </Modal>
  )
}

export default CustomModal