import { Box, MenuItem, TextField } from "@mui/material";
import { useField } from "formik";

const Input = ({options, ...props}) => {
    const [field, meta] = useField(props);
    let alignItems = !!(meta.error) ? 'center' : 'flex-end';
    
    return (
      <Box sx={{ display: 'flex', alignItems }}>
        {props.icon}
        <TextField
          {...field}
          {...props}
          variant={props.variant ? props.variant : 'outlined'}
          color="secondary"
          fullWidth
          helperText={(meta.touched && meta.error) && meta.error}
          error={meta.touched && !!(meta.error)}
        >
          {props.select && (
            options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))
          )}
        </TextField>
      </Box>
    );
}

export default Input