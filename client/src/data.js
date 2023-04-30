import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CachedIcon from '@mui/icons-material/Cached';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

export const projectStatus = {
  'Not Started': {
    id: 1,
    name: 'Not Started',
    icon: <AccessTimeOutlinedIcon />
  },
  'In Progress': {
    id: 2,
    name: 'In Progress',
    icon: <CachedIcon />
  },
  'Completed': {
    id: 3,
    name: 'Completed',
    icon: <CheckOutlinedIcon />
  },
}

export const tagsOptions = [
  { label: 'HTML', value: 'HTML' },
  { label: 'CSS', value: 'CSS' },
  { label: 'JavaScript', value: 'JavaScript' },
  { label: 'ReactJS', value: 'ReactJS' },
  { label: 'Angular', value: 'Angular' },
  { label: 'Vue', value: 'Vue' },
  { label: 'Flutter', value: 'Flutter' },
  { label: 'Ionic', value: 'Ionic' },
  { label: 'Tailwind CSS', value: 'Tailwind CSS' },
  { label: 'Bootstrap', value: 'Bootstrap' },
  { label: 'MUI', value: 'MUI' },
  { label: 'PHP', value: 'PHP' },
  { label: 'Java', value: 'Java' },
  { label: 'NodeJS', value: 'NodeJS' },
  { label: 'Python', value: 'Python' },
  { label: 'Laravel', value: 'Laravel' },
  { label: 'GraphQL', value: 'GraphQL' },
  { label: 'MongoDB', value: 'MongoDB' },
  { label: 'MySQL', value: 'MySQL' },
  { label: 'MERN Stack', value: 'MERN Stack' },
  { label: 'MEAN Stack', value: 'MEAN Stack' },
]