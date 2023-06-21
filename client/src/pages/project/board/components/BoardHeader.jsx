import { useState } from 'react'
import { AvatarGroup, Box, Fab, Grid, Typography } from '@mui/material'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ProfileAvatar from '../../../../components/user/ProfileAvatar'
import Dropdown from '../../../../components/Dropdown'
import AutoComplete from '../../../../components/form/AutoComplete'
import useAsyncAutocomplete from '../../../../hooks/useAsyncAutocomplete'
import { GET_DEVNAMES } from '../../../../graphql/queries/devsQueries'
import { useMutation } from '@apollo/client';
import CustomButton from '../../../../components/CustomButton';
import { UPDATE_BOARD } from '../../../../graphql/mutations/boardMutations';
import { GET_BOARDBYPROJECT } from '../../../../graphql/queries/boardQueries';
import useFilterStoredData from '../../../../hooks/useFilterStoredData';
import { useBoard } from '../context/BoardContext';
import ProgressBar from '../../../../components/project/ProgressBar';

const BoardHeader = ({ members, tasks, ...props }) => {
  const { projectId, boardId } = useBoard();
  // const [filteredDevs, setFilteredDevs] = useState([])
  const [membersInput, setMembersInput] = useState([]);

  const {
    data: devData,
    loading: loadingDevs,
    open: devFieldOpen,
    setOpen: setOpenDev
  } = useAsyncAutocomplete(GET_DEVNAMES);

  const [updateBoard, {loading: updating}] = useMutation(UPDATE_BOARD, {
    update: (cache, { data: { updateBoard } }) => {
      cache.writeQuery({
        query: GET_BOARDBYPROJECT,
        variables: { projectId },
        data: {
          boardByProject: updateBoard
        }
      })
    }
  });

  const filteredDevs = useFilterStoredData(members, devData?.developers);

  const handleEdit = async (value, name) => {
    if(name === 'tags'){
      value = value.map(tag => tag.value);
    }

    await updateBoard({variables: {
      _id: boardId,
      [name]: value
    }});

    return true;
  }

  const handleRemoveUser = (id) => {
    const newMembers = [...members].filter(item => item._id !== id)
                                   .map(item => item._id );
    // setMembers(newMembers);
    
    handleEdit(newMembers, 'members')
  }

  return (
    <Grid container spacing={2} mb={4} alignItems='center' justifyContent='space-between' {...props} >
      <Grid item xs={12} sm={6} md={5} display='flex' alignItems='center' gap={1}>
        {members.length ? (
          <AvatarGroup max={6}>
            {members.map(item => (
              <ProfileAvatar
                key={item._id}
                userData={item}
                showDetails={true}
              >
                <CustomButton
                  text='Remove User'
                  onClick={() => handleRemoveUser(item._id)}
                  btnstyle='transparent'
                  sx={{ width: '100%', display: 'block', textAlign: 'left' }}
                  loading={updating}
                />
                {/* <IconButton onClick={() => handleRemoveUser(item._id)}>
                  <DeleteIcon />
                </IconButton> */}
              </ProfileAvatar>
            ))}
          </AvatarGroup>
        ) : (
          <Typography>No members</Typography>
        )}
        <Box>
          <Dropdown
            button={
              <Fab size="small" color="secondary" aria-label="add">
                <PersonAddAltIcon />
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
                onClick={() => {
                  if(!membersInput.length) return;
                  handleEdit(
                    [
                      ...(members.reduce((acc, user) => [...acc, user._id], [])),
                      ...(membersInput.reduce((acc, user) => [...acc, user._id], []))
                    ],
                    'members'
                  )
                  setMembersInput([])
                }}
                loading={updating}
              />
            </Box>
          </Dropdown>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={5}>
        <ProgressBar tasks={tasks} />
      </Grid>
    </Grid>
  )
}

export default BoardHeader