import { Fragment } from 'react';
import { Chip, CircularProgress, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete';

const AutoComplete = ({
  options = [], 
  setLabel,
  valueField = 'value',
  async = false,
  open,
  setOpen,
  loading,
  ...props
}) => {

  // const { setFieldValue, values  } = useFormikContext();
  
  // TODO: show the new value added in autocomplete freeSolo, ONLY happens in the UI, in the value formik is added

    // defaultValues = props.multiple ? (
    //   options.filter(item => (
    //     values[props?.name]?.includes(item[valueField])
    //   ))
    // ) : (
    //   options?.find((item) => (
    //     item[valueField] === values[props?.name]
    //   )) || null
    // );
  
  return (
    <Autocomplete
      // value={defaultValues}
      getOptionLabel={(option) => (
        setLabel ? setLabel(option) : option.label
      )}
      options={options}
      // onChange={(_, value) => {
      //   const val = props.multiple ? (
      //       value.map(item => (
      //         (typeof item === 'string') ? item : (item[valueField])
      //       ))
      //     ) : (
      //       value ? value[valueField] : value
      //     )

      //   setFieldValue(props.name, val);
      // }}
      sx={{
          display: 'inline-block',
          width: '100%',
          '& input': {
            color: 'white',
          },
      }}
      
      {...(props.multiple && {
        renderTags: (value, getTagProps) => (
          value.map((option, index) => (
            <Chip
              key={index}
              sx={{ display: 'block' }}
              variant="outlined"
              label={
                (typeof option === 'string') ? (
                  option 
                ) : (
                  setLabel ? setLabel(option) : option.label
                )
              } 
              {...getTagProps({ index })}
            />
          ))
        )
      })}

      renderInput={(params) => (
        <TextField 
          {...params}
          label={props.label} 
          {...(async && {
            InputProps: {
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            }
          })}
        />
      )}
      {...(async && {
        open: open,
        onOpen: () => {
          setOpen(true);
        },
        onClose: () => {
          setOpen(false);
        },
        loading: loading,
      })}
      {...props}
    />
  )
}

export default AutoComplete