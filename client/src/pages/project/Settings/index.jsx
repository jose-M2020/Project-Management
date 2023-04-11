import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { 
  Box,
  Stack,
  Chip,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography, 
  IconButton,
  Fab,
  useTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import GroupIcon from '@mui/icons-material/Group';
import ReportIcon from '@mui/icons-material/Report';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/Header';
import Spinner from '../../../components/Spinner';
import CustomButton from '../../../components/CustomButton';
import CustomModal from '../../../components/CustomModal';
import DeleteIcon from '@mui/icons-material/Delete';
import { GET_PROJECT } from '../../../graphql/queries/projectQueries';
import { DELETE_PROJECT, UPDATE_PROJECT } from '../../../graphql/mutations/projectMutations';
import ProfileRow from '../../../components/ProfileRow';
import useAsyncAutocomplete from '../../../hooks/useAsyncAutocomplete';
import { GET_DEVNAMES } from '../../../graphql/queries/devsQueries';
import { GET_CLIENTNAMES } from '../../../graphql/queries/clientQueries';
import Dropdown from '../../../components/Dropdown';
import AutoComplete from '../../../components/form/AutoComplete';
import { tokens } from '../../../theme';
import EditInput from '../../../components/form/EditInput';
import { projectStatus, tagsOptions } from '../../../data';
import { hexToRgba } from '../../../helpers/colors';

const SettingSection = ({title, icon, children}) => (
  <Box>
    <Divider />              
    <Grid container mt={1}>
      <Grid 
        item 
        xs={12} 
        md={3}
      >
        <Box
          sx={{ 
            mb: {xs: 3, md: 0},
            position: 'sticky',
            top: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          {icon}
          <Typography
            variant="h4" 
          >
            { title }
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={9}>
        { children }
      </Grid>
    </Grid>
  </Box>
)

const Settings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { loading, error, data } = useQuery(
    GET_PROJECT,
    { variables: { id } }
  );
  const [open, setOpen] = useState(false);
  const [usersInput, setUsersInput] = useState({
    client: null,
    team: [],
  });
  
  const [
    deleteProject,
    {loading: deleting }
  ] = useMutation(DELETE_PROJECT, {
    refetchQueries: ["getProjects"],
  });
        
  const [updateProject] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [{ 
      query: GET_PROJECT, variables: { id: data?.project?._id } 
    }],
  });

  const {
    data: devData,
    loading: loadingDevs,
    open: devFieldOpen,
    setOpen: setOpenDev
  } = useAsyncAutocomplete(GET_DEVNAMES);
  
  const {
    data: clientData,
    loading: loadingClients,
    open: clientFieldOpen,
    setOpen: setOpenClient
  } = useAsyncAutocomplete(GET_CLIENTNAMES);


  const [filteredDevs, setFilteredDevs] = useState([])
  useEffect(() => {
    console.log('filtering devs')
    if(devData?.developers?.length){
      const devId = (data?.project?.team).map(item => (
        item._id
      ))
      
      const newDevs = devData.developers.filter(item => (
        !devId.includes(item._id)
      ));

      setFilteredDevs(newDevs);
      console.log(newDevs);
    }
  }, [data, loadingDevs])


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

  const handelEdit = async (value, name) => {
    if(name === 'tags'){
      value = value.map(tag => tag.value);
    }

    await updateProject({variables: {
      _id: data?.project?._id,
      [name]: value
    }});

    return true;
  }

  return (
    <Box m="20px">
      <Header title="PROJECT SETTINGS" subtitle="Details project" />
      {loading ? (
        <Spinner />
      ) : (
        <Box>
          <CustomButton text='BACK' link='/projects' />
          <Stack spacing={3} mt={4} >
            <SettingSection title='General' icon={<DocumentScannerIcon />}>
              <Stack spacing={3} mb={5}>
                <EditInput
                  name='name'
                  label='Name'
                  value={data?.project?.name}
                  onAccept={handelEdit}
                />
                <EditInput
                  name='description'
                  label='Description'
                  value={data?.project?.description}
                  onAccept={handelEdit}
                  multiline
                  rows={4}
                />
                <EditInput
                  name='type'
                  label='Type'
                  value={data?.project?.type}
                  onAccept={handelEdit}
                />
                <EditInput
                  name='tags'
                  label='Tags'
                  options={tagsOptions.filter(
                    tag => !(data?.project?.tags).includes(tag?.value)
                  )}
                  value={data?.project?.tags}
                  onAccept={handelEdit}
                  multiple
                  freeSolo
                />
                {/* <AutoComplete 
                  label="Tags" 
                  name="tags"
                  options={['JS', 'Angular', 'React']}
                  multiple
                  freeSolo
                /> */}
                {/* <Box display="flex" gap={1} mb={2}>
                  {projectData?.tags?.map( (item, i) => (
                    <Chip key={i} label={item} variant="outlined" color="secondary" />
                  ))}
                </Box> */}
              </Stack>
              {/* <ClientInfo client={projectData.client} /> */}

              {/* <EditProjectForm project={projectData} />

              <DeleteProjectButton projectId={projectData.id} /> */}
            </SettingSection>
            <SettingSection title='Links' icon={<AttachFileIcon />}>
              <Stack spacing={3} mb={5}>
                <EditInput
                  name='repository'
                  label='Repository'
                  value={data?.project?.repository}
                  onAccept={handelEdit}
                />
                <EditInput
                  name='url'
                  label='URL'
                  value={data?.project?.url}
                  onAccept={handelEdit}
                />
              </Stack>
            </SettingSection>
            <SettingSection title='Members' icon={<GroupIcon />}>
              <Box 
                bgcolor={hexToRgba(colors.blueAccent[700], .1)}
                mb={2}
                padding={2}
                borderRadius={2}
              >
                <Typography mb={2}>Client</Typography>
                <Box display='flex' justifyContent='space-between' >
                  {data?.project?.client && (
                    <ProfileRow user={data?.project.client} />
                  )}
                  <Dropdown
                    button={<CustomButton text='Change client' />}
                    width='250px'
                  >
                    <AutoComplete 
                      label="Client" 
                      name="clientId"
                      value={usersInput.client}
                      options={clientData?.clients?.filter(item => (
                        item._id !== data?.project?.client?._id
                      ))}
                      setLabel={(option) => `${option?.firstname} ${option?.lastname}`}
                      valueField='_id'
                      async={true}
                      open={clientFieldOpen}
                      setOpen={setOpenClient}
                      loading={loadingClients}
                      onChange={ (_, value) => (
                        setUsersInput({...usersInput, client: value || null})
                      )}
                    />
                    <Box mt={1}>
                      <CustomButton 
                        text='OK'
                        size='small'
                        onClick={() => {
                          if(!usersInput.client) return;
                          handelEdit(usersInput.client._id, 'clientId')
                          setUsersInput({...usersInput, client: null})
                        }}
                      />
                    </Box>
                  </Dropdown>
                </Box>
              </Box>
              <Stack 
                spacing={2} 
                bgcolor={hexToRgba(colors.blueAccent[700], .1)}
                mt={2}
                padding={2}
                borderRadius={2}
              >
                <Box display='flex' justifyContent='space-between' alignItems='center' >
                  <Typography mb={1}>Developers</Typography>
                  <Dropdown 
                    button={
                      <Fab size="small" color="secondary" aria-label="add">
                        <AddIcon />
                      </Fab>
                    }
                    width='250px'
                  >
                    <AutoComplete 
                      label="Team" 
                      name="team"
                      value={usersInput.team}
                      options={filteredDevs}
                      setLabel={(option) => `${option?.firstname} ${option?.lastname}`}
                      valueField='_id'
                      multiple
                      async={true}
                      open={devFieldOpen}
                      setOpen={setOpenDev}
                      loading={loadingDevs}
                      onChange={ (_, value) => (
                        setUsersInput({...usersInput, team: value || []})
                      )}
                    />
                    <Box mt={1}>
                      <CustomButton 
                        text='Add members'
                        size='small'
                        onClick={() => {
                          if(!usersInput?.team?.length) return;

                          handelEdit(
                            [
                              ...(data?.project?.team.reduce((acc, user) => [...acc, user._id], [])),
                              ...(usersInput.team.reduce((acc, user) => [...acc, user._id], []))
                            ],
                            'team'
                          )
                          setUsersInput({...usersInput, team: []})
                        }}
                      />
                    </Box>
                  </Dropdown>
                </Box>
                {data?.project?.team.length ? (
                  (data?.project?.team).map( (item, i) => (
                    <Box key={i} display='flex' alignItems='center' justifyContent='space-between'>
                      <ProfileRow user={item} />  
                      <IconButton
                        onClick={() => {
                          const filteredDevs = (data?.project.team)
                                                .filter(dev => dev._id !== item._id)
                                                .map(item => item._id)
                          handelEdit(filteredDevs, 'team');
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))
                ) : (
                  <Typography>No collaborator</Typography>
                )}
              </Stack>
            </SettingSection>
            <SettingSection title='Danger zone' icon={<ReportIcon />}>
              <Stack spacing={2}>
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                  <Box>
                    <Typography variant='h5' fontWeight='bold'>Change Status</Typography>
                    <Typography>Change the project status</Typography>
                  </Box>
                  <TextField
                    select
                    defaultValue={data?.project?.status}
                    onChange={handleStatusChange}
                  >
                    {(Object.keys(projectStatus)).map((key, index) => (
                      <MenuItem key={index} value={key} >
                        <Box display='flex'>
                          {projectStatus[key].icon}
                          <Typography variant='span' ml='3px'>{projectStatus[key].name}</Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </TextField>
                  {/* <Select
                    defaultValue={data?.project.status}
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
                {/* <Box display='flex' justifyContent='space-between' alignItems='center'>
                  <Box>
                    <Typography variant='h5' fontWeight='bold'>Edit</Typography>
                    <Typography>Change the project status</Typography>
                  </Box>
                  <CustomButton
                    text='Edit Project'
                    component={Link} to={`/projects/${data?.project._id}/edit`}
                    btnstyle="primary"
                  />
                </Box> */}
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                  <Box>
                    <Typography variant='h5' fontWeight='bold'>Delete</Typography>
                    <Typography>This action will permanently delete the current project and all associated data</Typography>
                  </Box>
                  <CustomButton
                    text='Delete Project'
                    btnstyle='danger'
                    onClick={handleModal}
                  />
                  <CustomModal
                    open={open}
                    handleClose={handleModal}
                  >
                    <Box mb={2}>
                      <Typography variant="h4" component="h2" mb={1}>
                        Are you sure you want to delete<b> {data?.project?.name}</b>?
                      </Typography>
                      <Typography variant="span">
                        This action cannot be undone. Please confirm your decision before proceeding.
                      </Typography>
                    </Box>
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
            </SettingSection>
          </Stack>
        </Box>
      )}
    </Box>
  )
};

export default Settings;