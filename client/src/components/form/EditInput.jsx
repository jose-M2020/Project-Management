import { useState } from "react";
import { Box, Button, Fab, TextField, useTheme } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { tokens } from "../../theme";
import AutoComplete from "./AutoComplete";
import { arraysEqual } from "../../helpers/array";
import CustomButton from "../CustomButton";

const EditInput = ({onAccept, value = '', children, ...props}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);
  const [activeEdit, setActiveEdit] = useState(false);
  const [inputValue, setInputValue] = useState(value)
  
  const handleChange = (fieldValue) => {
    const isChanged = Array.isArray(fieldValue) ? (
      !arraysEqual(fieldValue, value)
    ) : (
      fieldValue !== value
    )

    setInputValue(fieldValue)
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
              handleChange(value)
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
            onChange={e => handleChange(e.target.value)}
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
        gap='2px'
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
          alignItems: 'center'
        }}
      >
        <CustomButton
          id='input-actions'
          text={<CheckIcon />}
          sx={{ minWidth: '45px' }}
          size="small"
          aria-label='edit'
          onClick={handleClickAccept}
        />
        <CustomButton
          text={<ClearIcon />}
          btnstyle="transparent"
          sx={{ 
            minWidth: '45px',
          }}
          size="small"
          aria-label="cancel"
        />
      </Box>
    </Box>
  )
}

export default EditInput;