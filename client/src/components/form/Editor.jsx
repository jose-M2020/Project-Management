import { useRef, useState } from "react";
import { Box, Button, Fab, TextField, useTheme } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { tokens } from "../../theme";
import AutoComplete from "./AutoComplete";
import { arraysEqual } from "../../helpers/array";
import CustomButton from "../CustomButton";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const Editor = ({onAccept, value = '', children, handleUpdate, ...props}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);
  const [activeEdit, setActiveEdit] = useState(false);
  const [editorContent, setEditorContent] = useState(value);
  const refEditor = useRef();
  
  const handleChange = (fieldValue) => {
    const isChanged = fieldValue !== value
    setEditorContent(fieldValue)
    isChanged ? setActiveEdit(true) : setActiveEdit(false);
  }

  const setDefaultValue = (e) => {
    setEditorContent(value)
    setActiveEdit(false)
  }

  const handleBlur = (e) => {
    // TODO: When click in the editor toolbar, anywhere other than the button refEditor.current.contains throw false
    console.log(refEditor.current.contains(e.relatedTarget))
    if(
      e?.relatedTarget?.id === 'input-actions' ||
      refEditor.current.contains(e.relatedTarget) ||
      !activeEdit
    ){
      return
    }
    
    setDefaultValue();
  }
  
  const handleClickAccept = async () => {
    setLoading(true);
    setActiveEdit(false);
    const status = await onAccept(editorContent, props.name);
    // status ? setEditorContent()
    setLoading(false);
  }

  return (
    <Box
      id='editor-container'
      position='relative'
      ref={refEditor}
      onBlur={handleBlur}
    >
      <CKEditor
          editor={ ClassicEditor }
          data={ editorContent }
          onChange={ ( event, editor ) => {
              const data = editor.getData();
              handleChange(data);
          }}
          {...loading && {
            disabled: true
          }}
      />
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

export default Editor;