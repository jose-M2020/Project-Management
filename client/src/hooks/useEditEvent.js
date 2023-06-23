import { useState } from "react";
import { arraysEqual } from "../helpers/array";

const useEditEvent = ({
  value,
  onAccept,
  fieldName
}) => {
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
    const status = await onAccept(inputValue, fieldName);
    // status ? setInputValue()
    setLoading(false);
  }
  return {
    loading,
    inputValue,
    activeEdit,
    handleChange,
    handleBlur,
    handleClickAccept
  }
}

export default useEditEvent;
