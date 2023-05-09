import { useState } from 'react'
import { Box, Fab, IconButton, Typography, useTheme } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Dropdown from '../../../../../../components/Dropdown';
import AutoComplete from '../../../../../../components/form/AutoComplete';
import ProfileRow from '../../../../../../components/user/ProfileRow';
import { tokens } from '../../../../../../theme';
import useAsyncAutocomplete from '../../../../../../hooks/useAsyncAutocomplete';
import { GET_DEVNAMES } from '../../../../../../graphql/queries/devsQueries';
import { UPDATE_TASK } from '../../../../../../graphql/mutations/taskMutations';
import { useMutation } from '@apollo/client';
import { GET_BOARDBYPROJECT } from '../../../../../../graphql/queries/boardQueries';
import CustomButton from '../../../../../../components/CustomButton';
import useFilterStoredData from '../../../../../../hooks/useFilterStoredData';
import { useBoard } from '../../../context/BoardContext';

const TaskDetails = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [members, setMembers] = useState(data?.members ?? [])
  const { projectId } = useBoard();
  const [membersInput, setMembersInput] = useState([]);

  const {
    data: devData,
    loading: loadingDevs,
    open: devFieldOpen,
    setOpen: setOpenDev
  } = useAsyncAutocomplete(GET_DEVNAMES);

  const [ updateTask ] = useMutation(UPDATE_TASK, {
    refetchQueries: [{ 
      query: GET_BOARDBYPROJECT, variables: { projectId } 
    }]
  });
  
  const filteredDevs = useFilterStoredData(members, devData?.developers);

  const handleAddUser = () => {
    if(!membersInput.length) return;

    const newMembers = [
      ...(members),
      ...(membersInput)
    ]
    setMembers(newMembers);

    updateTask({variables: {
      _id: data._id,
      members: newMembers.map(item => item._id )
    }});

    setMembersInput([])
  }
  
  const handleRemoveUser = (id) => {
    const newMembers = [...members].filter(item => item._id !== id);
    setMembers(newMembers);
    
    updateTask({variables: {
      _id: data._id,
      members: newMembers.map(item => item._id )
    }});
  }

  return (
    <Box boxShadow={`1px 1px 4px ${colors.primary[300]}`}>
      <Box p={2} borderBottom={`1px solid ${colors.primary[300]}`}>
        <Typography>Details</Typography>
      </Box>
      <Box p={2}>
        <Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
          <Typography>Assignees</Typography>
          <Dropdown
            button={
              <Fab sx={{ width: '28px', minHeight: '28px', height: '28px' }} size="small" color="secondary" aria-label="add">
                <AddIcon />
              </Fab>
            }
            width='250px'
          >
            <AutoComplete
              label="Team" 
              name="team"
              value={membersInput}
              options={filteredDevs}
              setLabel={(option) => `${option?.firstname} ${option?.lastname}`}
              valueField='_id'
              multiple
              async={true}
              open={devFieldOpen}
              setOpen={setOpenDev}
              loading={loadingDevs}
              onChange={ (_, value) => (
                setMembersInput(value || [])
              )}
            />
            <Box mt={1}>
              <CustomButton 
                text='Add members'
                size='small'
                onClick={handleAddUser}
              />
            </Box>
          </Dropdown>
        </Box>
        { members?.length ? (
          members.map((item, index) => (
            <Box key={index} display='flex' alignItems='center' justifyContent='space-between'>
              <ProfileRow user={item} />
              <IconButton onClick={() => handleRemoveUser(item._id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))
        ) : (
          <Typography>No users</Typography>
        )}
      </Box>
    </Box>
  )
}

export default TaskDetails