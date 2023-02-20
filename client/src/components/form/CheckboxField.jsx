import { Checkbox, FormControlLabel } from '@mui/material'
import { useField } from 'formik';

const CheckboxField = ({label, ...props}) => {
  const [field] = useField({...props, type: "checkbox"});

  return (
    <FormControlLabel
      control={
        <Checkbox
          {...field}
        />
      }
      label={label}
    />
  )
}

export default CheckboxField