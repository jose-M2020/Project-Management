import { Box, TextField, Typography, useTheme } from "@mui/material";
import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import { formatDateTime } from "../../../../helpers/dateTime";
import useEditEvent from "../../../../hooks/useEditEvent";
import EditInput from "../../../../components/form/EditInput";
import CustomButton from "../../../../components/CustomButton";
import { tokens } from "../../../../theme";

const RangeDatePicker = ({ update, projectDuration }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [startDate, setStartDate] = useState(projectDuration.length && new Date(+(projectDuration[0])));
  const [endDate, setEndDate] = useState(projectDuration.length && new Date(+(projectDuration[1])));

  const {
    loading,
    inputValue,
    activeEdit,
    handleChange,
    handleBlur,
    handleClickAccept
  } = useEditEvent({
    fieldName: 'duration',
    value: projectDuration,
    onAccept: update
  });
  
  const onChange = (dates) => {
    const [start, end] = dates;
    handleChange(dates)
    setStartDate(start);
    setEndDate(end);
  }

  // const ExampleCustomInput = forwardRef(({ value, onClick }, ref, ...props) => (
  //   <TextField
  //     value={inputValue}
  //     variant='outlined'
  //     onFocus={onClick}
  //     // helperText={(meta.touched && meta.error) && meta.error}
  //     // error={meta.touched && !!(meta.error)}
  //     {...loading && {
  //       disabled: true
  //     }}
  //     {...props}
  //   />

  //   // <EditInput
  //   //   value={() => projectDuration.length && formatDateTime(+projectDuration[0], false)}
  //   //   changes={{
  //   //     check: checkChanges,
  //   //     value: value
  //   //   }}
  //   //   variant='outlined'
  //   //   onFocus={onClick}
  //   //   onAccept={update}
  //   // />
  // ));

  return (
    <Box position='relative' onBlur={handleBlur}>
      {/* <Box display='flex' gap={2} alignItems='center'>
        <DatePicker
        // dateFormat="yyyy/MM/dd"
          selected={startDate}
          onChange={(date) => {
            handleChange(date)
            setStartDate(date)
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          customInput={<ExampleCustomInput label="Start date" pos={0}  />}
        />
        <span>-</span>
        <DatePicker
          selected={endDate}
          onChange={(date) => {
            handleChange(date);
            setEndDate(date)
          }}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          customInput={<ExampleCustomInput label="End date" pos={1} />}
        />
      </Box> */}
      <Box mb={1}>
        <Typography color={colors.primary[200]}>Duration</Typography>
        <Typography>{formatDateTime(+inputValue[0], false)} - {formatDateTime(+inputValue[1], false)}</Typography>
      </Box>
      <Box 
        sx={{
          pointerEvents: loading ? 'none' : 'auto',
          '& .react-datepicker__month-container': {
            bgcolor: colors.primary[400],
          },       
          '& .react-datepicker__header': {
            bgcolor: colors.primary[500],
            color: colors.primary[100]
          },
          '& .react-datepicker__current-month,  .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name': {
            color: colors.primary[100]
          },
          '& .react-datepicker__day--in-range': {
            bgcolor: colors.blueAccent[700]
          },
          '& .react-datepicker__day:hover': {
            bgcolor: colors.blueAccent[500]
          }
        }}
      >
      {/* TODO: Restart the previous value (in selected, startDate, endDate) when blur outside de box  */}
        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
      </Box>
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

export default RangeDatePicker