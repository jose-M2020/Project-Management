import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { 
  Box,
  Stack,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import ReportIcon from '@mui/icons-material/Report';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useNavigate, useParams } from 'react-router-dom';
import { Toaster, toast } from 'sonner'
import Header from '../../../../components/Header';
import CustomButton from '../../../../components/CustomButton';
import CustomModal from '../../../../components/CustomModal';
import { GET_PROJECT } from '../../../../graphql/queries/projectQueries';
import { DELETE_PROJECT, UPDATE_PROJECT } from '../../../../graphql/mutations/projectMutations';
import EditInput from '../../../../components/form/EditInput';
import { projectStatus, tagsOptions } from '../../../../data';
import SettingSection from './SettingSection';
import ProjectUsers from './ProjectUsers';

const SettingsContainer = ({projectData}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [open, setOpen] = useState(false);
  
  const [data, setData] = useState(projectData)
  
  useEffect(() => {
    setData(projectData)
  }, [projectData])
  

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

  const handleUpdate = async (value, name) => {
    if(name === 'tags'){
      value = value.map(tag => tag.value);
    }

    const res = await updateProject({variables: {
      _id: data?.project?._id,
      [name]: value
    }});
    toast.success(`${name} updated!`)

    return res;
  }

  // TODO: Problems when updateing tags
  return (
    <Box m="20px">
      <Toaster />
      <Header title="PROJECT SETTINGS" subtitle="Details project" />
        <Box>
          <CustomButton text='BACK' link='/projects' />
          <Stack spacing={3} mt={4} >
            <SettingSection title='General' icon={<DocumentScannerIcon />}>
              <Stack spacing={3} mb={5}>
                <EditInput
                  name='name'
                  label='Name'
                  value={data?.project?.name}
                  onAccept={handleUpdate}
                />
                <EditInput
                  name='description'
                  label='Description'
                  value={data?.project?.description}
                  onAccept={handleUpdate}
                  multiline
                  rows={4}
                />
                <EditInput
                  name='type'
                  label='Type'
                  value={data?.project?.type}
                  onAccept={handleUpdate}
                />
                <EditInput
                  name='tags'
                  label='Tags'
                  options={tagsOptions.filter(
                    tag => !(data?.project?.tags).includes(tag?.value)
                  )}
                  value={data?.project?.tags}
                  onAccept={handleUpdate}
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
                  onAccept={handleUpdate}
                />
                <EditInput
                  name='url'
                  label='URL'
                  value={data?.project?.url}
                  onAccept={handleUpdate}
                />
              </Stack>
            </SettingSection>
            <ProjectUsers
              team={data?.project?.team}
              client={data?.project?.client}
              projectId={id}
            />
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
    </Box>
  )
};

export default SettingsContainer;