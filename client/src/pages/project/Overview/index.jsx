import React from 'react'
import { Box, Grid, Tooltip, Typography, useTheme } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';
import DateRangeIcon from '@mui/icons-material/DateRange';
import 'react-circular-progressbar/dist/styles.css';

import Header from '../../../components/Header'
import { tokens } from '../../../theme'
import TaskPie from './components/chart/TaskPie';
import CustomButton from '../../../components/CustomButton';
import ProgressCard from './components/ProgressCard';
import { useProject } from '../../../context/ProjectContext';
import ProgressBar from '../../../components/project/ProgressBar';
import ProfileRow from '../../../components/user/ProfileRow';

const Overview = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { _id } = useProject();

  return (
    <Box m="20px" maxWidth={{ xl: '1250px' }} mx={{ xl: 'auto' }} >
      <Header title="OVERVIEW" subtitle="General project details and key aspects." />
      {/* <Grid item xs={4}>
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
            </Grid> */}
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            // gridAutoRows="160px"
            marginBottom={4}
            gap="20px"
            // sx={{
            //   "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
            // }}
          >
            <Box
              gridColumn="span 6"
            >
              <ProgressCard
                title='Days left'
                subtitle={'Due date: 12-34-2033'}
                progress={{ value: 66, text: '344' }} />
            </Box>
            <Box
              gridColumn="span 6"
            >
              <ProgressCard
                title='Completed tasks'
                subtitle={'5/33'}
                progress={{ value: 13, text: '13%' }} />
            </Box>
            <Box
              gridColumn="span 6"
            >
              <ProgressCard
                title='Completed requirements'
                subtitle={'6/33'}
                progress={{ value: 43, text: '43%' }} />
            </Box>
            <Box
              gridColumn="span 6"
            >
              <ProgressCard
                title='Bugs fixed'
                subtitle={'1/3'}
                progress={{ value: 33, text: '33%' }} />
            </Box>
          </Box>
          <Box
            bgcolor={colors.primary[400]}
            borderRadius='6px'
            p='20px 20px 8px'
          >
            <Box display='flex' justifyContent='space-between' alignItems='center' >
              <Subtitle text1='Tasks Summary' text2='23 tasks' />
              <CustomButton text='View tasks' link={`/projects/${_id}/board`} />
            </Box>
            <Box height='400px' >
              <TaskPie />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box bgcolor={colors.primary[400]} p='12px' height='100%' >
            <Box height='50%' display='flex' flexDirection='column' mb={2} >
              <Box mb={1}>
                <Subtitle text1='My tasks' />
                <ProgressBar tasks={[]} />
              </Box>
              <Box overflow='auto' >
                <Box display='flex' flexDirection='column' gap={1}>
                  <Box
                    paddingLeft={1}
                    borderLeft={`2px solid ${colors.greenAccent[300]}`}
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    <Box>
                      <Typography lineHeight={1}>
                        Design form mockups
                      </Typography>
                      <Typography variant='span' color={colors.primary[200]}>
                        Due in 3 days
                      </Typography>
                    </Box>
                    <Tooltip title={'Low priority'}>
                      <InfoIcon /> 
                    </Tooltip>
                  </Box>
                  <Box
                    paddingLeft={1}
                    borderLeft={`2px solid ${colors.greenAccent[300]}`}
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    <Box>
                      <Typography lineHeight={1}>
                        Design form mockups
                      </Typography>
                      <Typography variant='span' color={colors.primary[200]}>
                        Due in 3 days
                      </Typography>
                    </Box>
                    <Tooltip title={'Low priority'}>
                      <InfoIcon /> 
                    </Tooltip>
                  </Box>
                  <Box
                    paddingLeft={1}
                    borderLeft={`2px solid ${colors.greenAccent[300]}`}
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    <Box>
                      <Typography lineHeight={1}>
                        Design form mockups
                      </Typography>
                      <Typography variant='span' color={colors.primary[200]}>
                        Due in 3 days
                      </Typography>
                    </Box>
                    <Tooltip title={'Low priority'}>
                      <InfoIcon /> 
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box height='50%' display='flex' flexDirection='column' >
              <Box mb={2}>
                <Subtitle text1='Collaborators' />
              </Box>
              <Box height='100%'>
                <Box display='flex' flexDirection='column' gap='10px' >
                  <ProfileRow user={{ firstname: 'jose', lastname: 'silva' }} />
                  <ProfileRow user={{ firstname: 'jose', lastname: 'silva' }} />
                  <ProfileRow user={{ firstname: 'jose', lastname: 'silva' }} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

    </Box>
  )
}

const Subtitle = ({text1, text2 = undefined}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      <Typography component='h3' fontSize='16px' fontWeight='bold' >
      { text1 }
      </Typography>
      {text2 && (
        <Typography component='span' color={colors.grey[200]} >
          { text2 }
        </Typography>
      )}
    </Box>
  )
}

export default Overview