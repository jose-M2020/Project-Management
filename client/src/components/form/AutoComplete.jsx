import { Chip, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete';
import { useFormikContext } from 'formik';

const AutoComplete = ({options, ...props}) => {
  const { setFieldValue } = useFormikContext();

  return (
    <Autocomplete
      freeSolo
      options={options.map((option) => option.title)}
      onChange={(e, value) => {
        setFieldValue(props.name, value);
      }}
      sx={{
          display: 'inline-block',
          '& input': {
            width: 200,
            color: 'white',
          },
      }}
      renderTags={
        props.multiple ? (
          (value, getTagProps) => (
            value.map((option, index) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            ))
          )
        ) : ''
      }
      renderInput={(params) => (
        <TextField {...params} label={props.label} />
      )}
      {...props}
    />
  )
}

export default AutoComplete