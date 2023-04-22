import { useState } from "react";
import { Box, Button, Fab, TextField, Typography, useTheme } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear'
import { tokens } from "../theme";
import { arraysEqual } from "../helpers/array";
import AutoComplete from "./form/AutoComplete";
import CustomButton from "./CustomButton";

const EditableText = ({
  onAccept,
  text,
  textComplement,
  mode = 'text',
  padding = '16.5px 14px',
  children,
  ...props
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);
  const [isValueChanged, setIsValueChanged] = useState(false);
  const [inputValue, setInputValue] = useState(text)
  const [isEditing, setIsEditing] = useState(mode === 'text' ? false : true);
  // console.log(text)
  const handleChange = (fieldValue) => {
    const isChanged = Array.isArray(fieldValue) ? (
      !arraysEqual(fieldValue, text)
    ) : (
      fieldValue !== text
    )

    setInputValue(fieldValue)
    isChanged ? setIsValueChanged(true) : setIsValueChanged(false);
  }

  const setDefaultValue = (e) => {
    setInputValue(text)
    setIsValueChanged(false)
  }

  const handleBlur = (e) => {
    setIsEditing(false);  

    if(e?.relatedTarget?.id === 'input-actions' || !isValueChanged){
      return
    }
    
    setDefaultValue();
  }
  
  const handleClickAccept = async () => {
    setLoading(true);
    setIsValueChanged(false);
    const status = await onAccept(inputValue, props.name);
    // status ? setInputValue()
    setLoading(false);
    setIsEditing(false);
  }

  return (
    <Box position='relative' onBlur={handleBlur} width='100%' >
      {!isEditing ? (
        <Box
          onClick={() => setIsEditing(true)}
          display='flex'
          alignItems='center'
          gap='3px'
          p={padding}
        >
          <Typography>{ inputValue }</Typography>
          { textComplement }
        </Box>
      ) : (
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
              autoFocus={true}
              autoComplete='off'
              sx={{
                '& input': {
                  p: padding
                }
              }}
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
              display: isValueChanged ? 'flex' : 'none',
              alignItems: 'center'
            }}
          >
            <CustomButton
              id='input-actions'
              text={<CheckIcon />}
              sx={{
                minWidth: '30px',
              }}
              size="small"
              aria-label='edit'
              onClick={handleClickAccept}
            />
            <CustomButton
              text={<ClearIcon />}
              btnstyle="transparent"
              sx={{ 
                minWidth: '30px'
              }}
              size="small"
              aria-label="cancel"
            />
          </Box>
        </>
      )}
    </Box>
  )
}

export default EditableText