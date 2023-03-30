import { formatDate } from '@fullcalendar/core';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CachedIcon from '@mui/icons-material/Cached';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

export const status = [
    {
        name: 'Not Started',
        icon: (props) => (
          <AccessTimeOutlinedIcon {...props}/>
        )
    },
    {
        name: 'In Progress',
        icon: (props) => (
            <CachedIcon {...props}/>
          )
    },
    {
        name: 'Completed',
        icon: (props) => (
            <CheckOutlinedIcon {...props}/>
          )
    }
]

export const statusIcon = {
    'Not Started': {
        icon: <AccessTimeOutlinedIcon />
    },
    'In Progress': {
        icon: <CachedIcon />
    },
    'Completed': {
        icon: <CheckOutlinedIcon />
    },
}

export const taskPriority = {

}

export const formatDateTime = (date, showTime = true) => {
  // const dateFormat = +date ? (new Date(+date)).toDateString() : date;
  
  return formatDate(date, {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...((showTime && date?.includes('T')) && (
      {
        hour: "numeric",
        minute: 'numeric'
      }
    ))
  })
}

export const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const sleep = (delay = 0) => {
  return new Promise( resolve => {
    setTimeout(resolve, delay);
  });
}