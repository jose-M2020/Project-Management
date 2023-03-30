import { Box, useTheme } from '@mui/material';
import { tokens } from '../../../theme';

const StyledEditor = ({children}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        '& .ck.ck-editor__main > .ck-editor__editable': {
          backgroundColor: 'transparent',
          border: `1px solid ${colors.primary[400]}`,
          outline: 'none',
          minHeight: '200px'
        },
        '& .ck.ck-editor__main>.ck-editor__editable.ck-focused': {
          border: `1px solid ${colors.primary[300]}`
        },
        '& .ck.ck-toolbar .ck.ck-toolbar__separator': {
          backgroundColor: 'transparent',
        },
        '& .ck.ck-toolbar.ck-toolbar_grouping': {
          backgroundColor: 'transparent',
          border: 'none',
        },
        '& .ck.ck-button, & .ck.ck-button.ck-on': {
          color: colors.grey[100],
          backgroundColor: 'transparent',
        },
        '& .ck.ck-button:hover, & .ck.ck-button.ck-off:hover, & .ck.ck-button.ck-on:hover': {
          backgroundColor: 'transparent !important',
          cursor: 'pointer',
          color: colors.grey[200],
        },
        '& .ck-dropdown__panel .ck.ck-button.ck-off.ck-button__with-text': {
          backgroundColor: `${colors.primary[700]} !important`
        },
        '& .ck.ck-list__item': {
          backgroundColor: `${colors.primary[700]} !important`
        },
        '& .ck.ck-dropdown__panel.ck-dropdown__panel-visible': {
          border: 'none',
          background: `${colors.primary[700]} !important`
        },
        '& .ck-editor__top': {
          position: 'sticky !important',
          top: '0 !important',
          background: `${colors.blueAccent[800]} !important`
        }
      }}
    >
      {children}
    </Box>
  )
}

export default StyledEditor;