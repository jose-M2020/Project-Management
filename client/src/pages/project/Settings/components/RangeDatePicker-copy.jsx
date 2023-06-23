import { Box, TextField } from "@mui/material";
import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EditInput from "../../../../components/form/EditInput";
import { formatDateTime } from "../../../../helpers/dateTime";

const RangeDatePicker = ({ update, projectDuration }) => {
  const [startDate, setStartDate] = useState(new Date(+(projectDuration[0])));
  const [endDate, setEndDate] = useState(new Date (+(projectDuration[1])));
  const [checkChanges, setCheckChanges] = useState(false);

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    // <TextField
    //   value={value}
    //   variant='outlined'
    //   onFocus={onClick}
    //   // helperText={(meta.touched && meta.error) && meta.error}
    //   // error={meta.touched && !!(meta.error)}
    //   {...props}
    // />
    <EditInput
      value={() => formatDateTime(+projectDuration[0], false)}
      changes={{
        check: checkChanges,
        value: value
      }}
      variant='outlined'
      onFocus={onClick}
      onAccept={update}
      // changes={{
      //   check: checkChanges,
      //   value: value
      // }}
    />
  ));
  
  return (
    <Box display='flex' gap={2} alignItems='center'>
      <DatePicker
      // dateFormat="yyyy/MM/dd"
        selected={startDate}
        onChange={(date) => {
          setCheckChanges(true)
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
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        customInput={<ExampleCustomInput label="End date" pos={1} />}
      />
    </Box>
  )
}

export default RangeDatePicker