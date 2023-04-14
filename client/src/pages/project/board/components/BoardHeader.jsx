import React, { useEffect, useState } from 'react'
import { AvatarGroup, Box, Fab, Grid, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ProfileAvatar from '../../../../components/user/ProfileAvatar'
import Dropdown from '../../../../components/Dropdown'
import AutoComplete from '../../../../components/form/AutoComplete'
import ProgressBar from './ProgressBar'
import useAsyncAutocomplete from '../../../../hooks/useAsyncAutocomplete'
import { GET_DEVNAMES } from '../../../../graphql/queries/devsQueries'
import { useMutation } from '@apollo/client';
import { UPDATE_PROJECT } from '../../../../graphql/mutations/projectMutations';
import { GET_PROJECT } from '../../../../graphql/queries/projectQueries';
import { useBoard } from '../../../../context/BoardContext';
import CustomButton from '../../../../components/CustomButton';
import { UPDATE_BOARD } from '../../../../graphql/mutations/boardMutations';
import { GET_BOARDBYPROJECT } from '../../../../graphql/queries/boardQueries';

const BoardHeader = ({members, tasks}) => {
  const { projectId, boardId } = useBoard();
  const [filteredDevs, setFilteredDevs] = useState([])
  const [membersInput, setMembersInput] = useState([]);

  const {
    data: devData,
    loading: loadingDevs,
    open: devFieldOpen,
    setOpen: setOpenDev
  } = useAsyncAutocomplete(GET_DEVNAMES);

  const [updateBoard] = useMutation(UPDATE_BOARD, {
    refetchQueries: [{ 
      query: GET_BOARDBYPROJECT, variables: { projectId } 
    }],
  });

  useEffect(() => {
    if(devData?.developers?.length){
      const devId = members.map(item => (
        item._id
      ))
      
      const newDevs = devData.developers.filter(item => (
        !devId.includes(item._id)
      ));

      setFilteredDevs(newDevs);
    }
  }, [loadingDevs, members])

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

  return (
    <Grid container spacing={2} mb={4} alignItems='center' justifyContent='space-between'>
      <Grid item xs={12} sm={6} md={5} display='flex' alignItems='center' gap={1}>
        {members.length ? (
          <AvatarGroup max={6}>
            {members.map(item => (
              <ProfileAvatar name={item.firstname} key={item._id} />
            ))}
          </AvatarGroup>
        ) : (
          <Typography>No members</Typography>
        )}
        <Box>
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