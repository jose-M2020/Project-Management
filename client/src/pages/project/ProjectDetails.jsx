import { useQuery } from '@apollo/client';
import { Box, Chip, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CachedIcon from '@mui/icons-material/Cached';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import ClientInfo from '../../components/ClientInfo';
import { GET_PROJECT } from '../../graphql/queries/projectQueries';
import CircularProgressWithLabel from '../../components/project/CircularProgressWithLabel';
import { status } from '../../helpers/helpers';

const ProjectDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

  if (error) return <p>Something Went Wrong</p>;

  return (
    <Box m="20px">
      <Header title="DETAILS PROJECT" subtitle="Details project" />
      {loading ? (
        <Spinner />
      ) : (
        <Box>
          <Link to='/projects' className='btn btn-light btn-sm w-25 d-inline ms-auto'>
            Back
          </Link>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <CircularProgressWithLabel 
                label="Task completed"
                progress="44"
                marginBottom={3}
              />
              <Typography variant="h3">Tasks</Typography>
              <Divider />
              <Box>
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <HourglassEmptyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Not done" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <CachedIcon />
                    </ListItemIcon>
                    <ListItemText primary="In progress" />
                  </ListItemButton>
                </ListItem>
              </List>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box>
                <Box mb={5}>
                  <Box display='flex' alignItems='center'>
                    <Typography variant='h1' mb={2}>{data.project.name}</Typography>
                    <Box>{status[data.project.status].icon} {data.project.status}</Box>
                  </Box>
                  <Box display="flex" gap={1}>
                    {data.project?.tags?.map( (item, i) => (
                      <Chip key={i} label={item} variant="outlined" color="secondary" />
                    ))}
                  </Box>
                  <p>{data.project.description}</p>

                  <h5 className='mt-3'>Project Status</h5>
                  <p className='lead'>{data.project.status}</p>
                </Box>
                <Box mb={5}>
                  <Typography variant="h3">Collaborators</Typography>
                  <Divider />
                </Box>
                <Box>
                  <Typography variant="h3">Actions</Typography>
                  <Divider />
                </Box>
                {/* <ClientInfo client={data.project.client} /> */}

                {/* <EditProjectForm project={data.project} />

                <DeleteProjectButton projectId={data.project.id} /> */}
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  )
};

export default ProjectDetails;