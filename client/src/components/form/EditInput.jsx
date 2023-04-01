import { useState } from "react";
import { Box, Fab, TextField, useTheme } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { tokens } from "../../theme";

const EditInput = ({onAccept, value = '', children, ...props}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [activeEdit, setActiveEdit] = useState(false);
  const [inputValue, setInputValue] = useState(value)

  const handleChange = (e) => {
    const {target: {value: newValue}} = e;
    const isChanged = newValue !== value;
    setInputValue(newValue)
    
    isChanged ? setActiveEdit(true) : setActiveEdit(false);
  }

  const setDefaultValue = (e) => {
    setInputValue(value)
    setActiveEdit(false)
  }

  const handleBlur = (e) => {
    if(e?.relatedTarget?.id === 'input-actions' || !activeEdit){
      return
    }
    
    setDefaultValue();
  }
  
  const handleClickAccept = () => {
    setActiveEdit(false);
    const status = onAccept(inputValue, props.name);
    // status ? setInputValue()
    console.log(status);
  }

  return (
    <Box position='relative' onBlur={handleBlur} >
      <TextField
        value={inputValue}
        // name='name'
        onChange={handleChange}
        fullWidth
        {...props}
      >
        {children}
      </TextField>             
      <Box
        gap={1}
        sx={{
          bgcolor: colors.primary[500],
          borderRadius: '8px',
          boxShadow: `0 0 12px ${colors.primary[600]}`,
          padding: 1,
          position: 'absolute',
          top: '100%',
          right: 0,
          zIndex: 100,
          display: activeEdit ? 'flex' : 'none',
        }}
      >
        <Fab
          id='input-actions'
          sx={{
            bgcolor: colors.blueAccent[600],
            color: colors.blueAccent[100],
            width: '34px',
            height: '33px',
            '&:hover': {
              bgcolor: colors.blueAccent[700],
            }
          }}
          aria-label='edit'
          onClick={handleClickAccept}
        >
          <CheckIcon />
        </Fab>
        <Fab
          sx={{
            bgcolor: colors.redAccent[500],
            color: colors.blueAccent[100],
            width: '34px',
            height: '33px',
            '&:hover': {
              bgcolor: colors.redAccent[600],
            }
          }}
          aria-label="cancel"
        >
          <ClearIcon />
        </Fab>
      </Box>
    </Box>
  )
}

export default EditInput;