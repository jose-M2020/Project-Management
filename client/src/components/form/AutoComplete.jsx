import { Chip, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete';
import { useFormikContext } from 'formik';

const AutoComplete = ({options, ...props}) => {
  const { setFieldValue } = useFormikContext();

  return (
    <Autocomplete
      getOptionLabel={(option) => option.label}
      options={options}
      onChange={(e, value) => {
        const val = props.multiple ? (
            value.flatMap(item => (
              (typeof item === 'string') ? item : (item?.value)
            ))
          ) : (
            value?.value
          )
        
        setFieldValue(props.name, val);
      }}
      sx={{
          display: 'inline-block',
          width: '100%',
          '& input': {
            color: 'white',
          },
      }}
      renderTags={
        props.multiple ? (
          (value, getTagProps) => (
            value.map((option, index) => (
              <Chip 
                variant="outlined"
                label={
                  (typeof option === 'string') ? option : (option?.label)
                } 
                {...getTagProps({ index })}
              />
            ))
          )
        ) : () => {}
      }
      renderInput={(params) => (
        <TextField {...params} label={props.label} />
      )}
      {...props}
    />
  )
}

export default AutoComplete