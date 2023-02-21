import { Box, Fade, Modal, Typography } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const CustomModal = ({title, subtitle, open, handleModal, children}) => {
  return (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleModal}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box mb={3}>
              <Typography id="transition-modal-title" variant="h4" component="h2">
                {title}
              </Typography>
              <Typography variant="span">
                {subtitle}
              </Typography>
            </Box>
            {children}
          </Box>
        </Fade>
      </Modal>
  )
}

export default CustomModal