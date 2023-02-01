import { Box, Button, Card, CardActions, CardContent, IconButton, Typography, useTheme } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from "react-router-dom";
import { tokens } from "../theme";

export default function ProjectCard({ project }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
          backgroundColor: colors.primary[400],
          boxShadow: `1px 1px 5px ${colors.blueAccent[300]}`,
          display: 'flex', 
          justifyContent: 'space-between', 
          alignContent: 'center', 
          maxWidth: 400
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {project.name}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" component="div">
              Status: <strong>{project.status}</strong>
            </Typography>
          </CardContent>
          
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton href={`/projects/${project.id}`}>
            <VisibilityIcon />
          </IconButton>
          {/* <CardActions>
            <Button href={`/projects/${project.id}`} size="small"><VisibilityIcon /></Button>
          </CardActions> */}
        </Box>
      </Card>
    );
  }