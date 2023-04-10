import { useState } from "react";
import { Box, Fab, TextField, useTheme } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { tokens } from "../../theme";
import AutoComplete from "./AutoComplete";
import { arraysEqual } from "../../helpers/helpers";

const EditInput = ({onAccept, value = '', children, ...props}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);
  const [activeEdit, setActiveEdit] = useState(false);
  const [inputValue, setInputValue] = useState(value)
  
  const handleChange = (e, autoCompleteValue) => {
    const newValue = !autoCompleteValue ? e.target.value : autoCompleteValue;
    
    const isChanged = Array.isArray(newValue) ? (
      !arraysEqual(newValue, value)
    ) : (
      newValue !== value
    )

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
  
  const handleClickAccept = async () => {
    setLoading(true);
    setActiveEdit(false);
    const status = await onAccept(inputValue, props.name);
    // status ? setInputValue()
    console.log(status);
    setLoading(false);
  }

  return (
    <Box position='relative' onBlur={handleBlur} >
      <>
        {props.options ? (
          <AutoComplete
            value={inputValue}
            onChange={(_, value) => {
              handleChange(null, value)
            }}
            {...loading && {
              disabled: true
            }}
            {...props}
          />
        ) : (
          <TextField
            value={inputValue}
            // name='name'
            onChange={e => handleChange(e)}
            fullWidth
            {...loading && {
              disabled: true
            }}
            {...props}
          >
            {children}
          </TextField>             
        )}
      </>
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