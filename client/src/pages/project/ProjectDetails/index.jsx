import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { 
  Box,
  Stack,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField,
  Typography 
} from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/Header';
import Spinner from '../../../components/Spinner';
import CustomButton from '../../../components/CustomButton';
import CustomModal from '../../../components/CustomModal';
import CircularProgressWithLabel from './components/CircularProgressWithLabel';
import { status, statusIcon } from '../../../helpers/helpers';
import { GET_PROJECT } from '../../../graphql/queries/projectQueries';
import { CHANGE_STATUS, DELETE_PROJECT } from '../../../graphql/mutations/projectMutations';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });
  const [open, setOpen] = useState(false);
  const [deleteProject, { loading: deleting, error: deleteError }] =
      useMutation(DELETE_PROJECT, {
        refetchQueries: ["getProjects"],
      });
      
  const [updateProject] = useMutation(CHANGE_STATUS, {
    refetchQueries: [{ 
      query: GET_PROJECT, variables: { id: data?.project?._id } 
    }],
  });

  if (error) return <p>Something Went Wrong</p>;
  
  const handleModal = () => setOpen(!open);

  const handleDelete = async (e) => {
    e.preventDefault();

    const result = await deleteProject({
			variables: { id },
		});
		if (result.data.deleteProject._id) {
			navigate('/projects');
      console.log('redirecting to')
		}  
  }

  const handleStatusChange = (e) => {
    const {target: {value}} = e;
    
    updateProject({variables: {
      _id: data?.project?._id,
      status: value
    }});
  }

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
                    {data?.project?.team.length ? (
                      (data?.project?.team).map( (item, i) => (
                        <Box key={i}>
                          <Typography>{item?.firstname} {item?.lastname}</Typography>
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
                  <Stack spacing={2}>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                      <Box>
                        <Typography variant='h5' fontWeight='bold'>Change Status</Typography>
                        <Typography>Change the project status</Typography>
                      </Box>
                      <TextField
                        select
                        defaultValue={data.project.status}
                        onChange={handleStatusChange}
                      >
                        {status.map((option) => (
                          <MenuItem key={option.name} value={option.name} >
                            <Box display='flex'>
                              {option.icon()}
                              <Typography variant='span' ml='3px'>{option.name}</Typography>
                            </Box>
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
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
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
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                      <Box>
                        <Typography variant='h5' fontWeight='bold'>Delete</Typography>
                        <Typography>Change the project status</Typography>
                      </Box>
                      <CustomButton
                        text='Delete Project'
                        btnstyle='danger'
                        onClick={handleModal}
                      />
                      <CustomModal
                        title='Are you sure you want to delete this project?'
                        subtitle='This repository will permanently delete with related tasks and events.'
                        open={open}
                        handleClose={handleModal}
                      >
                        <form onSubmit={handleDelete}>
                          <Box display='flex' justifyContent='end'>
                            <CustomButton
                              text='Accept'
                              btnstyle='danger'
                              type='submit'
                              loading={deleting}
                            />
                          </Box>
                        </form>
                      </CustomModal>
                    </Box>
                  </Stack>
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