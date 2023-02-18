import { FormControlLabel } from '@mui/material'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Checkbox = ({label, ...props}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox 
        {...props}
        />
      }
      label={label}
    />
  )
}

export default Checkbox