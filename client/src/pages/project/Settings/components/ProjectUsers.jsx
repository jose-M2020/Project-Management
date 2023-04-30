import { useState } from 'react';
import { Box, Fab, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { useMutation } from '@apollo/client';
import GroupIcon from '@mui/icons-material/Group';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import useAsyncAutocomplete from '../../../../hooks/useAsyncAutocomplete';
import { GET_DEVNAMES } from '../../../../graphql/queries/devsQueries';
import { GET_CLIENTNAMES } from '../../../../graphql/queries/clientQueries';
import SettingSection from './SettingSection';
import { hexToRgba } from '../../../../helpers/colors';
import { tokens } from '../../../../theme';
import AutoComplete from '../../../../components/form/AutoComplete';
import Dropdown from '../../../../components/Dropdown';
import CustomButton from '../../../../components/CustomButton';
import ProfileRow from '../../../../components/user/ProfileRow';
import { UPDATE_PROJECT } from '../../../../graphql/mutations/projectMutations';
import { GET_PROJECT } from '../../../../graphql/queries/projectQueries';
import useFilterStoredData from '../../../../hooks/useFilterStoredData';

function ProjectUsers({members, client, projectId}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [usersInput, setUsersInput] = useState({
    client: null,
    members: [],
  });

  // GraphQL
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
  
  const [updateProject] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [{ 
      query: GET_PROJECT, variables: { id: projectId } 
    }],
  });

  const filteredDevs = useFilterStoredData(members, devData?.developers)
  
  // Other functions

  const handleEdit = async (value, name) => {
    if(name === 'tags'){
      value = value.map(tag => tag.value);
    }

    await updateProject({variables: {
      _id: projectId,
      [name]: value
    }});

    return true;
  }
  
  return (
    <SettingSection title='Members' icon={<GroupIcon />}>
      <Box 
        bgcolor={hexToRgba(colors.blueAccent[700], .1)}
        mb={2}
        padding={2}
        borderRadius={2}
      >
        <Typography mb={2}>Client</Typography>
        <Box display='flex' justifyContent='space-between' >
          {client && (
            <ProfileRow user={client} />
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
                item._id !== client?._id
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
                  handleEdit(usersInput.client._id, 'clientId')
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
              label="members" 
              name="members"
              value={usersInput.members}
              options={filteredDevs}
              setLabel={(option) => `${option?.firstname} ${option?.lastname}`}
              valueField='_id'
              multiple
              async={true}
              open={devFieldOpen}
              setOpen={setOpenDev}
              loading={loadingDevs}
              onChange={ (_, value) => (
                setUsersInput({...usersInput, members: value || []})
              )}
            />
            <Box mt={1}>
              <CustomButton 
                text='Add members'
                size='small'
                onClick={() => {
                  if(!usersInput?.members?.length) return;
                  handleEdit(
                    [
                      ...(members.reduce((acc, user) => [...acc, user._id], [])),
                      ...(usersInput.members.reduce((acc, user) => [...acc, user._id], []))
                    ],
                    'team'
                  )
                  setUsersInput({...usersInput, members: []})
                }}
              />
            </Box>
          </Dropdown>
        </Box>
        {members?.length ? (
          members.map( (item, i) => (
            <Box key={i} display='flex' alignItems='center' justifyContent='space-between'>
              <ProfileRow user={item} />  
              <IconButton
                onClick={() => {
                  const filteredDevs = members.filter(dev => dev._id !== item._id)
                                           .map(item => item._id)
                  handleEdit(filteredDevs, 'team');
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
  )
}

export default ProjectUsers