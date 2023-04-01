const useSetFormikValue = (value, valueField) => {
  return (
    value.map(item => (
      (typeof item === 'string') ? item : (item[valueField])
    ))
  )

// setFieldValue(props.name, val);
}

export default useSetFormikValue;