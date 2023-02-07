import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CachedIcon from '@mui/icons-material/Cached';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

export const statu = [
    {
        name: 'Not Started',
        icon: <AccessTimeOutlinedIcon />
    },
    {
        name: 'In Progress',
        icon: <CachedIcon />
    },
    {
        name: 'Completed',
        icon: <CheckOutlinedIcon />
    }
]

export const status = {
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