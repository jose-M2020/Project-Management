import { Box, Button, Card, CardActions, CardContent, Chip, IconButton, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { format } from 'date-fns'
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function ProjectCard({ project }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dropdownOptions = [
    {
      name: ' ver',
      redirect: `/projects/${project._id}`
    },
    {
      name: 'Editar'
    },
    {
      name: 'Eliminar'
    }
  ]
   
  return (
      // <div className='col-md-6'>
      //   <div className='card mb-3'>
      //     <div className='card-body'>
      //       <div className='d-flex justify-content-between align-items-center'>
      //         <h5 className='card-title'>{project.name}</h5>
  
      //         <a className='btn btn-light' href={`/projects/${project.id}`}>
      //           View
      //         </a>
      //       </div>
      //       <p className='small'>
      //         Status: <strong>{project.status}</strong>
      //       </p>
      //     </div>
      //   </div>
      // </div>

      <Card 
        sx={{ 
          backgroundColor: colors.primary[500],
          boxShadow: `1px 1px 4px ${colors.blueAccent[300]}`,
          maxWidth: 500,
          height: '100%',
          marginX: 'auto'
        }}
      >
        <Box >
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: '1 0 auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '5px'}}>
              <Typography component='div' variant="subtitle2">
                {format(+project?.createdAt, 'MM/dd/yyyy')}
              </Typography>
              <div>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  {dropdownOptions.map((option) => (
                    <MenuItem 
                      key={option.name} 
                      onClick={handleClose} 
                      {...(option?.redirect && {
                        component: Link,
                        to: option.redirect
                      })}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </Box>
            <Box>
              <Typography component="div" variant="h4">
                {project.name}
              </Typography>
              <Typography component="div" variant="h5">
                {project.description}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" component="div">
                Status: <strong>{project.status}</strong>
              </Typography>
            </Box>
            <Box display="flex" gap={1}>
              {project?.tags?.map( (item, i) => (
                <Chip key={i} label={item} variant="outlined" color="secondary" />
              ))}
            </Box>
          </CardContent>
        </Box>
        {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton href={`/projects/${project.id}`}>
            <VisibilityIcon />
          </IconButton>
          <CardActions>
            <Button href={`/projects/${project.id}`} size="small"><VisibilityIcon /></Button>
          </CardActions>
        </Box> */}
      </Card>
    );
  }