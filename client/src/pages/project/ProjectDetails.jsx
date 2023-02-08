import { useQuery } from '@apollo/client';
import { Box, Chip, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CachedIcon from '@mui/icons-material/Cached';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import ClientInfo from '../../components/ClientInfo';
import { GET_PROJECT } from '../../graphql/queries/projectQueries';
import CircularProgressWithLabel from '../../components/project/CircularProgressWithLabel';
import { status, statusIcon } from '../../helpers/helpers';
import CustomButton from '../../components/CustomButton';
import Input from '../../components/form/Input';

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
                progress={44}
                marginBottom={3}
              />
              <Typography variant="h3">Tasks</Typography>
              <Divider />
              <Box>
                <List>
                  {data.project.tasks.lenght ? (
                    (data.project.tasks).map( (item, i) => (
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            {statusIcon[item.title].icon}
                          </ListItemIcon>
                          <ListItemText primary={item.title} />
                        </ListItemButton>
                      </ListItem>
                    ))
                  ) : (
                    <Typography>No Tasks</Typography>
                  )}                
                </List>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box>
                <Box mb={5}>
                  <Box display='flex' alignItems='center'>
                    <Typography variant='h1' mb={2}>{data.project.name}</Typography>
                    <Box>{statusIcon[data.project.status].icon} {data.project.status}</Box>
                  </Box>
                  <Box display="flex" gap={1} mb={2}>
                    {data.project?.tags?.map( (item, i) => (
                      <Chip key={i} label={item} variant="outlined" color="secondary" />
                    ))}
                  </Box>
                  <Typography mb={2}>{data.project.description}</Typography>
                  <Typography mb={2}>Type: {data.project.type}</Typography>
                  {data.project.client && (
                    <Typography mb={2}>
                      Client: {data.project.client.firstname} {data.project.client.lastname}
                    </Typography>
                  )}
                  
                  <Typography mb={2}>Repository: {data.project?.repository}</Typography>
                  <Typography mb={2}>URL: {data.project?.url}</Typography>
                </Box>
                <Box mb={5}>
                  <Typography variant="h3">Collaborators</Typography>
                  <Divider />
                  <Box mt={2}>
                    {data.project.team.lenght ? (
                      (data.project.team).map( (item, i) => (
                        <Box>
                          {item.firsname} {item.lastname}
                        </Box>
                      ))
                    ) : (
                      <Typography>No collaborator</Typography>
                    )}
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h3">Actions</Typography>
                  <Divider />
                  <Box mt={2} display='flex' justifyContent='space-between' alignItems='center'>
                    <Box>
                      <Typography variant='h5' fontWeight='bold'>Change Status</Typography>
                      <Typography>Change the project status</Typography>
                    </Box>
                    <TextField
                      select
                      defaultValue={data.project.status}
                    >
                      {status.map((option) => (
                        <MenuItem key={option.name} value={option.name} display='flex' alignItems='center' >
                          {option.icon({mr: '22px'})}
                          <Typography variant='span'>{option.name}</Typography>
                        </MenuItem>
                      ))}
                    </TextField>

                    {/* <Select
                      defaultValue={data.project.status}
                      labelId="demo-simple-select-error-label"
                      id="demo-simple-select-error"
                      label="Age"
                      renderValue={(value) => `${statusIcon[value].icon} ${value}`}
                    >
                      {status.map((option) => (
                        <MenuItem key={option.name} value={option.name} >
                          {option.icon({mr: '22px'})} {option.name}
                        </MenuItem>
                      ))}
                    </Select> */}
                  </Box>
                  <Box mt={2} display='flex' justifyContent='space-between' alignItems='center'>
                    <Box>
                      <Typography variant='h5' fontWeight='bold'>Edit</Typography>
                      <Typography>Change the project status</Typography>
                    </Box>
                    <CustomButton
                      text='Edit Project'
                      component={Link} to={`/projects/${data.project._id}/edit`}
                      btnstyle="primary"
                    />
                  </Box>
                  <Box mt={2} display='flex' justifyContent='space-between' alignItems='center'>
                    <Box>
                      <Typography variant='h5' fontWeight='bold'>Delete</Typography>
                      <Typography>Change the project status</Typography>
                    </Box>
                    <CustomButton
                      text='Delete Project'
                      btnstyle="primary"
                    />
                  </Box>
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