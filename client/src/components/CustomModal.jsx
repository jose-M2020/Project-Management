import { Box, Fade, Modal, Typography, useTheme } from '@mui/material'
import { tokens } from '../theme';

const CustomModal = ({title, subtitle, width = '450px', open = false, handleClose, children}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const style = {
    borderRadius: '8px',
    bgcolor: colors.primary[500],
    p: 4,
    position: 'absolute',
    boxShadow: 24,
    top: '50%',
    left: '50%',
    width,
    maxHeight: '97%',
    overflowY: 'auto',
    transform: 'translate(-50%, -50%)',
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
                <Typography id="transition-modal-title" variant="h4" component="h2" mb={1}>
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